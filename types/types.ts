export interface Options {
  page: number;
  itemsPerPage: number;
  sortBy: Array<{ key: string; order: string }>;
  sortDesc: boolean[];
}
export interface SelectedData {
  _id?: string;
  countryCode: string;
  name: string;
  isEnabled?: string;
  dob: number;
  ordersCount: string;
  itemsCount: string;
  phone: string;
  email: string;
}
