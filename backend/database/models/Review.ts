import mongoose, { Schema, model, models } from 'mongoose';
import * as schemaType from '../../../backend/graphql/generated/schemaType';

const schema = new Schema<schemaType.Review>({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    },
    feedback: { type: String, required: false },
    rate: { type: Number, required: true },
    //TODO: change place to product
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        autopopulate: true,
    },
});

schema.plugin(require('mongoose-autopopulate'));

export default models.Review || model<schemaType.Review>('Review', schema);
