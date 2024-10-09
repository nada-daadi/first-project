import { CreateProductDto } from '../../product/dto/create-product.dto';
import { CreateUserDto } from "src/user/dto/create-user.dto";
export class CreateOderDto {

    utilisateur : CreateUserDto;
    product: CreateProductDto;
    quantite : number ;
    statut : string;
}
