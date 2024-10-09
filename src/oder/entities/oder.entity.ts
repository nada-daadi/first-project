import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";


export type OderDocument = HydratedDocument <Oder>;
@Schema()

export class Oder {

    @Prop()
    quantite : number ;
    @Prop()
    statut : string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;  
  
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
    products: Product[];  
   
    @Prop()
    totalAmount: number;  

}

 export const OderSchema = SchemaFactory.createForClass(Oder) ;
