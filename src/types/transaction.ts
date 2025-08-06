import { User } from "./user";

// Enums to match Prisma enums
enum TransactionStatus {
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  WAITING_FOR_CONFIRMATION = "WAITING_FOR_CONFIRMATION",
  PAID = "PAID",
  REJECT = "REJECT",
  EXPIRED = "EXPIRED"
}


// Main Transaction interface
export interface Transaction {
  id: number;
  userId: number;
  user: User;
  eventId: number;
  event: Event;
  uuid: string;
  status: TransactionStatus;
  paymentProof: string | null;
  couponUsed: string | null;
  pointsUsed: number | null;
  createdAt: Date | string; // Can be Date object or ISO string
  updatedAt: Date | string; // Can be Date object or ISO string

}

