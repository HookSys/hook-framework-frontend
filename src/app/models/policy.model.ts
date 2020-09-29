import { BaseModel } from './base.model';
import { Feature } from './feature.model';
import { User } from './user.model';

export interface Policy extends BaseModel {
    id: number;
    name: string;
    desc: string;
    effect: string;
    actions: string[];
    features?: Feature[];
    users?: User[];
}
