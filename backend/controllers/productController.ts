import crudController from '../controllers/crudController';
import * as schemaType from '../graphql/generated/schemaType';
import Product from '../database/models/Product';

function productController() {
    return crudController<schemaType.Product>(Product);
}

export default productController;
