import { NextApiRequest, NextApiResponse } from "next";

import Order from "../../backend/database/models/Order";
import User from "../../backend/database/models/User";
import connectToMongo from "../../backend/database/connectToMongoDB";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectToMongo()

        let { yourCart, loggedUser } = req.body;

        const itemsPrice = yourCart
            .map((product: any): number => product.price * product.quantity)
            .reduce((a: any, b: any) => a + b, 0) * 100
        const shippingPrice = 100 * 5.99;
        const taxPrice = itemsPrice * 0;
        const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

        const newOrder = new Order({
            user: loggedUser._id,
            orderItems: [...yourCart],
            paymentMethod: "card",
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            isPaid: false,
            isDelivered: false,
        });
        const { _id } = await newOrder.save();

        await User.findByIdAndUpdate(loggedUser._id, { $push: { orders: _id } }, { new: true });

        res.send(_id);

    } catch (err) {
        console.log(err)
        res.status(500).send("error")
    }

}

export default handler;