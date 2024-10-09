import { Module } from '@nestjs/common';
import { OderService } from './oder.service';
import { OderController } from './oder.controller';
import { Oder ,OderSchema} from './entities/oder.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name : Oder.name ,schema:OderSchema}])],
  controllers: [OderController],
  providers: [OderService],
})
export class OderModule {}
