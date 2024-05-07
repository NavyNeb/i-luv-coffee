import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Events } from 'src/events/entities/events.entity/events.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coffee, Flavor, Events])],
    controllers: [CoffeesController],
    providers: [CoffeesService],
})
export class CoffeesModule {}
