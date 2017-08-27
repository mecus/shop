
export type tempOtype = {
    userid: string,
    delivery_address: {
      full_name: string,
      address: string,
      address2: string,
      city: string,
      post_code: string,
      country: string
    },
    delivery_method: {
      method: string,
      price: string
    },
    payment_method: string,
    token: string,
    ground_total: string
}
export class TempOrder {
    torder:tempOtype;
    constructor(){
    this.torder = {
        userid: null,
        delivery_address: {
            full_name: null,
            address: null,
            address2: null,
            city: null,
            post_code: null,
            country: null
        },
        delivery_method: {
            method: null,
            price: null
        },
        ground_total: null,
        payment_method: null,
        token: null
        }
    }
}