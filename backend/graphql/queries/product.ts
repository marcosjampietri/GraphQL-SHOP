import { gql } from '@apollo/client';

export const LIST_PRODUCT_QUERY = gql`
query Query {
  listProduct {
    edges {
      _id
      title
      image
      price
      photos
    }
  }
}
`;

export const READ_PRODUCT_QUERY = gql`
query Query($id: ID!) {
  readProduct(_id: $id) {
    _id
    owner {
      name
    }
    title
    image
    reviews {
      author {
        name
      }
      feedback
      rate
      place
      _id
    }
    description
    price
    photos
  }
}`;