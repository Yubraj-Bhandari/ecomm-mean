// Define Product type here if the import is missing or incorrect
export interface Product {
    _id?:string,
        "name": string,
        "description": string,
        "shortDescription": string,
        "price": number,
        "discount": number,
        "images": string[],
        "categoryId": string[],
        "isFeatured": boolean,
        "isNew": boolean,

}