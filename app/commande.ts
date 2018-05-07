import { Product } from "./product";
import { User } from "./user.model";

export class Commande {

    id_commande: number;
    date: Date;
    products: Array<Product>;
    user: User;


    constructor(id_commande: number, date: Date, products: Array<Product>,user:User) {
        this.id_commande = id_commande;
        this.date = date;
        this.products = products;

    }

    static fromJson(jsonObj) {
        return new Commande(jsonObj.id_commande,jsonObj.date,jsonObj.products,jsonObj.user);
    }
}


