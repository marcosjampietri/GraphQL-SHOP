import { ApolloServer } from 'apollo-server-micro'
import typeDefs from '../../backend/graphql/typeDefs';
import resolvers from '../../backend/graphql/resolvers';
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import connectToMongoDB from '../../backend/database/connectToMongoDB';
import Cors from 'micro-cors'

const cors = Cors()

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
})

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.end()
        return false
    }
    await connectToMongoDB();
    await startServer
    await apolloServer.createHandler({
        path: '/api/graphql',
    })(req, res)
})

export const config = {
    api: {
        bodyParser: false,
    },
}