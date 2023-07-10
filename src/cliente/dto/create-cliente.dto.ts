import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    identificacion:string;

    @IsString()
    @IsNotEmpty()
    nombre:string;
}
