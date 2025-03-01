import jwt from "jsonwebtoken"

let secretKey = "secretKey"

const generateToken = (user) => {
    const token = jwt.sign({_id: user._id, first_name: user.first_name, email: user.email}, secretKey, {expiresIn: "24h"})
    return token
}

console.log(generateToken({
    "_id":{"$oid":"67c34a99eae32a4c7ecfcca0"},"first_name":"Francisco","last_name":" ","email":"snchzfrancisco28@gmail.com","password":"$2b$05$/5sEH9GeEdqKE0UnSpsXROK89QVETP.ehT48k2iKvhwI4bVEdObSO","age":{"$numberInt":"18"},"__v":{"$numberInt":"0"}
}))

export default generateToken