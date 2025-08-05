export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  uuid: string;
  status: string;
  paymentProof: string | null;
  couponUsed: string | null;
  pointsUsed: number | null;
  createdAt: string;
  updatedAt: string;
  event: {
    id: number;
    title: string;
    slug: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    organizerId: number;
    totalSeats: number;
    availableSeats: number;
    category: string;
    imageUrl: string | null;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: number;
    email: string;
    name: string;
    profilePicture: string | null;
    role: string;
  };
  TransactionDetail: any[]; // You might want to type this more specifically
}