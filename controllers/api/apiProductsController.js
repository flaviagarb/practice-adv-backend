import Product from "../../models/Product.js";
import { unlink } from 'node:fs/promises'
import path from 'node:path'

// get products

export async function list(req, res, next) {
  try {
    const { name, price, tags, limit, skip, sort } = req.query;

    const filter = {};

    if (name) {
      filter.name = name;
    }

    if (price) {
      filter.price = price;
    }

    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }

    const products = await Product.list(filter, limit, skip, sort);

    res.json({ results: products });
  } catch (error) {
    next(error);
  }
}

// get product by Id

export async function getProductById(req, res, next) {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ result: product });
  } catch (error) {
    next(error);
  }
}

// create product

export async function createProduct(req, res, next) {
  try {
    const productData = req.body;

    const product = new Product(productData);
    product.image = req.file?.filename; // ← aquí estaba mal (era "filterName")

    const savedProduct = await product.save();

    res.status(201).json({ result: savedProduct });
  } catch (error) {
    next(error);
  }
}

// update product

export async function update(req, res, next) {
  try {
    const productId = req.params.productId
    const productData = req.body
    productData.avatar = req.file?.filename

    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, {
      new: true // returns the updated document
    })

    res.json({ result: updatedProduct })
  } catch (error) {
    next(error)
  }
}

// delete product

export async function deleteProduct(req, res, next) {
  try {
    const productId = req.params.productId

    // remove avatar file if exists
    const product = await Product.findById(productId)
    if (product.avatar) {
      await unlink(path.join(import.meta.dirname, '..', '..', 'public', 'images', product.image))
    }

    await Product.deleteOne({ _id: productId })

    res.json()
  } catch (error) {
    next(error)
  }
}