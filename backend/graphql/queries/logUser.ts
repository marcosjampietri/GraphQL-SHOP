import { useMutation, NetworkStatus, gql, ReactiveVar, makeVar } from "@apollo/client";

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

export const LOGIN_USER_MUTATION = gql`
    mutation Mutation($body: LogUserInput!) {
      logUser(body: $body) {
        _id
        token
        name
        email
        level
        addresses {
          street
        }
        orders
      }
    }
`;

export const ADDRESS_MUTATION = gql`
    mutation Mutation($id: ID!, $body: AddressInput!) {
      addAddress(_id: $id, body: $body) {
        _id
        name
        email
        orders
        addresses {
          fullname
          street
          city
          postcode
          country
        }
        level
      }
    }
`;

export const GET_LOGGED_USER_QUERY = gql`
    query Query{
        loggedUser @client
      }
`;


export interface loggedUser {
    _id: string;
    name: string;
    email: string;
    addresses: [];
    orders: []

}
const userInitialValue: loggedUser = {
    _id: '',
    name: '',
    email: "",
    addresses: [],
    orders: []
}
export const loggedUser: ReactiveVar<loggedUser> = makeVar<loggedUser>(
    userInitialValue
);

export const useCreaUser = () => {
    const [createUser, { data, loading: creaLoading, error }] = useMutation(
        REGISTER_USER_MUTATION,
        {
            update(cache, { data: { createUser } }) {
                const createdUserData: loggedUser = {
                    _id: createUser._id,
                    name: createUser.name,
                    email: createUser.email,
                    addresses: createUser.addresses,
                    orders: createUser.orders
                }
                // console.log(createdUserData)
                loggedUser(createdUserData)
                cache.writeQuery({ query: GET_LOGGED_USER_QUERY, data: { createdUserData } });
            }
        }
    );
    const creaData = JSON.stringify(data?.createUser);
    return { createUser, creaData, error, creaLoading };
}

export const useLogUser = () => {
    const [logUser, { data, loading: logLoading, error }] = useMutation(
        LOGIN_USER_MUTATION,
        {
            update(cache, { data: { logUser } }) {
                const loggedUserData: loggedUser = {
                    _id: logUser._id,
                    name: logUser.name,
                    email: logUser.email,
                    addresses: logUser.addresses,
                    orders: logUser.orders
                }
                // console.log(loggedUserData)
                loggedUser(loggedUserData)
                // cache.writeQuery({ query: GET_LOGGED_USER_QUERY, data: { loggedUserData } });
            }
        }
    );
    const logData = JSON.stringify(data?.logUser);
    return { logUser, logData, error, logLoading };
}

export const useAddAddress = () => {
    const [addAddress, { data, loading, error }] = useMutation(
        ADDRESS_MUTATION,
        {
            update(cache, { data: { addAddress } }) {
                const loggedUserData: loggedUser = {
                    _id: addAddress._id,
                    name: addAddress.name,
                    email: addAddress.email,
                    addresses: addAddress.addresses,
                    orders: addAddress.orders
                }
                // console.log(loggedUserData)
                loggedUser(loggedUserData)
                // cache.writeQuery({ query: GET_LOGGED_USER_QUERY, data: { loggedUserData } });
            }
        }
    );
    const userData = JSON.stringify(data?.addAddress);
    return { addAddress, loading, userData, error };
}
