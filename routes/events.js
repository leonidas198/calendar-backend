/* 
    Event routes
    /api/events
*/



const { Router } = require('express');
const { check } = require('express-validator');

const { fieldValidators } = require('../middlewares/fieldValidators')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEventos, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');


const router = Router();

// Validacion token general
router.use( validarJWT );

// obtener eventos
router.get('/', getEventos);


// crear evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),check('start', 'Fecha de inicio es obligatoria').custom( isDate ),check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ), fieldValidators
    ],
    crearEventos);


// Actualizar evento
router.put('/:id', actualizarEvento);

// borrar evento: router.delete
router.delete('/:id', eliminarEvento);


module.exports = router;
