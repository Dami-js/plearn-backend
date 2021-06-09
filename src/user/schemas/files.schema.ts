import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaterialDocument = Material & Document;

// export interface CreateMaterialDto extends Material {}

@Schema()
export class Material {
  @Prop({ type: 'Buffer' })
  data: Buffer;

  @Prop()
  filename: string;

  @Prop()
  contentType: string;

  @Prop({ type: Date, default: Date.now() })
  othernames: Date;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
