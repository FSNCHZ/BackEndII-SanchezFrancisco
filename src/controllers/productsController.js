import productModel from "../models/productModels.js"

export const getProducts = async(req, res) => {
    try {
        const { limit, page, metFilter, filter, metOrder, order } = req.query
        const pag = page !== undefined ? page : 1
        const lim = limit !== undefined ? limit : 10
        const filQuery = metFilter !== undefined ? {[metFilter]: filter} : {}
        const ordQuery = metOrder !== undefined ? {[metOrder]: order} : {}
        const products = await productModel.paginate(filQuery, {limit: lim, page: pag, sort: ordQuery, lean: true})
        products.pageNumber = Array.from({length: products.totalPages}, (_, i) => ({
            number: i + 1,
            isCurrent: i + 1 === products.page
        }))
        res.status(200).render("templates/products", {
            title: "Home",
            products: products
        })
    } catch (error) {
        res.status(500).send(error)
    }
}
export const getProduct = async(req, res) => {
    try {
        const { pid } = req.params
        const prod = await productModel.findById(pid)
        if(prod){
            return res.status(200).send(prod)
        } else {
            return res.status(404).send({message: "Product doesn't exist"})
        }
    } catch (error) {
        res.status(500).send(e)
    }
}
export const createProduct = async(req, res) => {
    try {
        const { title, description, category, code, price, stock } = req.body
        const message = await productModel.create({
            title,
            description,
            category,
            code,
            price,
            stock
        })
        res.status(201).send({message: message})
    } catch (error) {
        res.status(500).send(error)
    }
}
export const updateProduct = async(req, res) => {
    try {
        const { pid } = req.params
        const { title, description, category, code, price, stock } = req.body
        const message = await productModel.findByIdAndUpdate(pid, {
            title,
            description,
            category,
            code,
            price,
            stock
        })
        if(message) {
            res.status(200).send({message: "Product updated"})
        } else {
            res.status(404).send({message: "Product doesn't exist"})
        }
    } catch (error) {
        res.status(500).send(e)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const message = await findByIdAndDelete(pid)
        if(message){
            res.status(200).send({message: "Product deleted"})
        } else {
            res.status(404).send({message: "Product doesn't exist"})
        }
    } catch (error) {
        res.status(500).send(e)
    }
}