import "dotenv/config"
import { hashSync, compareSync } from "bcrypt";

export const createHash = (p) => hashSync(p, parseInt(process.env.SALT))

export const validatePassword = (p, pBDD) => compareSync(p, pBDD)