import productController from '../../../backend/controllers/productController';
import { resolverType } from 'fast-graphql';
import * as schema from '../../../backend/graphql/generated/schemaType';
import Product from "../../database/models/Product";

const Query = {
    async readProduct(parent: any, args: any, ctx: any): Promise<schema.Query['readProduct']> {

        const data = await Product.findById(args._id)

        return data
    },
    async listProduct(parent: any, args: any, ctx: any): Promise<schema.Query['listProduct']> {
        return await productController().list(args);
    },
    async searchProduct(parent: any, args: any, ctx: any): Promise<schema.Query['searchProduct']> {
        return await productController().search(args);
    },
};

const Mutation = {
    async createProduct(parent: any, args: any, ctx: any): Promise<schema.Mutation['createProduct']> {
        return await productController().create(args);
    },
    async updateProduct(parent: any, args: any, ctx: any): Promise<schema.Mutation['updateProduct']> {
        return await productController().update(args);
    },
    async deleteProduct(parent: any, args: any, ctx: any): Promise<schema.Mutation['deleteProduct']> {
        return await productController().delete(args);
    },
};

const resolver: resolverType = { Query, Mutation };

export default resolver;
