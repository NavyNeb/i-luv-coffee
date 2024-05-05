import { Flavor } from './entities/flavor.entity/flavor.entity';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepo: Repository<Coffee>,

        @InjectRepository(Flavor)
        private readonly flavorRepo: Repository<Flavor>
    ){}

    findAll() {
        return this.coffeeRepo.find({ relations: ['flavors'] });
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepo.find({ where: { id: Number(id) }, relations: ['flavors'] });

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }

        return coffee;
    }

    async create(createCoffeeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
        );

        const coffee = this.coffeeRepo.create({
            ...createCoffeeDto,
            flavors
        })
        
        return this.coffeeRepo.save(coffee);
    }

    async update(id:string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors && (
            await Promise.all(
                updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),
            )
        );
        const coffee = await this.coffeeRepo.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        });

        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`)
        }

        return this.coffeeRepo.save(coffee)
    }

    async remove(id:string) {
        const coffee = await this.coffeeRepo.findOne({ where: { id: Number(id) } })
        return this.coffeeRepo.remove(coffee)
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepo.findOne({ where: { name }})
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepo.create({ name })
    }
}

