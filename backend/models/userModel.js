import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Name is Required"]
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            uniques: true,
            validate: validator.isEmail,
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
        location: {
            type: String,
            default: "India",
        },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// JWT

userSchema.methods.createJWT = function () {
    return JWT.sign({
        userID: this._id,
    }, process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    });
};

export default mongoose.model("User", userSchema);