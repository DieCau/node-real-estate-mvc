import nodemailer from 'nodemailer'
import { Processor } from 'postcss';

const emailRegister = async (data) => {
    // Inicia Sesion
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
        }
      });

    const { email, name, token } = data

    // Envio y configuracion del email de confirmacion
    await transport.sendMail({
        from: 'RealState.com',
        to: email,
        subject: 'Confirm account en RealState.com',
        text: 'Confirm your account in RealState.com',
        html: `
            <p>Hola ${name},  check your RealState.com account</p>
            
            <p>Your account is now ready. You must confirm it in the following link: 
            <a href='${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirm/${token}'>Check your account</a></p>

            <p>If you did not create this account, you can ignore this message</p>
        ` 
    })
}

export {
    emailRegister
}