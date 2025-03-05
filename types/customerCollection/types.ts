export interface Customers {
  _id: string;
  countryCode: string;
  name: string;
  date?: string;
  email: string;
  phone: string;
  dob: null;
  role?: string;
  amountSpent?: string;
  gender: string;
  ordersCount?: number;
  itemsCount?: number;
  address?: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pinCode: string;
  };
}
