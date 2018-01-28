export interface IDepartment {
    name: string;
    code: String;
    feature_image: string;
    group: string;
    image_url: string;
}
export interface IAisle {
    name: String;
    department_id: String;
    group: String;
}
export interface ICategory {
    name: String;
    department_id: String;
    aisle_id: string;
    group: String;
}
export interface IProduct {
    name: String;
    code: String;
    price: string;
    old_price: string;
    imageUrl: String;
    photo_id: String;
    offer: String;
    brand: String;
    sponsored: String;
    recommend: String;
    category: {
        type: String;
    };
    department_id: String;
    category_id: String;
    aisle_id: String;
    stock: Number;
    description: Description;
    nutrition: nutrition;
    publish: String;
}
interface Description {
    detail: string;
    size: string;
    origin: string;
}
interface nutrition {
    energy: string;
    fat: string;
    saturates: string;
    salt: string;
}
