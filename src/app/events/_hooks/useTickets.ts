// app/events/[slug]/_hooks/useTickets.ts
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useTickets = (eventId: number) => {
  return useQuery({
    queryKey: ["tickets", eventId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/tickets?event=${eventId}`);
      return response.data;
    },
  });
};
