import { Field } from './field';

export type Metadata = {
  name: string;
  size: number;
  pkField: string;
  fields: Field[];
}
