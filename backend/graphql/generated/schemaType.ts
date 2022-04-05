export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Address = {
  __typename?: 'Address';
  city: Scalars['String'];
  country: Scalars['String'];
  fullname: Scalars['String'];
  postcode: Scalars['String'];
  street: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  fullname: Scalars['String'];
  postcode: Scalars['String'];
  street: Scalars['String'];
};

export type CreateUserType = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type InputProductType = {
  description: Scalars['String'];
  owner: Scalars['ID'];
  photos: Array<InputMaybe<Scalars['String']>>;
  price: Scalars['Float'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export type InputReviewType = {
  author: Scalars['ID'];
  feedback?: InputMaybe<Scalars['String']>;
  place: Scalars['ID'];
  rate: Scalars['Float'];
};

export type Item = {
  __typename?: 'Item';
  image?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  quantity?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type LogUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAddress?: Maybe<User>;
  createProduct?: Maybe<Product>;
  createReview?: Maybe<Review>;
  createUser?: Maybe<User>;
  deleteProduct?: Maybe<Product>;
  deleteReview?: Maybe<Review>;
  deleteUser?: Maybe<User>;
  logUser?: Maybe<User>;
  updateProduct?: Maybe<Product>;
  updateReview?: Maybe<Review>;
  updateUser?: Maybe<User>;
};


export type MutationAddAddressArgs = {
  _id: Scalars['ID'];
  body: AddressInput;
};


export type MutationCreateProductArgs = {
  body: InputProductType;
};


export type MutationCreateReviewArgs = {
  body: InputReviewType;
};


export type MutationCreateUserArgs = {
  body: CreateUserType;
};


export type MutationDeleteProductArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteReviewArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  _id: Scalars['ID'];
};


export type MutationLogUserArgs = {
  body: LogUserInput;
};


export type MutationUpdateProductArgs = {
  _id: Scalars['ID'];
  body: InputProductType;
};


export type MutationUpdateReviewArgs = {
  _id: Scalars['ID'];
  body: InputReviewType;
};


export type MutationUpdateUserArgs = {
  _id: Scalars['ID'];
  body: CreateUserType;
};

export type Order = {
  __typename?: 'Order';
  _id: Scalars['ID'];
  isDelivered?: Maybe<Scalars['Boolean']>;
  isPaid?: Maybe<Scalars['Boolean']>;
  itemsPrice?: Maybe<Scalars['Float']>;
  orderItems?: Maybe<Array<Maybe<Item>>>;
  paymentMethod?: Maybe<Scalars['String']>;
  paymentResult?: Maybe<Scalars['String']>;
  shippingPrice?: Maybe<Scalars['Float']>;
  taxPrice?: Maybe<Scalars['Float']>;
  totalPrice?: Maybe<Scalars['Float']>;
  user?: Maybe<User>;
};

export type PaginationType = {
  __typename?: 'PaginationType';
  count: Scalars['Int'];
  page: Scalars['Int'];
  pages: Scalars['Int'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  photos?: Maybe<Array<Maybe<Scalars['String']>>>;
  price: Scalars['Float'];
  reviews?: Maybe<Array<Maybe<Review>>>;
  title: Scalars['String'];
};

export type ProductEdgesType = {
  __typename?: 'ProductEdgesType';
  edges?: Maybe<Array<Maybe<Product>>>;
  pagination?: Maybe<PaginationType>;
};

export type Query = {
  __typename?: 'Query';
  listProduct?: Maybe<ProductEdgesType>;
  listReview?: Maybe<ReviewEdgesType>;
  listUser?: Maybe<UserEdgesType>;
  readProduct?: Maybe<Product>;
  readReview?: Maybe<Review>;
  readUser?: Maybe<User>;
  reviewByUser?: Maybe<Array<Maybe<Review>>>;
  searchProduct?: Maybe<Array<Maybe<Product>>>;
  searchReview?: Maybe<Array<Maybe<Review>>>;
  searchUser?: Maybe<Array<Maybe<User>>>;
};


export type QueryListProductArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryListReviewArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryListUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<Scalars['String']>;
};


export type QueryReadProductArgs = {
  _id: Scalars['ID'];
};


export type QueryReadReviewArgs = {
  _id: Scalars['ID'];
};


export type QueryReadUserArgs = {
  email: Scalars['String'];
};


export type QueryReviewByUserArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QuerySearchProductArgs = {
  fields: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QuerySearchReviewArgs = {
  fields: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};


export type QuerySearchUserArgs = {
  fields: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  _id: Scalars['ID'];
  author?: Maybe<User>;
  feedback?: Maybe<Scalars['String']>;
  place?: Maybe<Scalars['ID']>;
  rate?: Maybe<Scalars['Float']>;
};

export type ReviewEdgesType = {
  __typename?: 'ReviewEdgesType';
  edges?: Maybe<Array<Maybe<Review>>>;
  pagination?: Maybe<PaginationType>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  addresses?: Maybe<Array<Maybe<Address>>>;
  email: Scalars['String'];
  encryptPassword?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orders?: Maybe<Array<Scalars['ID']>>;
  password?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  validatePassword?: Maybe<Scalars['String']>;
};

export type UserEdgesType = {
  __typename?: 'UserEdgesType';
  edges?: Maybe<Array<Maybe<User>>>;
  pagination: PaginationType;
};
