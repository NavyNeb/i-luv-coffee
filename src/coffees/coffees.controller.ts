import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}

    /**
     * @Get specifies that the route is a get route. can optionally take params to specify a specific route.
     * @param paginationQuery 
     * @returns coffeesService.findAll coffeesArray[]
     */
    @Get()
    findAll(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return this.coffeeService.findAll();
    }

    /**
     * @Get get route with a param (id)
     * @param id 
     * @returns coffeesService.findOne coffeeObject {}
     */
    @Get(':id')
    findOne(@Param('id') id:string) {
        return this.coffeeService.findOne(id);
    }
 
    /**
     * @Post specifies that the route is a post route. Can optionally receive params in its brakets ()
     * @param body 
     * @returns coffeesService.create coffeeObject {}
     */
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeeService.create(createCoffeeDto);
    }

    /**
     * @Patch patch route
     * @param id 
     * @param createCoffeeDto 
     * @returns coffeesService.update coffeesObject {}
     */
    @Patch(':id')
    update(@Param() id:string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeDto);
    }
}
