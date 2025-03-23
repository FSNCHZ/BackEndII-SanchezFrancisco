import { Router } from "express"
import { getUsers, getUser, updateUser, deleteUser, createUser } from "../controllers/usersController.js"
import { authorization } from "../config/middleware.js"
import passport from "passport"

const usersRouter = Router()

usersRouter.get('/', passport.authenticate("jwt"), authorization("Admin"), getUsers)
usersRouter.get('/:uid', passport.authenticate("jwt"), authorization("Admin"), getUser)
usersRouter.post('/', passport.authenticate("jwt"), authorization("Admin"), createUser)
usersRouter.put('/:uid', passport.authenticate("jwt"), authorization("Admin"),updateUser)
usersRouter.delete('/:uid', passport.authenticate("jwt"), authorization("Admin"), deleteUser)

export default usersRouter