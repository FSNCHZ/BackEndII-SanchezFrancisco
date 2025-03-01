import express from "express"
import usersRouter from "./routes/usersRoutes.js"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import sessionsRouter from "./routes/sessionsRoutes.js"
import passport from "passport"
import initPassport from "./config/passport.config.js"
import cartRouter from "./routes/cartsRoutes.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser('contraseña')) //Se utiliza una contraseña para setear una cookie firmada
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://sanchezfrancisco28:lolos123@cluster0.r1e0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 20 //Tiempo en segundos (cuánto va a durar la sesión)
    }),
    secret: "contraseña",
    resave: true, //Mantiene la sesion activa, mientras el usuario esté inactivo
    saveUninitialized: true //Siempre guarda la sesión aunque no tenga información para guardar
}))

mongoose.connect("mongodb+srv://sanchezfrancisco28:lolos123@cluster0.r1e0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB is connected"))
    .catch((e) => console.log(e))

initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use("/api/users", usersRouter)
app.use("/api/sessions", sessionsRouter)
app.use("/api/carts", cartRouter)

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})