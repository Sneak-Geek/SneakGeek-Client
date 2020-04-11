export type ShoeAuthentication = {
  title: string;
  imageUrl?: string;
  brand: string;
  size: number;
  isNew: boolean;
  images: string[];
  condition?: object;
  trackingId: string;
  status: string;
  uploadDate: string;
  transactionId: string;
};
