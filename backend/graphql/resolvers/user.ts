import userController from "../../../backend/controllers/userController";
import { resolverType } from "fast-graphql";
import * as schema from "../../../backend/graphql/generated/schemaType";
import User from "../../database/models/User";
import jwt, { Secret } from "jsonwebtoken";

const Query = {
    async readUser(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Query["readUser"]> {
        //referencia disso aqui: https://dev.to/cvr/graphql-http-only-jwt-authentication-with-next-js-3083
        // ctx.user?.id ? db.findUser(ctx.user.id) : null

        const exists = await ctx.user?.email;

        try {
            // Find document by id
            if (!args?.email) {
                return null;
            }
            const result = await User.findOne({ email: args?.email });
            if (!result) {
                return null;
            } else {
                return result;
            }
        } catch (err) {
            return null;
        }
    },
    async listUser(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Query["listUser"]> {
        return await userController().list(args);
    },
    async searchUser(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Query["searchUser"]> {
        return await userController().search(args);
    },
};

const expiration = 60 * 60 * 24 * 1;

const Mutation = {
    async createUser(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Mutation["createUser"]> {
        // console.log(ctx);
        // const { req, res } = ctx;

        // const user = await userController().create(args);
        try {
            const { name, email, password } = args.body;

            if (!args?.body) {
                return null;
            }

            const createdUser = await User.findOne({ email });
            if (createdUser) {
                return null;
            }

            const newUser = new User({
                name,
                email,
                password,
            });

            newUser.password = await newUser.encryptPassword(newUser.password);

            const savedUser: any = await newUser.save();

            const token = jwt.sign(
                { _id: savedUser._id },
                <Secret>process.env["JWT_TOKEN_SECRET"],

                {
                    algorithm: "HS256",
                    expiresIn: expiration,
                }
            );

            ctx.cookies.set("auth-token", token, {
                httpOnly: true,
                sameSite: "none",
                maxAge: expiration,
                secure: true,
                domain: 'new-shop-tau.vercel.app'
            });

            const result = {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                level: savedUser.level,
                addresses: savedUser.addresses,
                orders: savedUser.orders,
            };

            if (!result) {
                return null;
            } else {
                return result;
            }
        } catch (err: any) {
            return err.message;
        }
    },

    async logUser(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Mutation["logUser"]> {
        // console.log(ctx);
        // const { req, res } = ctx;

        // const user = await userController().create(args);
        try {
            const { email, password } = args.body;

            if (!args?.body) {
                return null;
            }

            const logUser = await User.findOne({ email });
            if (!logUser) {
                return null;
            }

            const matchPass = await logUser.validatePassword(password);
            if (!matchPass) {
                return null;
            }

            const token = jwt.sign(
                { _id: logUser._id },
                <Secret>process.env["JWT_TOKEN_SECRET"],

                {
                    algorithm: "HS256",
                    expiresIn: expiration,
                }
            );

            ctx.cookies.set("auth-token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: expiration,
                // secure: process.env.NODE_ENV === "production",
                domain: 'new-shop-tau.vercel.app'
            });

            const result = {
                _id: logUser._id,
                name: logUser.name,
                email: logUser.email,
                level: logUser.level,
                addresses: logUser.addresses,
                orders: logUser.orders,
            };

            if (!result) {
                return null;
            } else {
                console.log(token);
                return result;
            }
        } catch (err: any) {
            return err.message;
        }
    },

    async addAddress(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Mutation["addAddress"]> {
        try {
            const address = await args.body;
            const id = await args._id;
            if (!args) {
                return null;
            }

            const locatedUser = await User.findByIdAndUpdate(
                id,
                { $push: { addresses: address } },
                { new: true }
            );

            console.log(locatedUser)

            const result = {
                _id: locatedUser._id,
                name: locatedUser.name,
                email: locatedUser.email,
                level: locatedUser.level,
                addresses: locatedUser.addresses,
                orders: locatedUser.orders,
            };

            if (!result) {
                return null;
            } else {
                return result;
            }


        } catch (err: any) {
            return err.message;
        }
    },

    async updateUser(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Mutation["updateUser"]> {
        return await userController().update(args);
    },

    async deleteUser(
        parent: any,
        args: any,
        ctx: any
    ): Promise<schema.Mutation["deleteUser"]> {
        return await userController().delete(args);
    },
};

const resolver: resolverType = { Query, Mutation };

export default resolver;
