import { Address } from "./address.model";

export class Contact {
    constructor(name: string, picture: string, phones: string[], emails: string[], addresses: Address[]) {
        this.name = name;
        this.picture = picture;
        this.phones = phones;
        this.emails = emails;
        this.addresses = addresses;
    }

    public name: string = '';
    public picture: string = '';
    public phones: string[] = [];
    public emails: string[] = [];
    public addresses: Address[] = [];
}