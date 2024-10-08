import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true
    },
    email: String,
    password: String
});

const AuthModel = mongoose.model("Auth", AuthSchema);
export default AuthModel;