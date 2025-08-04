import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";

interface VoucherPayload {
  code: string;
  value: number;
  stock: number;
  event: string;
}

const useCreateVoucher = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (payload: VoucherPayload) => {
      const form = new FormData();
      form.append("code", payload.code);
      form.append("value", String(payload.value));
      form.append("stock", String(payload.stock));
      form.append("event", payload.event); // eventId

      const response = await axiosInstance.post("/vouchers", form, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: async () => {
      alert("Voucher created successfully");
      await queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      router.push("/vouchers");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message ?? "Failed to create voucher");
    },
  });
};

export default useCreateVoucher;
