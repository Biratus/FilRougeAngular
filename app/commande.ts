import { Product } from "./product";
import { User } from "./user.model";

export class Commande {
    id: number;
    date: Date;
    products: Array<Product>;
    user: User;
    priceTot:number;

    constructor(id: number, date: Date, products: Array<Product>, pricetot:number) {
        this.id = id;
        this.date = date;
        this.products = products;
        this.priceTot=pricetot;
    }

    static fromJson(jsonObj) {
        return new Commande(jsonObj.id, jsonObj.date,
        jsonObj.products.map(p => Product.fromJson(p)),
        jsonObj.priceTot);
        
    }
}


