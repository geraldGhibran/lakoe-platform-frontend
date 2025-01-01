import API from '@/libs/axios';
export interface TrackingType {
  resi: string;
  service: string;
}
interface HistoryItem {
  eventDate: string;
  note: string;
  serviceType: string;
  status: string;
}

export interface Tracking {
  history: HistoryItem[];
  status: string;
}

export const getTracking = async (data: TrackingType) => {
  try {
    const response = await API.post('/biteship/tracking', data);
    console.log('response', response.data);
    console.log('response data', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
