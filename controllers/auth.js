const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const createUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        let user = await Usuario.findOne({ email });
        
        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese correo ya se encuentra registrado'
            });
        }

        user = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    // 
        await user.save();
        
        // Generar JWT
        const token = await generarJWT( user.id, user.name );
       
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token    
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar al administrador'
        });
    }   
};

const loginUser =  async(req, res = response) => {

    const { email, password } = req.body;


    try {

        const user = await Usuario.findOne({ email });
        
        if( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o contraseña no son validos'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password'
            });
        }

        // Generar nuestro jsonWebToken
        const token = await generarJWT( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

        
    } catch (error) {
        
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor contactar al administrador'
        });

    }

    
    
};


const renewToken = async(req, res = response) => {   

    const { uid, name } = req;
    

    // generar un nuevo jwt 
    const token = await generarJWT( uid, name );
    
    res.json({
        ok: true,
        token
    })
};

module.exports = {
    createUser,
    loginUser,
    renewToken,
};