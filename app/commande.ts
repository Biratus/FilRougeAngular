import { Product } from "./product";
import { User } from "./user.model";

export class Commande {
    id: number;
    date: Date;
    products: Array<Product>;
    user_id: number;
    totPrice:number;

    constructor(id: number, date: Date, products: Array<Product>, user_id: number, totPrice:number) {
        this.id = id;
        this.date = date;
        this.products = products;
        this.user_id=user_id;
        this.totPrice=totPrice;
    }

    static fromJson(jsonObj) {
        return new Commande(jsonObj.id, jsonObj.date,
        jsonObj.products.map(p => Product.fromJson(p)), 
        jsonObj.user_id, jsonObj.totPrice);
    }
}


