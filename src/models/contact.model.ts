import { Address } from "./address.model";

export class Contact {
    constructor(firstName: string, lastName: string, picture: string, phones: string[], emails: string[], addresses: Address[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.picture = picture;
        this.phones = phones;
        this.emails = emails;
        this.addresses = addresses;
    }

    public firstName: string = '';
    public lastName: string = '';
    public picture: string = '';
    public phones: string[] = [];
    public emails: string[] = [];
    public addresses: Address[] = [];
}