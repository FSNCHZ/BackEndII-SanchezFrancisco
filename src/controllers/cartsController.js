import cartModel from "../models/cartModels.js";
import productModel from "../models/productModels.js";

export const getCart = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findOne({ _id: cid })
        if (cart) {
            res.status(200).send(cart)
        } else {
            res.status(404).send("Carrito no encontrado")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
//Inserta productos en un carrito
export const insertProductCart = async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const { quantity } = req.body
        const cart = await cartModel.findOne({ _id: cid })
        if (cart) {
            const product = await productModel.findById(pid)
            if (product) {
                if(product.stock >= quantity) {
                    const index = cart.products.findIndex(prod => prod.id = pid)
                    if (index != -1) {
                        cart.products[index].quantity = quantity
                    } else {
                        cart.products.push({ id_prod: pid, quantity: quantity })
                    }
                    await cartModel.findByIdAndUpdate(cid, cart)
                    res.status(200).send("Carrito actualizado")
                } else {
                    res.status(404).send("No hay stock disponible")
                }
            } else {
                res.status(404).send("El producto no existe")
            }
            const index = cart.products.findIndex(prod => prod._id = pid)
            if (index != -1) {
                cart.products[index].quantity = quantity
            } else {
                cart.products.push({ id_prod: pid, quantity: quantity })
            }
            await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send("Carrito actualizado")
        } else {
            res.status(404).send("Carrito no encontrado")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
//Elimina productos de un carrito
export const deleteProductCart = async (req, res) => {
    try {
        const { cid } = req.params
        const { pid } = req.params
        const cart = await cartModel.findOne({ _id: cid })
        if (cart) {
            const index = cart.products.findIndex(prod => prod._id == pid)
            if(index != -1){
                cart.products.splice(index, 1)
                cart.save()
                res.status(200).send("Producto eliminado")
            } else {
                res.status(404).send("El producto no existe en el carrito")
            }
        } else {
            res.status(404).send("Carrito no encontrado")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
//No se puede eliminar el carrito, para poder eliminarlo se debe eliminar al usuario
export const deleteCart = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findOne({ _id: cid })
        if (cart) {
            cart.products = []
            cart.save
            res.status(200).send("Carrito eliminado")
        } else {
            res.status(404).send("Carrito no encontrado")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}