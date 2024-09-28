import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    email: { type: 'string', required: [true, "please provide email"], unique: [true, "user with email already exist"] },
    password: { type: 'string', required: [true, "please provide password"] },
})

userSchema.pre('save', async function (next) {

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

})

const user = mongoose.model("User", userSchema);
export default user;