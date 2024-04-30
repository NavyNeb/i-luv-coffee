import { IsString } from "class-validator";


export class CreateCoffeeDto {
    @IsString({ message: 'Must be a string' })
    readonly name: string;

    @IsString({ message: 'Must be a string' })
    readonly brand: string;
    
    @IsString({ each: true })
    readonly flavors: string[];
}
