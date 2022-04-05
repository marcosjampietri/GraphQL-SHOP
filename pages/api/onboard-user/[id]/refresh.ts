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

export default async function onboardUserRefresh(req: NextApiRequest, res: NextApiResponse) {

    if (!req.query._id) {
        res.redirect("/");
        return;
    }

    try {
        const { _id } = req.query;
        // const origin = `${req.secure ? "https:" : "https:"}${req.headers.host}`;

        const origin = "http://localhost:3000";

        const accountLink = await stripe.accountLinks.create({
            type: "account_onboarding",
            account: _id,
            refresh_url: `${origin}/onboard-user/refresh`,
            return_url: `${origin}/success.html`,
        });

        res.redirect(303, accountLink.url);
    } catch (err: any) {
        res.status(500).send({
            error: err.message,
        });
    }

}
