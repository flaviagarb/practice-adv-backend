import readline from 'node:readline/promises'
import connectMongoose from "./lib/connectMongoose.js";
import Product from './models/Product.js';
import User from './models/User.js';
import 'dotenv/config';

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
            image: 'samsung.png',
            tags: ['mobile'],
            owner: user._id
        },
        {
            name: 'Tablet Galaxy S6 Lite',
            price: 100,
            image: 'tablet.png',
            tags: ['mobile', 'lifestyle'],
            owner: user._id
        },
        {
            name: 'TV LG 32LQ',
            price: 200,
            image: 'lg.png',
            tags: ['lifestyle'],
            owner: admin._id
        },
        {
            name: 'Gameboy',
            price: 1000,
            image: 'gameboy.png',
            tags: ['lifestyle', 'mobile'],
            owner: admin._id
        },
        {
            name: 'Iphone 13',
            price: 800,
            image: 'iphone.png',
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
            password: await User.hashPassword('1234'),
            avatar: 'admin.png'
        },
        {
            name: 'Jorge Autin',
            email: 'user@example.com',
            password: await User.hashPassword('1234'),
            avatar: 'user.png'
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