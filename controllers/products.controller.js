const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../db/products.json')

const readProducts = () => {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
}

let productos = readProducts()


const writeProducts = (productos) => {
    fs.writeFileSync(filePath, JSON.stringify(productos, null, 2))
}

// get 
const getProducts = ((req, res) => {
    res.json({data: productos, status:200, message: 'Productos obtenidos exitosamente'})
})

// get por id 
const getProductById = ((req, res) => {
    const producto = productos.find(item => item.id == req.params.id)

    /* por si no encuentro */
    if (!producto) return res.json({status: 404, message: "producto no encontrado"})

    /* si encuentro */
    res.json({data: producto, status:200, message: 'producto obtenido exitosamente'})
})

// post 
const createProduct = ((req, res) => {
    const nuevoproducto = req.body

    const precio = nuevoproducto.precio

    // Validar que el precio no esté vacío o incompleto 
    if (!precio || precio === null || precio === undefined ||  precio < 1) {
        return res.status(400).json({ status: 400, message: "El Precio está vacío o es incorrecto" })
    }


    nuevoproducto.id = productos.length + 1 /* para aumentar su id */

    productos.push(nuevoproducto)
    writeProducts(productos)

    res.json({data: nuevoproducto, status: 201, message: "Producto agregado correctamente"})
})

// put 
const updateProduct = ((req, res) => {
    /* obtengo el producto */ 
    const producto = productos.find(item => item.id == req.params.id)
    
    /* por si no encuentro */
    if (!producto) return res.json({status: 404, message: "Producto no encontrado"})
    
    /* desestructuro el objeto para manejarlo */
    const {nombre, precio} = req.body
    
    /* creo el nuevo producto */
    producto.nombre = nombre || producto.nombre 
    producto.precio = precio || producto.precio

    writeProducts(productos)
    
    res.json({data: producto, status: 201, message: "Producto editado correctamente"})
})

// delete  
const deleteProduct = ((req,res) => {
     /* obtengo el producto */ 
    let producto = productos.find(item => item.id == req.params.id)
    
     /* por si no encuentro */
    if (!producto) return res.json({status: 404, message: "Producto no encontrado"})

    productos = productos.filter(item => item.id !== parseInt(req.params.id))

    writeProducts(productos)

    res.json({status:201, message:"Producto eliminado correctamente"})
})


module.exports={
    getProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}