import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
    mutation Mutation($body: CreateUserType!) {
      createUser(body: $body) {
        _id
        token
        name
        email
        orders
        addresses {
          street
        }
      }
    }
`;

// {
//   "body": {
//     "name": null,
//     "email": null,
//     "password": null
//   }
// }