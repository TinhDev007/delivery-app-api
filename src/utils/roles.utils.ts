export class ROLE {
    static ADMIN: string = 'admin';
    static MERCHANT: string = 'merchant';
    static USER: string = 'user';
    static ADMIN_ALL: any = {
        role: 'admin',
        range: 'all'
    };
    static MERCHANT_SELF: any = {
        role: 'merchant',
        range: 'self'
    };
    static MERCHANT_ALL: any = {
        role: 'merchant',
        range: 'all'
    };
    static USER_SELF: any = {
        role: 'user',
        range: 'self'
    };
    static USER_ALL: any = {
        role: 'user',
        range: 'all'
    };
    static NONE: any = {
        role: 'none',
        range: 'all'
    };
}