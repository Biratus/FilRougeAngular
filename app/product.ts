export class Product {
    
    name:string;
    type:string;
    price:number;
    category:string;
    qty:number;
    src:string;

    constructor( name:string, type:string, price:number, category:string, qty:number, src:string){
        this.name=name;
        this.type=type;
        this.price=price;
        this.category=category;
        this.qty=qty;
        this.src=src;
    }
}
