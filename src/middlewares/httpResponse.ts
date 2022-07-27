export class Http {
    
    static OK: any = {
        status: 200,
        statusText: "OK"
    }

    static Failed: any = {
        status: 424,
        statusText: "Failed Dependency"
    }

    static BadRequest: any = {
        status: 400,
        statusText: "Bad Request"
    }
}