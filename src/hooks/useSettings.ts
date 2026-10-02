import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../services/settings';

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
