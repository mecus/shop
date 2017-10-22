
export type TempOrderType = {
    userid: string,
    delivery_option: {
        method: string;
        price: string;
    };
    delivery_address: {
        full_name: string;
        address: string;
        address2: string;
        city: string;
        post_code: string;
        country: string;
    };
    ground_total: Number;
    payment_method: string;
    token: string;

}
// export class Temporder {
//     torder:TempOrder;
//     constructor(){
//     this.torder = {
//         userid: null,
//         delivery_address: {
//             full_name: null,
//             address: null,
//             address2: null,
//             city: null,
//             post_code: null,
//             country: null
//         },
//         delivery_option: {
//             method: null,
//             price: null
//         },
//         ground_total: null,
//         payment_method: null,
//         token: null
//         }
//     }
// }