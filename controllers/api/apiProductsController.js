import Product from "../../models/Product.js";

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

// create products

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