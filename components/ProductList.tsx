import { useQuery, NetworkStatus } from "@apollo/client";
import { LIST_PRODUCT_QUERY } from "../backend/graphql/queries/product";
import ErrorMessage from "./ErrorMessage";

export const listProductQueryVars = {
    page: 1,
};

export default function ProductList() {
    const { loading, error, data, fetchMore, networkStatus } = useQuery(
        LIST_PRODUCT_QUERY,
        {
            variables: listProductQueryVars,
            // Setting this value to true will make the component rerender when
            // the "networkStatus" changes, so we are able to know if it is fetching
            // more data
            notifyOnNetworkStatusChange: true,
        }
    );

    const loadingMoreProducts = networkStatus === NetworkStatus.fetchMore;

    if (error) return <ErrorMessage message="Error loading products." />;
    if (loading && !loadingMoreProducts) return <div>Loading</div>;

    console.log(
        "🚀 ~ file: ProductList.tsx ~ line 53 ~ ProductList ~ data",
        data
    );

    const { listProduct } = data;

    const loadMoreProducts = () => {
        fetchMore({
            variables: {
                page: listProduct?.pagination.page + 1,
            },
        });
    };
    const areMoreProducts =
        listProduct?.pagination.page < listProduct?.pagination.pages;

    return (
        <section>
            <ul>
                {listProduct?.edges.map((product: any, index: number) => (
                    <li key={product._id}>
                        <div>
                            <span>{index + 1}. </span>
                            <div>{product.title}</div>
                            <div>{product.price}</div>
                        </div>
                    </li>
                ))}
            </ul>
            {areMoreProducts && (
                <button
                    onClick={() => loadMoreProducts()}
                    disabled={loadingMoreProducts}
                >
                    {loadingMoreProducts ? "Loading..." : "Show More"}
                </button>
            )}
        </section>
    );
}
