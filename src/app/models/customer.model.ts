
export interface iCustomer {
    firstname: string;
    lastname: string;
    email: string;
    telephone: number;
    address: string;
    address2: string;
    postcode: string;
    city: string;
    country: string;
    delivery_address: DeliveryAddress;

}
export interface DeliveryAddress {
    address: string;
    address2: string;
    postcode: string;
    city: string;
    country: string;
}