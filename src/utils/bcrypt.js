import { hashSync, compareSync } from "bcrypt";

export const createHash = (p) => hashSync(p, 5)

export const validatePassword = (p, pBDD) => compareSync(p, pBDD)

let password = createHash("hola")
console.log(password)
console.log(validatePassword("hola", password))