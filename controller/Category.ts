import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({

    name: {
        type: String
    },
},
    {
        timestamps: true
    }
)