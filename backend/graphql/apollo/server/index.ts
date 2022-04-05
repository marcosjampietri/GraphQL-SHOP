import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import jwt from "jsonwebtoken";
import Cookies from "cookies";

// import { createContext } from "./context";
import typeDefs from '../../../graphql/typeDefs';
import resolvers from '../../../graphql/resolvers';
import connectToMongoDB from '../../../database/connectToMongoDB';

const verifyToken = (token: any) => {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET!);
    } catch {
        return null;
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        const cookies = new Cookies(req, res);
        const token = cookies.get("auth-token");
        const user = verifyToken(token);
        return {
            cookies,
            user,
        };
    }
    // context: createContext
});
const startServer = apolloServer.start();

export default async function graphqlServer({
    req,
    res,
    serverConfig = {},
}: {
    req: NextApiRequest;
    res: NextApiResponse;
    serverConfig?: any;
}) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    await connectToMongoDB();
    await startServer;
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res);
}
