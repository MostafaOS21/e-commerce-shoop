import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Product {
  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subCategory: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

const ProductSchema = SchemaFactory.createForClass(Product);

export { ProductSchema, Product };
