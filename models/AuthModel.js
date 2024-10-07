import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email: String,
    password: String
});

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;