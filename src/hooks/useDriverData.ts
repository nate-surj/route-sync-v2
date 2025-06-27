
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getDriverDashboardData, 
  getUnreadNotificationsCount, 
  acceptJob as acceptJobService, 
  DriverDashboardData, 
  Delivery,
  Profile as ProfileType
} from '@/services/driverService';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/components/ui/use-toast";

export const useDriverDashboard = () => {
  const { user, profile } = useAuth(); // profile is already of type ProfileType | null
  const driverId = user?.id;
  const queryClient = useQueryClient();

  const { data: dashboardData, isLoading: isLoadingDashboard, error: dashboardError, refetch: refetchDashboardData } = useQuery<DriverDashboardData, Error>({
    queryKey: ['driverDashboardData', driverId],
    queryFn: () => {
      if (!driverId) {
        console.error('useDriverDashboard: Driver ID not available for dashboard data.');
        throw new Error('Driver ID not available');
      }
      console.log('useDriverDashboard: Fetching dashboard data...');
      return getDriverDashboardData(driverId);
    },
    enabled: !!driverId,
  });

  const { data: unreadNotificationsCount, isLoading: isLoadingNotifications, error: notificationsError, refetch: refetchNotifications } = useQuery<number, Error>({
    queryKey: ['unreadNotificationsCount', driverId],
    queryFn: () => {
      if (!driverId) {
        console.error('useDriverDashboard: Driver ID not available for notifications.');
        throw new Error('Driver ID not available');
      }
      console.log('useDriverDashboard: Fetching unread notifications count...');
      return getUnreadNotificationsCount(driverId);
    },
    enabled: !!driverId,
  });

  const { mutate: acceptJob, isPending: isAcceptingJob } = useMutation<Delivery | null, Error, string>({
    mutationFn: (deliveryId: string) => {
      if (!driverId) {
        toast({ title: "Error", description: "User not identified.", variant: "destructive" });
        throw new Error('Driver ID not available for accepting job.');
      }
      console.log(`useDriverDashboard: Attempting to accept job ${deliveryId}`);
      return acceptJobService(deliveryId, driverId);
    },
    onSuccess: (data) => {
      toast({ title: "Job Accepted!", description: `Delivery #${data?.id?.substring(0,6)}... has been assigned to you.` });
      queryClient.invalidateQueries({ queryKey: ['driverDashboardData', driverId] });
      // Potentially a more specific key for available jobs if it's fetched separately elsewhere
      // queryClient.invalidateQueries({ queryKey: ['availableJobs'] }); 
    },
    onError: (error) => {
      console.error('useDriverDashboard: Error accepting job:', error);
      toast({ title: "Error Accepting Job", description: error.message, variant: "destructive" });
    }
  });

  const isLoading = isLoadingDashboard || isLoadingNotifications;
  console.log('useDriverDashboard: isLoading:', isLoading, 'dashboardData:', dashboardData, 'profile:', profile);
  
  return {
    dashboardData,
    unreadNotificationsCount,
    isLoading,
    error: dashboardError || notificationsError,
    acceptJob,
    isAcceptingJob, // This now correctly refers to isPending
    profile: profile as ProfileType | null, // Cast to ensure type, AuthContext provides ProfileType | null
    refetchData: () => { // Function to manually refetch all dashboard related data
      refetchDashboardData();
      refetchNotifications();
    }
  };
};

