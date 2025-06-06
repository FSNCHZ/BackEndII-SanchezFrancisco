import { Router } from "express"
import { register, login, githubLogin, viewRegister, viewLogin } from "../controllers/sessionsController.js"
import passport from "passport"

const sessionsRouter = Router()

//Dejamos de utilizar el usersRouter para crear users, y ahora pasa a ser una funcion de sessionsRouter

sessionsRouter.post("/login", passport.authenticate("login"), login)
sessionsRouter.post("/register", passport.authenticate("register"), register)
sessionsRouter.get("/github", passport.authenticate("github", {scope: ["user: email"]}), async (req, res) => {})
sessionsRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "login"}), githubLogin)
sessionsRouter.get("/current", passport.authenticate("jwt"), async (req, res) => {
    res.send(req.user)
})
sessionsRouter.get("/viewregister", viewRegister)
sessionsRouter.get("/viewlogin", viewLogin)

export default sessionsRouter