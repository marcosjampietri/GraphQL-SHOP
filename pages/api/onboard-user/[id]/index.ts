import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../../backend/database/models/User";
import connectToMongo from "../../../../backend/database/connectToMongoDB"

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: { // For sample support and debugging, not required for production:
        name: "stripe-samples/connect-onboarding-for-standard",
        version: "0.0.1",
        url: "https://github.com/stripe-samples"
    }
});

export default async function onboardUser(req: NextApiRequest, res: NextApiResponse) {

    try {
        const account = await stripe.accounts.create({
            type: 'standard',
        });

        // Store the ID of the new Standard connected account.
        req.query._id = account.id;

        // const origin = `${req.headers.origin}`;
        const origin = "http://localhost:3000";

        const accountLink = await stripe.accountLinks.create({
            type: "account_onboarding",
            account: account.id,
            refresh_url: `${origin}/onboard-user/refresh`,
            //TODO: redirecionar pra dashboard de vendedor em vez de success
            return_url: `${origin}/success.html`,
        });

        //TODO: change account level to seller and add stripe account id to user on database
        // await connectToMongo()
        // const data = await User.findById(req.query._id)

        res.redirect(303, accountLink.url);

    } catch (err: any) {

        res.status(500).send({
            error: err.message,
        });
    }

}
