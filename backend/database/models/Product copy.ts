import mongoose, { Schema, model, models } from 'mongoose';
import * as schemaType from '../../../backend/graphql/generated/schemaType';

const schema: Schema = new Schema<schemaType.Product>({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    photos: {
        type: [String],
        required: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            autopopulate: true,
        },
    ],
});

schema.plugin(require('mongoose-autopopulate'));

export default models.Product || model<schemaType.Product>('Product', schema);

