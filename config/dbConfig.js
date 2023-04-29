const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://aebish:8rYcJwRRKZSLLqCx@cluster0.1jjchfs.mongodb.net/?retryWrites=true&w=majority",
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            }
        );
        //console.log("MongoDB connected!");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;