import mongoose, { Schema } from 'mongoose'


// definir el esquema de los productos
const productSchema = new Schema({
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    price: Number,
    image: String,
    tags: [String]
}, {
    collection: 'products' // para forzar el nombre de la colección
})

// crear el modelo
const Product = mongoose.model('Product', productSchema)

export default Product
