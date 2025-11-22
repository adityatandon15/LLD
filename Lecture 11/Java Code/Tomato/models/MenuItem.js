export class MenuItem {
    constructor(code, name, price) {
        this.code = code;
        this.name = name;
        this.price = price;
    }

    getCode() {
        return this.code;
    }

    setCode(c) {
        this.code = c;
    }

    getName() {
        return this.name;
    }

    setName(n) {
        this.name = n;
    }

    getPrice() {
        return this.price;
    }

    setPrice(p) {
        this.price = p;
    }
}
