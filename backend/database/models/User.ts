import mongoose, { Schema, model, models } from 'mongoose';
import * as schemaType from '../../../backend/graphql/generated/schemaType';
import bcrypt from 'bcrypt';

const schema: Schema = new Schema<schemaType.User>({
    name: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
        default: 'costumer'
    },
    addresses: [
        {
            type: Object,
            required: false,
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: false,
        },
    ],
});



schema.methods.encryptPassword = async function(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

schema.methods.validatePassword = async function(password: string) {
    return await bcrypt.compare(password, this.password);
};

export default models.User || model<schemaType.User>('User', schema);

