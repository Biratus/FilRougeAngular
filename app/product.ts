export class Product {

    id: number;
    name: string;
    type: string;
    price: number;
    category: string;
    qty: number;
    src: string;
    activ:boolean;

    constructor(id: number, name: string, type: string, price: number, category: string, qty: number, src: string, activ:boolean) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.category = category;
        this.qty = qty;
        this.src = src;
        this.activ=activ;
    }

    static fromJson(jsonObj) {
        return new Product(jsonObj.id,jsonObj.name,jsonObj.type,jsonObj.price,jsonObj.category,jsonObj.qty,jsonObj.src,true);
    }
}
