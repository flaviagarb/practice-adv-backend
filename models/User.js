import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

//definir el esquema
const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String
})

// métodos del modelo

userSchema.statics.hashPassword = (clearPassword) => {
    return bcrypt.hash(clearPassword, 7) //esto devuelve una promesa que se resuleve a una password cifrada
}


userSchema.methods.comparePassword = function (clearPassword) {
    return bcrypt.compare(clearPassword, this.password)
}

// crear el modelo
const User = mongoose.model('User', userSchema)

export default User;