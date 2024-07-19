const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user');


    res.json({
        ok: true,
        eventos        
    })
}

const crearEventos = async(req, res = response) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contactar a su administrador'
        });
    }
   
}

const actualizarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actalizarEvento',
       
    })
}

const eliminarEvento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarEvento',
       
    })
}

module.exports = {
    getEventos,
    crearEventos,
    actualizarEvento,
    eliminarEvento
}