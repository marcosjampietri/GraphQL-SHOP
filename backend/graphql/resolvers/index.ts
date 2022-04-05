import { combineResolvers, resolverType } from 'fast-graphql';

import user from './user';
import product from './product';
// import order from './order';
import review from './review';

const resolvers: resolverType[] = [user, product, review];

const cominedResolvers = combineResolvers({ resolvers });

export default cominedResolvers;
