export interface Pricing {
  available_collection_method: string[];
  available_for_cash_on_delivery: boolean;
  available_for_proof_of_delivery: boolean;
  available_for_instant_waybill_id: boolean;
  available_for_insurance: boolean;
  company: string;
  courier_name: string;
  courier_code: string;
  courier_service_name: string;
  courier_service_code: string;
  description: string;
  duration: string;
  shipment_duration_range: string;
  shipment_duration_unit: string;
  service_type: string;
  shipping_type: string;
  price: number;
  type: string;
}

export interface Item {
  name: string;
  description: string;
  value: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
}

export interface ShipmentDetails {
  origin_postal_code: number;
  destination_postal_code: number;
  couriers: string;
  items: Item[];
}
