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

const formForgetPassword = (req, res) => {
    res.render('auth/forget-password', {
        page: 'Recover your access!'
    })
}


export {
    formLogin,
    formRegister,
    formForgetPassword
}