import mongoose, { Schema, model, models } from 'mongoose';
import * as schemaType from '../../../backend/graphql/generated/schemaType';

const schema: Schema = new Schema<schemaType.Order>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    },
    orderItems: [
        {
            title: { type: String, required: true },
            // TODO: change title to product
            // product: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref: 'Product',
            //     autopopulate: true,
            // },
            quantity: { type: Number, required: true },
            // TODO: remove image and price
            image: { type: String, required: false },
            price: { type: Number, required: true },
        },
    ],
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    // paidAt: { type: Date },
    // deliveredAt: { type: Date },
});


export default models.Order || model<schemaType.Order>('Order', schema);

