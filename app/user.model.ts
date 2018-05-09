export class User {
    lastName: string;
    firstName: string;
    mail: string;
    address: string;
    phone: string;
    role: string;
    password: string;

    constructor(lastName: string, firstName: string, mail: string, address: string, phone: string, role: string, pwd: string) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.mail = mail;
        this.address = address;
        this.phone = phone;
        this.password = pwd;
        this.role = role;
    }

    static fromJSON(jsonObj) {
        if (jsonObj == null) return null;
        return new User(jsonObj.lastname, jsonObj.firstname, jsonObj.mail, jsonObj.address, jsonObj.phone, jsonObj.role, jsonObj.password);
    }
}
