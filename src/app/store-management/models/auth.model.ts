export interface Auth {
    uid: Number,
    type: string,
    displayName: string,
    photoURL: string,
    email: string,
    phone: string,
    status: string
    timeIn: Number,
    timeOut: Number,
    token: string
    who: string,
    emailVerified: Boolean
}