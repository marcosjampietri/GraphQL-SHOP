import crudController from '../controllers/crudController';
import * as schemaType from '../graphql/generated/schemaType';
import Review from '../database/models/Review';
import Product from '../database/models/Product';

function reviewController() {
    const controllers = crudController<schemaType.Review>(Review);

    controllers.create = async (args) => {
        try {
            // Creating a new document in the collection
            if (!args?.body) {
                return null;
            }
            const result: any = await new Review(args?.body).save();
            console.log('🚀 ~ file: reviewController.ts ~ line 17 ~ controllers.create = ', result);
            if (!result) {
                return null;
            } else {
                const { _id: reviewId } = result;
                const { place: palceId } = args?.body;
                await Product.findByIdAndUpdate(
                    { _id: palceId },
                    {
                        $push: { reviews: reviewId },
                    }
                ).exec();
                return result;
            }
        } catch (err) {
            return null;
        }
    };

    controllers.delete = async (args) => {
        try {
            // Creating a new document in the collection
            if (!args?._id) {
                return null;
            }
            // Find the document by id and delete it
            const result = await Review.findOneAndDelete({ _id: args?._id }).exec();

            if (!result) {
                return null;
            } else {
                const { place: palceId } = result;

                await Product.findOneAndUpdate(
                    { _id: palceId },
                    {
                        $pull: {
                            reviews: args?._id,
                        },
                    }
                ).exec();

                return result;
            }
        } catch (err) {
            return null;
        }
    };

    return controllers;
}

export default reviewController;
