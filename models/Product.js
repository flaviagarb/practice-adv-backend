import mongoose, { Schema } from 'mongoose'

// definir el esquema de los productos
const productSchema = new Schema({
    name: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    price: Number,
    image: String,
    tags: [String],
    avatar: String
}, {
    collection: 'products' // para forzar el nombre de la colección
})

// filters

productSchema.statics.list = function (filter, limit, skip, sort, fields) {
  const query = this.find(filter);
  if (limit) query.limit(Number(limit));
  if (skip) query.skip(Number(skip));
  if (sort) query.sort(sort);
  if (fields) query.select(fields);
  return query.exec();
};

// crear el modelo
const Product = mongoose.model('Product', productSchema)

export default Product
