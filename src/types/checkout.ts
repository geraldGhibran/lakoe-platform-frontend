export interface CustomerDetails {
  email?: string;
  name: string;
  phone: string;
  address: string;
  postal_code: number;
  receiver_longitude: number;
  receiver_latitude: number;
  receiver_district: string;
  longitude?: number;
  latitude?: number;
  city_district?: string;
  subdistrict?: string;
  store_id?: number;
  province?: string;
}

export interface Item {
  id: number;
  quantity: number;
}

export interface MidtransCheckout {
  customer_details: CustomerDetails;
  items: Item[];
  courierPrice: number;
}

// Example usage:
//   const order: Order = {
//     customer_details: {
//       name: "aaaa",
//       phone: "08123456",
//       address: "Jl. Sudirman No. 123, Jakarta",
//       postal_code: 16418,
//       receiver_longitude: 106.822744,
//       receiver_latitude: -6.174465,
//       receiver_district: "Central Jakarta",
//       store_id: 1,
//       email: "john.doe@example.com"
//     },
//     items: [
//       { id: 1, quantity: 1 },
//       { id: 2, quantity: 1 },
//       { id: 3, quantity: 1 }
//     ],
//     courierPrice: 79000
//   };
