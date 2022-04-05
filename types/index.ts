
interface specsTypes {
    weight: string;
    dimensions: number;
    size: string;
    colour: string;
}[];

export type product = {
    title: string;
    _id: string;
    price: number;
    recommendedRetailPriceCurrency: string;
    image: string;
    brandName: string;
    categories: string[];
    specs: specsTypes;
    quantity?: any;
    itemTotal?: number;
};

export type productType = {
    title: string;
    _id: string;
    price: number;
    recommendedRetailPriceCurrency: string;
    image: string;
    brandName: string;
    categories: string[];
    specs: specsTypes;
    quantity?: any;
};


export type ProductResponse = product;
