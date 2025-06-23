import Product from '../models/Product.js';

const ProductController = {
    get: async (req, res, next) => {
        try {
            console.log('Mostrando productos desde la base de datos');
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            next(error);
        }
    },
    // funcion async que obtiene el formulario de new product
    getNew: async (req, res, next) => {
        res.render('new-product')
    },
    // funcion async que guarda el new product intro
    postNew: async (req, res, next) => {
        try {
            const { name, price, image } = req.body
            const userId = req.session.userId
            const tags = Array.isArray(req.body.tags)
                ? req.body.tags
                : [req.body.tags];

            // añadir validaciones de express validator 

            // creo objeto en memoria
            const product = new Product({
                name,
                owner: userId,
                price,
                image,
                tags
            })

            // lo guardo en base de datos
            await product.save()

            //vuelve a la home para que se vea la lista
            res.redirect('/')

        } catch (error) {
            next(error)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const userId = req.session.userId
            const productId = req.params.productId

            await Product.deleteOne({ _id: productId, owner: userId })

            res.redirect('/')
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController;
