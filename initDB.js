import readline from 'node:readline/promises'
import connectMongoose from "./lib/connectMongoose.js";
import Product from './models/Product.js';
import User from './models/User.js';

const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)

const answer = await ask('Are you sure you want to delete database collections? (n)')
if (answer.toLowerCase() !== 'y') {
    console.log('Operation aborted.')
    process.exit()
}

await initUsers();
await initDBNodepop();


async function initDBNodepop() {
    // delete all products al iniciar DDBB
    const products = await Product.deleteMany()
    console.log(`Deleted ${products.deletedCount} products.`)

    const [admin, user] = await Promise.all([
        User.findOne({ email: 'admin@example.com' }),
        User.findOne({ email: 'user@example.com' }),
    ])

    // create product
    const insertProduct = await Product.insertMany([
        {
            name: 'Samsung Galaxy A15',
            price: 500,
            image: 'https://m.media-amazon.com/images/I/7159IY51UIL._AC_UF1000,1000_QL80_.jpg',
            tags: ['mobile'],
            owner: user._id
        },
        {
            name: 'Tablet Galaxy S6 Lite',
            price: 100,
            image: 'https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202404/05/00115217117389____8__1200x1200.jpg',
            tags: ['mobile', 'lifestyle'],
            owner: user._id
        },
        {
            name: 'TV LG 32LQ',
            price: 200,
            image: 'https://www.lg.com/content/dam/channel/wcms/es/images/television/55ut73006la_aeuq_eees_es_c/gallery/large1.jpg',
            tags: ['lifestyle'],
            owner: admin._id
        },
        {
            name: 'Gameboy',
            price: 700,
            image: 'https://i5.walmartimages.com/seo/Nintendo-GameBoy-Game-Boy-Color-Atomic-Purple-Authentic-100-OEM_af704870-eee2-401a-b2d1-a5b463213a37.3edcbe62993c043ee53a9cc925ef5c40.png',
            tags: ['lifestyle', 'mobile'],
            owner: admin._id
        },
        {
            name: 'Iphone 13',
            price: 800,
            image: 'https://colourmobiletomelloso.es/wp-content/uploads/2021/09/Iphone-13-azul-Colour-Mobile-Tomelloso.jpg',
            tags: ['mobile'],
            owner: admin._id
        },
    ])
    console.log(`Inserted ${insertProduct} products. Total products ${insertProduct.length}`)
}


async function initUsers() {
    // delete all agents 
    const result = await User.deleteMany()
    console.log(`Deleted ${result.deletedCount} users.`)

    // create users
    const insertResult = await User.insertMany([
        {
            name: 'Marta Leon',
            email: 'admin@example.com',
            password: await User.hashPassword('1234')
        },
        {
            name: 'Jorge Autin',
            email: 'user@example.com',
            password: await User.hashPassword('1234')
        },
    ])
    console.log(`Inserted ${insertResult.length} users.`)
}


async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    const result = await rl.question(question)
    rl.close()
    return result
}

await connection.close();