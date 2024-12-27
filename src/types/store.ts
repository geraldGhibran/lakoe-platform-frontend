import { BankAccount } from './bank-account';
import { CourierDto } from './courier';
import { Location } from './locations';
import { Product } from './product';
import { UserType } from './user';

export interface Store {
  name: string;
  slogan?: string;
  description?: string;
  logo_img?: string;
  user_id: number;
  courier: string;
  location?: Location[];
  Locations: Location[];
  couriers: CourierDto[];
  bankAccount?: BankAccount;
  products?: Product[];
  user: UserType;
}
