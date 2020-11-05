/* tslint:disable */
export interface Panel {
  createdAt?: string;
  createdBy?: string;
  description: string;
  id: number;
  size: 'FULL' | 'TWO' | 'THREE';
  updatedAt?: string;
  updatedBy?: string;
}
