import Product from "../../models/Product.js";
import { unlink } from 'node:fs/promises';
import path from 'node:path';
import createError from 'http-errors';

// get products

export async function list(req, res, next) {
  try {
    const userId = req.apiUserId

    const { name, price, tags, limit, skip, sort } = req.query;

    const filter = {
      owner: userId,
    };

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

// get product by userId

export async function getProductById(req, res, next) {
  try {
    const userId = req.apiUserId;
    const productId = req.params.productId;
    const product = await Product.findOne({ _id: productId, owner: userId})
    

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ result: product });
  } catch (error) {
    next(error);
  }
}

// create product by userId

export async function createProduct(req, res, next) {
  try {
    const productData = req.body;
    const userId = req.apiUserId

    const product = new Product(productData);
    product.image = req.file?.filename; 
    product.owner = userId

    const savedProduct = await product.save();

    res.status(201).json({ result: savedProduct });
  } catch (error) {
    next(error);
  }
}

// update product

export async function update(req, res, next) {
  try {
    const userId = req.apiUserId
    const productId = req.params.productId
    const productData = req.body
    productData.avatar = req.file?.filename

    const updatedProduct = await Product.findOneAndUpdate(
      {
      _id: productId,
      owner: userId
    }, 
    productData,
    { new: true}
  )

    res.json({ result: updatedProduct })
  } catch (error) {
    next(error)
  }
}

// delete product

export async function deleteProduct(req, res, next) {
  try {
    const productId = req.params.productId
    const userId = req.apiUserId

    const product = await Product.findById(productId)

    if (!product) {
      console.log(`WARNING! user ${userId} is trying to delete non existing product!`)
      return next(createError(404))
    }

    if (product.owner.toString() !== userId){
      console.log(`WARNING! user ${userId} is trying to delete products of other users!`)
      return next(createError(401))
    }

    if (product.image) {
      await unlink(path.join(import.meta.dirname, '..', '..', 'public', 'images', product.image))
    }

    await Product.deleteOne({ _id: productId })

    res.json()
  } catch (error) {
    next(error)
  }
}