export class UserData {
    constructor(public email: string, public mobile: string, public name: string) {
    }
}

export class OtpData {
    constructor(public mobile: string, public otp: string) {
    }
}