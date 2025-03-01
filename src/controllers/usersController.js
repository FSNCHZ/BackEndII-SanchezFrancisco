import { userModel } from "../models/userModels.js"

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const getId = (req, res) => {
    const { uid } = req.params
    res.status(200).send(uid)
}

export const getUser = async (req, res) => {
    try {
        const { uid } = req.params
        const user = userModel.findById(uid)
        if(user){
            res.status(200).send(user)
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}


export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body
        if(first_name == undefined || last_name == undefined || email == undefined || password == undefined){
            res.status(400).send("Deben cargarse todos los datos")
        }
        let message = await userModel.create({first_name, last_name, email, password})
        res.status(201).send(message)
    } catch (error) {
        res.status(500).send(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params
        const { first_name, last_name, email, password } = req.body
        const user = userModel.findById(uid)
        if(user){
            let message = await userModel.findByIdAndUpdate(first_name, last_name, email, password)
            res.status(200).send(message)
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params
        const user = userModel.findById(uid)
        if(user){
            let message = await userModel.findByIdAndDelete(user)
            res.status(200).send(message)
        } else {
            res.status(404).send("User not found")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}   