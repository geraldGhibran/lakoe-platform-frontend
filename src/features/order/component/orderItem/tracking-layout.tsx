import { Box, Text } from '@chakra-ui/react';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from '@/components/ui/timeline';
import { useGetInvoicesId } from '../../hooks/use-get-invoices-id';
import { useGetTracking } from '../../hooks/use-get-tracking';
import { useEffect } from 'react';
import { TrackingType } from '../../services/tracking';

export default function TrackingLayout() {
  const { data } = useGetInvoicesId();
  const resi = data?.invoice?.Courier?.resi || null;
  const service = data?.invoice?.Courier?.courier_code || null;

  const trackingData: TrackingType = {
    resi,
    service,
  };

  const { getTrackingAsync, tracking, setTracking } =
    useGetTracking(trackingData);

  useEffect(() => {
    if (resi && service) {
      const fetchTracking = async () => {
        try {
          const rates = await getTrackingAsync();
          setTracking(rates);
        } catch (error) {
          console.error('Error fetching tracking data:', error);
        }
      };

      fetchTracking();
    }
  }, [resi, service, getTrackingAsync, setTracking]);

  return (
    <>
      <Box border={'1px solid #E6E6E6'} rounded={'md'} width={'500px'} p={10}>
        {/* <TimelineRoot maxW="400px">
          {tracking?.history?.map((event, index) => {
            const isCompleted =
              index <=
              tracking.history.findIndex((e) => e.status === tracking.status);

            return (
              <TimelineItem key={index}>
                <TimelineConnector
                  bgColor={isCompleted ? 'cyan.100' : 'gray.100'}
                >
                  <Box
                    borderRadius="full"
                    bgColor={isCompleted ? 'cyan.500' : 'gray.300'}
                    width="10px"
                    height="10px"
                  ></Box>
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle textStyle="sm">{event.status}</TimelineTitle>
                  <TimelineDescription>
                    {new Date(event.eventDate).toLocaleString()}
                  </TimelineDescription>
                  {event.note && (
                    <Text textStyle="sm" mt={2}>
                      {event.note}
                    </Text>
                  )}
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </TimelineRoot> */}
      </Box>
    </>
  );
}
