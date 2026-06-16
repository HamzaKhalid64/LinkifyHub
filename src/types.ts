export type Role = 'guest' | 'seller' | 'buyer' | 'admin';

export interface WebsiteListing {
  id: string;
  sellerId: string;
  sellerName: string;
  url: string;
  da: number; // Domain Authority
  pa: number; // Page Authority
  country: string;
  traffic: number; // Monthly Traffic
  niche: string; // Niche or Category
  guestPostPrice: number;
  linkInsertionPrice: number;
  prPrice: number;
  writingFee: number; // Additional cost if seller writes article
  isDoFollow: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
}

export type OrderStatus = 'pending_payment' | 'payment_review' | 'processing' | 'completion_review' | 'completed' | 'cancelled';
export type PaymentMethod = 'bank' | 'paypal' | 'crypto' | 'google_pay' | null;

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  listingUrl: string;
  orderType: 'guest_post' | 'link_insertion' | 'pr';
  articleOption: 'provided' | 'written' | 'none';
  articleContent?: string;
  targetUrl?: string; // where the backlink should point
  anchorText?: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  transactionDetails?: string;
  deliveryDetails?: string;
  status: OrderStatus;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isApproved?: boolean;
  locationAddress?: string;
  phoneNumber?: string;
  businessType?: string;
  budget?: string;
  availableBalance?: number;
}

export interface Withdrawal {
  id: string;
  sellerId: string;
  amount: number;
  fee: number;
  netAmount: number;
  withdrawalMethod: 'bank' | 'jazzcash' | 'paypal';
  accountDetails: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: number;
}
