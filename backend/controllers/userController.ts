import crudController from '../controllers/crudController';
import jwt, { Secret } from "jsonwebtoken";
import * as schemaType from '../graphql/generated/schemaType';
import User from '../database/models/User';

function userController() {
    const controllers = crudController<schemaType.User>(User);

    controllers.create = async (args) => {
        try {
            const { name, email, password } = args.body

            if (!args?.body) {
                return null;
            }

            const logUser = await User.findOne({ email })
            if (logUser) {
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
                    expiresIn: 60 * 60 * 24 * 1,
                }
            );

            const result = {
                _id: savedUser._id,
                token,
                name: savedUser.name,
                email: savedUser.email,
                level: savedUser.level,
                addresses: savedUser.addresses,
                orders: savedUser.orders,

            };

            if (!result) {
                return null
            } else {
                return result;
            }

        } catch (err: any) {
            return err.message;
        }
    };

    return controllers
}

export default userController;
