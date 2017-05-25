
export interface Customer {
    first_name: string;
    last_name: string;
    email: string;
    telephone: number;
    address: Address;

}
export interface Address {
    house_no: number;
    street_name: string;
    post_code: string;
    city: string;
    country: string;
}