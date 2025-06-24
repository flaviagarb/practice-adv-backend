# Nodepop - Advanced Backend

This project is an advanced version of the Nodepop backend built during the Full Stack Bootcamp. It extends the fundamentals with real-world backend features for a marketplace app.

## Features

- User login and session handling
- Users can create products with:
  - Name, price, image, tags
  - Ownership linking (user → product)
- File upload with Multer (avatars and product images)
- Internationalization (i18n) with cookie-based language selection
- Static files served for uploaded images
- REST API with full CRUD for products and users
- API documentation using Swagger UI

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd practice-adv-backend
   ```

2.Install dependencies:
`npm install`

3. Create a .env file and configure it:

```bash
MONGODB_CONNSTR=mongodb://localhost:27017/nodepop
SESSION_SECRET=your_session_secret_here
```

### Initialize the Database

`npm run initDB`

### Start the App

`npm run dev`

Then go to:
http://localhost:3000

## Directory Structure

    •	/routes – Web routes
    •	/controllers – Logic for web views
    •	/routes/api – API endpoints
    •	/controllers/api – API controllers
    •	/models – Mongoose schemas for User and Product
    •	/lib – Custom middlewares (upload, sessions, i18n)
    •	/views – EJS templates
    •	/public – Static assets
    •	/uploads – Uploaded files (images)

## API Endpoints

Products
• GET /api/products – List all products (supports filters)
• GET /api/products/:id – Get product by ID
• POST /api/products – Create product (multipart/form-data)
• PUT /api/products/:id – Update product
• DELETE /api/products/:id – Delete product

Users
• GET /api/users – List all users

## Swagger Documentation

Visit:
http://localhost:3000/api-doc

## Internationalzation

Support for:

- 🇪🇸 Spanish
- 🇬🇧 English

The language can be changed using the selector in the interface. It is stored in a `nodepop-lang` cookie.

## Notes

    •	All uploaded files are saved in /uploads
    •	i18n supports English and Spanish via the nodepop-lang cookie
    •	MongoDB is used to store sessions (connect-mongo)
    •	Products have an owner field linked to the user who created them

## Credits

Flavia Garbetta
