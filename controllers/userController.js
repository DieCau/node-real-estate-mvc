import { check, validationResult } from 'express-validator'
import User from '../models/User.js'
import { generarId } from  '../helpers/tokens.js'
import { emailRegister } from '../helpers/emails.js';


const formLogin = (req, res) => {
    res.render('auth/login', {
        page: 'Sign In'
    })
}

const formRegister = (req, res) => {
    res.render('auth/register', {
        page: 'Create Account'
    })
}


const toRegister = async (req, res) => {
    // Validacion
    await check('name').notEmpty().withMessage('This field cannot be empty').run(req)
    await check('email').isEmail().withMessage('That`s not an email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('The password must be at least 6 characters').run(req)
    await check('repeat_password').equals(req.body.password).withMessage('The passwords are not the same').run(req)
    
    let result = validationResult(req)
    
    // Verificar que el resultado esta vacio
    if(!result.isEmpty()) {
        // Errors
        return res.render('auth/register', {
            page: 'Create Account',
            errors: result.array(),
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }

    // Extraer los datos
    const { name, email, password } = req.body
    
    // Verificar que el user no este duplicado
    const userExists = await User.findOne({ where: { email }})
    if(userExists) {
        // Errors
        return res.render('auth/register', {
            page: 'Create Account',
            errors: [{ msg: 'This User is already registered' }],
            user: {
                name: req.body.name,
                email: req.body.email
            }
        })        
    }
    
    
    // Almacenar un usuario 
    const user = await User.create({
        name, 
        email,
        password,
        token: generarId()
    })

    // Envio de mail de confirmacion
    emailRegister({
        name: user.name,
        email: user.email,
        token: user.token
    })
    
    
    // Mostrar mensaje de confirmacion
    res.render('templates/message', {
        page: 'Account created successfully',
        message: 'Sending confirmation email, click on the link'
    })
    
}

// Funcion que comprueba una cuenta 
const toConfirm = async (req, res,) => {
    
    const { token } = req.params

    // Verificar si el token es valido
    const user = await User.findOne({ where: {token} })
    
    if(!user) {
        return res.render('auth/confirm-account', {
            page: 'Error confirming that account',
            message: 'There was an error confirming your account. Try again',
            error: true           
        })
    }
    
    
    // Confirmar la cuenta
    user.token = null
    user.toConfirm = true
    await user.save()
    
    res.render('auth/confirm-account', {
        page: 'Confirmed Account',
        message: 'The account was confirmed correctly',
    })




}
 


const formForgetPassword = (req, res) => {
    res.render('auth/forget-password', {
        page: 'Recover your access!'
    })
}

export {
    formLogin,
    formRegister,
    toConfirm,
    formForgetPassword,
    toRegister
}