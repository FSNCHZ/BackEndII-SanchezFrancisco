import { model, Schema } from "mongoose"
import cartModel from "./cartModels.js"

const userCollection = 'users'

const userSchema = new Schema({
    first_name : {
        type: String,
        required: true
    },
    last_name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        default: "user"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts"
    }
}
)

userSchema.post("save", async function (doc) {
    try {
        if(!doc.cart){
            const newCart = await cartModel.create({
                products: [],
            })
            await model("users").findByIdAndUpdate(doc._id, {cart: newCart._id})
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const userModel = model(userCollection, userSchema)