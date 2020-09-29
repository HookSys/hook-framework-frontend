import { BaseModel } from './base.model';

export interface Feature extends BaseModel {
  id: number;
  name: string;
  icon: string;
  code: string;
  entrypoint: number;
  desc: string;
  isActive: boolean;
}
