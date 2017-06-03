/**
 * Created by mukadder on 3/2/17.
 */
const SYM1= Symbol();

const o = { a: 1, b: 2, c: 3, [SYM1]: 4 };

for(let prop in o) {
    if(!o.hasOwnProperty(prop)) continue;
    console.log(`${prop}: ${o[prop]}`);
}
const SYM2 = Symbol();

const o2= { a: 1, b: 2, c: 3, [SYM2]: 4 };

Object.keys(o2).forEach(prop => console.log(`${prop}: ${o2[prop]}`));

const o3 = { apple: 1, xochitl: 2, balloon: 3, guitar: 4, xylophone: 5, };

Object.keys(o3)
    .filter(prop => prop.match(/^x/))
    .forEach(prop => console.log(`${prop}: ${o3[prop]}`));

class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.userGears = ['P', 'N', 'R', 'D'];
        this.userGear = this.userGears[0];
    }
    shift(gear) {
        if(this.userGears.indexOf(gear) < 0)
            throw new Error(`Invalid gear: ${gear}`);
        this.userGear = gear;
    }
}//better
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this._userGears = ['P', 'N', 'R', 'D'];
        this._userGear = this._userGears[0];
    }

    get userGear() { return this._userGear; }
    set userGear(value) {
        if(this._userGears.indexOf(value) < 0)
            throw new Error(`Invalid gear: ${value}`);
        this._userGear = vaule;
    }

    shift(gear) { this.userGear = gear; }
}
const Car = (function() {

    const carProps = new WeakMap();

    class Car {
        constructor(make, model) {
            this.make = make;
            this.model = model;
            this._userGears = ['P', 'N', 'R', 'D'];
            carProps.set(this, { userGear: this._userGears[0] });
        }

        get userGear() { return carProps.get(this).userGear; }
        set userGear(value) {
            if(this._userGears.indexOf(value) < 0)
                throw new Error(`Invalid gear: ${value}`);
            carProps.get(this).userGear = value;
        }

        shift(gear) { this.userGear = gear; }
    }

    return Car;
})();
class Car {
    static getNextVin() {
        return Car.nextVin++;    // we could also use this.nextVin++
                                 // but referring to Car emphasizes
                                 // that this is a static method
    }
    constructor(make, model) {
        this.make = make;
        this.model = model;
        this.vin = Car.getNextVin();
    }
    static areSimilar(car1, car2) {
        return car1.make===car2.make && car1.model===car2.model;
    }
    static areSame(car1, car2) {
        return car1.vin===car2.vin;
    }
}
Car.nextVin = 0;

const car1 = new Car("Tesla", "S");
const car2 = new Car("Mazda", "3");
const car3 = new Car("Mazda", "3");

car1.vin;      // 0
car2.vin;      // 1
car3.vin       // 2

Car.areSimilar(car1, car2);      // false
Car.areSimilar(car2, car3);      // true
Car.areSame(car2, car3);         // false
Car.areSame(car2, car2);         // true
class Vehicle {
    constructor() {
        this.passengers = [];
        console.log("Vehicle created");
    }
    addPassenger(p) {
        this.passengers.push(p);
    }
}

class Car extends Vehicle {
    constructor() {
        super();
        console.log("Car created");
    }
    deployAirbags() {
        console.log("BWOOSH!");
    }
}
class Super {
    constructor() {
        this.name = 'Super';
        this.isSuper = true;
    }
}

// this is valid, but not a good idea...
Super.prototype.sneaky = 'not recommended!';

class Sub extends Super {
    constructor() {
        super();
        this.name = 'Sub';
        this.isSub = true;
    }
}

const obj = new Sub();

for(let p in obj) {
    console.log(`${p}: ${obj[p]}` +
        (obj.hasOwnProperty(p) ? '' : ' (inherited)'));
}