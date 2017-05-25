export interface iProduct {
    name: string;
    id: string;
    code: string;
    price: string;
    imageUrl: string;
    category: string;
    catCode: string;
    description: Description;
    nutrition: nutrition;

}
export interface Description {
    detail: string;
    size: string;
    origin: string;
}
export interface nutrition {
    energy: string;
    fat: string;
    saturates: string;
    salt: string;
}

