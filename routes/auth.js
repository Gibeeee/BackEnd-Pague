/*  
    Rutas de Usuarios / Auth
    host = /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validateFields');
const { createUser, logInUser, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validarJWT')

const router = Router();

router.post(
    '/new',
    [ //MIDDLEWARES
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check('password', 'The password should have 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    createUser);

router.post('/',
    [
        check('email', 'The email Doesnt exist').isEmail(),
        check('password', 'Incorrect credentials').isLength({ min: 6 }),
        validateFields
    ],
    logInUser);

router.get('/renew', validarJWT, renewToken);

module.exports = router;