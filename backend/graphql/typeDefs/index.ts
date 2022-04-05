export default `type Address {
    fullname: String!
    street: String!
    city: String!
    postcode: String!
    country: String!
}
 type Item {
  title: String
  quantity: Int
  price: Float
  image: String
}
type Order {
  _id: ID!
  user: User
  orderItems: [Item]
  paymentMethod: String
  paymentResult: String
  itemsPrice: Float
  shippingPrice: Float
  taxPrice: Float
  totalPrice: Float
  isPaid: Boolean
  isDelivered: Boolean
  # paidAt: Date
  # deliveredAt: Date
}
 type Product {
    _id: ID!
    owner: User
    title: String!
    image: String
    description: String
    price: Float!
    photos: [String]
    reviews: [Review]
}

input InputProductType {
    # verificar o q é esse type
    type: String!
    owner: ID!
    title: String!
    description: String!
    price: Float!
    photos: [String]!
}

type Mutation {
    createProduct(body: InputProductType!): Product
    updateProduct(_id: ID!, body: InputProductType!): Product
    deleteProduct(_id: ID!): Product
}

type PaginationType {
    page: Int
    pages: Int
    count: Int
}

type ProductEdgesType {
    edges: [Product]
    pagination: PaginationType
}

type Query {
    readProduct(_id: ID!): Product
    listProduct(
        page: Int
        limit: Int
        sortBy: String
        sortOrder: String
    ): ProductEdgesType
    searchProduct(limit: Int, query: String!, fields: String!): [Product]
}
 type Review {
  _id: ID!
  author: User
  feedback: String
  rate: Float
  place: ID
}

type Query {
  reviewByUser(_id: ID): [Review]
}

input InputReviewType {
  author: ID!
  feedback: String
  rate: Float!
  place: ID!
}

type Mutation {
  createReview(body: InputReviewType!): Review
  updateReview(_id: ID!, body: InputReviewType!): Review
  deleteReview(_id: ID!): Review
}

type PaginationType {
  page: Int
  pages: Int
  count: Int
}

type ReviewEdgesType {
  edges: [Review]
  pagination: PaginationType
}

type Query {
  readReview(_id: ID!): Review
  listReview(page: Int, limit: Int, sortBy: String, sortOrder: String): ReviewEdgesType
  searchReview(limit: Int, query: String!, fields: String!): [Review]
}
 type User {
    _id: ID!
    token: String
    name: String
    email: String!
    password: String
    level: String
    encryptPassword: String
    validatePassword: String
    addresses: [Address]
    orders: [ID!]
}

input CreateUserType {
    name: String
    email: String!
    password: String!
}

input LogUserInput {
    email: String!
    password: String!
}

input AddressInput {
    fullname: String!
    street: String!
    city: String!
    postcode: String!
    country: String!
}

type Mutation {
    createUser(body: CreateUserType!): User
    logUser(body: LogUserInput!): User
    addAddress(_id: ID!, body: AddressInput!): User
    updateUser(_id: ID!, body: CreateUserType!): User
    deleteUser(_id: ID!): User
}

type PaginationType {
    page: Int!
    pages: Int!
    count: Int!
}

type UserEdgesType {
    edges: [User]
    pagination: PaginationType!
}

type Query {
    readUser(email: String!): User
    listUser(
        page: Int
        limit: Int
        sortBy: String
        sortOrder: String
    ): UserEdgesType
    searchUser(limit: Int, query: String!, fields: String!): [User]
}
`;