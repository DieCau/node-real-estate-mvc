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



export {
    formLogin,
    formRegister
}