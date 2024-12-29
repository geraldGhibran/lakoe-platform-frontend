import API from '@/libs/axios';
export interface TrackingType {
  resi: string;
  service: string;
}

export const getTracking = async (data: TrackingType) => {
  try {
    const response = await API.post('/biteship/tracking', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
