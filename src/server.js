import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"
import indexRouter from "./routes/indexRoutes.js"
import passport from "passport"
import initPassport from "./config/passport.config.js"
import { create } from "express-handlebars"
import path from "path"
import __dirname from "./path.js"

const app = express()
const PORT = 8080
const hbs = create()

app.use(express.json())
app.use(cookieParser(process.env.SECRET_COOKIE)) //Se utiliza una contraseña para setear una cookie firmada
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 20 //Tiempo en segundos (cuánto va a durar la sesión)
    }),
    secret: process.env.SECRET_SESSION,
    resave: true, //Mantiene la sesion activa, mientras el usuario esté inactivo
    saveUninitialized: true //Siempre guarda la sesión aunque no tenga información para guardar
}))

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB is connected"))
    .catch((e) => console.log(e))

initPassport()
    app.use(passport.initialize())
    app.use(passport.session())

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))



app.use("/", indexRouter)

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})