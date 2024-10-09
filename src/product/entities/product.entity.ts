import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {
@Prop({required: true})
    nom : string;

    @Prop({required: true})
prix : number;

@Prop({required:true

})
decription : string;

}
export const ProductSchema = SchemaFactory.createForClass(Product);
