import generateToken from "../utils/jwt.js"

export const register = async (req, res) => {
    try {
        console.log(req.user)
        if(!req.user){
            return res.status(400).send("Ingrese todos los datos")
        }
        return res.status(201).send(`Usuario creado correctamente con el id: ${req.user?._id}`)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const login = async (req, res) => {
    try {
        if(!req.user._id){
            return res.status(400).send("Usuario o contraseña invalidos")
        }
        req.session.user = {
            email: req.user.email,
            first_name: req.user.first_name
        }
        return res.status(200).cookie('sessionToken', generateToken(req.user), {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        }).send("Usuario logueado correctamente")
    } catch (error) {
        res.status(500).send(error)
    }
}

export const githubLogin = async (req, res) => {
    try {
        if(!req.user){
            res.status(400).send("Usuario ya registrado")
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
        }).send("Usuario logueado correctamente")
    } catch (error) {
        res.status(500).send(error)
    }
}