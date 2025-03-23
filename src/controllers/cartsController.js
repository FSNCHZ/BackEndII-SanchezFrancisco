import cartModel from "../models/cartModels.js";
import productModel from "../models/productModels.js";
import ticketModel from "../models/ticketModels.js";

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

export const checkout = async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findById(cid)
        const prodStockNull = []
        if(cart) {
            for(const prod of cart.products) {
                const product = await productModel.findById(prod.id_prod)
                if(product.stock - product.quantity < 0) {
                    prodStockNull.push(product.id)
                }
            }
            if(prodStockNull.length == 0) {
                let amount = 0
                for(const prod of cart.products){
                    const product = await productModel.findById(prod.id_prod)
                    product.stock -= prod.quantity
                    amount += product.price * prod.quantity
                    await product.save()
                }
                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: amount,
                    products: cart.products
                })
                await cartModel.findByIdAndUpdate(cid, {products: []})
                res.status(200).json({message: "Purchased succesfully"})
            } else {
                prodStockNull.forEach((pid) => {
                    let index = cart.products.findIndex(prod => prod.id_prod === pid)
                    cart.products.splice(index, 1)
                })
                await cartModel.findByIdAndUpdate(cid, {
                    products: cart.products
                })
                res.status(400).json(prodStockNull)
            }
        } else {
            res.status(404).send({message: "Cart does not exist"})
        }
    } catch (error) {
        res.status(500).send(error)
    }
}