import Product from '../models/Product.js';

//GET HOMEPAGE

const HomeController = {
    get: async (req, res, next) => {
        try {
            const userId = req.session.userId;

            res.locals.session = req.session;
            res.locals.products = await Product.find({ owner: userId });
            res.render('home');
        } catch (error) {
            next(error);
        }
    }
};

export default HomeController;