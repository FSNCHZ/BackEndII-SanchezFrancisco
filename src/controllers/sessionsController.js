import generateToken from "../utils/jwt.js"

export const register = async (req, res) => {
    try {
        console.log(req.user)
        if (!req.user) {
            return res.status(400).send("Write all data")
        }
        return res.status(201).send({message: `User registered succesfully`})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const login = async (req, res) => {
    try {
        if (!req.user._id) {
            return res.status(400).send("Username or password incorrect")
        }
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        return res.status(200).cookie('sessionToken', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send({message: "User logged succesfully"})
    } catch (error) {
        res.status(500).send(error)
    }
}

export const githubLogin = async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send("User already registered")
        } else {
            req.session.user = {
                email: req.user.email,
                first_name: req.user.first_name
            }
        }
        res.status(200).cookie('sessionToken', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send("User logged succesfully")
    } catch (error) {
        res.status(500).send(error)
    }
}

export const viewRegister = (req, res) => {
    res.status(200).render("templates/register", {
        title: "Register",
        url_js: "/js/register.js",
        url_css: "/css/main.css"
    })
}

export const viewLogin = (req, res) => {
    res.status(200).render("templates/login", {
        title: "Login",
        url_js: "/js/login.js",
        url_css: "/css/main.css"
    })
}