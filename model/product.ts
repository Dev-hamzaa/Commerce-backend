import mongoose from 'mongoose'


const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
            default: 0
        },
        description: {
            type: String
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        images: [
            {
                imgUrl: String
            }
        ]

    }, {
    timestamps: true
}

)

export const Product = mongoose.model("Product", productSchema)


