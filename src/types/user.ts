import { CourierDto } from './courier';

export interface UserType {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: RoleEnum;
  locationId?: number;
  storeId?: number;
  store?: StoreType;
}

export interface StoreType {
  id: number;
  couriers: CourierDto[];
}

export enum RoleEnum {
  ADMIN = 'ADMIN',
  SELLER = 'SELLER',
}
