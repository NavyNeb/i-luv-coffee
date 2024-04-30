import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            brand: "Buddy Brew",
            flavors: ["chocolate", "vanilla"],
            name: "Shipwreck Roast"
        },
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string){
        return this.coffees.find(item => item.id === +id)
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
    }

    update(id:string, updateCoffeeDto: any) {
        let updateItem = this.findOne(id);

        if (updateItem) {
            updateItem = updateCoffeeDto;
            return;
        }
    }

    remove(id:string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    }
}

