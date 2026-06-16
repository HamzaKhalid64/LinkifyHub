import { supabase } from './supabase';
import { User, WebsiteListing, Order, Withdrawal } from './types';

export const fetchUsers = async () => {
  const { data, error } = await supabase.from('profiles').select('*');
  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return data.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isApproved: u.is_approved,
    locationAddress: u.location_address,
    phoneNumber: u.phone_number,
    businessType: u.business_type,
    budget: u.budget,
    availableBalance: u.available_balance
  })) as User[];
};

export const fetchListings = async () => {
  const { data, error } = await supabase.from('listings').select('*');
  if (error) {
    console.error('Error fetching listings:', error);
    return [];
  }
  return data.map(l => ({
    id: l.id,
    sellerId: l.seller_id,
    sellerName: l.seller_name,
    url: l.url,
    da: l.da,
    pa: l.pa,
    country: l.country,
    traffic: l.traffic,
    niche: l.niche,
    guestPostPrice: l.guest_post_price,
    linkInsertionPrice: l.link_insertion_price,
    prPrice: l.pr_price,
    writingFee: l.writing_fee,
    isDoFollow: l.is_do_follow,
    status: l.status,
    createdAt: new Date(l.created_at).getTime()
  })) as WebsiteListing[];
};

export const fetchOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
  return data.map(o => ({
    id: o.id,
    buyerId: o.buyer_id,
    sellerId: o.seller_id,
    listingId: o.listing_id,
    listingUrl: o.listing_url,
    orderType: o.order_type,
    articleOption: o.article_option,
    articleContent: o.article_content,
    targetUrl: o.target_url,
    anchorText: o.anchor_text,
    totalPrice: o.total_price,
    paymentMethod: o.payment_method,
    transactionId: o.transaction_id,
    transactionDetails: o.transaction_details,
    deliveryDetails: o.delivery_details,
    status: o.status,
    createdAt: new Date(o.created_at).getTime()
  })) as Order[];
};

export const saveUser = async (user: User) => {
  const { data, error } = await supabase.from('profiles').upsert({
    id: user.id || undefined, // UUID auto generated if not present, but for upsert if id is known we should use it. For new inserts, let supabase handle if id is string but UUID. Actually let's assume UUID strings for frontend matches DB.
    name: user.name,
    email: user.email,
    role: user.role,
    is_approved: user.isApproved,
    location_address: user.locationAddress,
    phone_number: user.phoneNumber,
    business_type: user.businessType,
    budget: user.budget,
    available_balance: user.availableBalance
  }).select();
  if (error) {
    console.error('Error saving user:', error);
    return null;
  }
  const u = data[0];
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    isApproved: u.is_approved,
    locationAddress: u.location_address,
    phoneNumber: u.phone_number,
    businessType: u.business_type,
    budget: u.budget,
    availableBalance: u.available_balance
  } as User;
};

export const updateListing = async (l: WebsiteListing) => {
  const { data, error } = await supabase.from('listings').upsert({
    id: l.id.length === 36 ? l.id : undefined, // Check if valid UUID, if mock data used random string, we rely on Supabase to generate new id
    seller_id: l.sellerId,
    seller_name: l.sellerName,
    url: l.url,
    da: l.da,
    pa: l.pa,
    country: l.country,
    traffic: l.traffic,
    niche: l.niche,
    guest_post_price: l.guestPostPrice,
    link_insertion_price: l.linkInsertionPrice,
    pr_price: l.prPrice,
    writing_fee: l.writingFee,
    is_do_follow: l.isDoFollow,
    status: l.status
  }).select();
  if (error) {
    console.error('Error saving listing:', error);
    return null;
  }
  const ls = data[0];
  return {
    ...l,
    id: ls.id,
    createdAt: ls.created_at ? new Date(ls.created_at).getTime() : l.createdAt
  };
};

export const deleteListing = async (id: string) => {
  const { error } = await supabase.from('listings').delete().eq('id', id);
  if (error) {
    console.error('Error deleting listing:', error);
    return false;
  }
  return true;
};

export const deleteUser = async (id: string) => {
  const { error } = await supabase.from('profiles').delete().eq('id', id);
  if (error) {
    console.error('Error deleting user:', error);
    return false;
  }
  return true;
};

export const updateOrder = async (o: Order) => {
  const { data, error } = await supabase.from('orders').upsert({
    id: o.id.length === 36 ? o.id : undefined,
    buyer_id: o.buyerId,
    seller_id: o.sellerId,
    listing_id: o.listingId,
    listing_url: o.listingUrl,
    article_option: o.articleOption,
    article_content: o.articleContent,
    target_url: o.targetUrl,
    anchor_text: o.anchorText,
    total_price: o.totalPrice,
    payment_method: o.paymentMethod,
    transaction_id: o.transactionId,
    transaction_details: o.transactionDetails,
    delivery_details: o.deliveryDetails,
    status: o.status
  }).select();
  if (error) {
    console.error('Error saving order:', error);
    return null;
  }
  const os = data[0];
  return {
    ...o,
    id: os.id,
    createdAt: os.created_at ? new Date(os.created_at).getTime() : o.createdAt
  };
};

export const fetchWithdrawals = async () => {
  const { data, error } = await supabase.from('withdrawals').select('*');
  if (error) {
    console.error('Error fetching withdrawals:', error);
    return [];
  }
  return data.map(w => ({
    id: w.id,
    sellerId: w.seller_id,
    amount: w.amount,
    fee: w.fee,
    netAmount: w.net_amount,
    withdrawalMethod: w.withdrawal_method,
    accountDetails: w.account_details,
    status: w.status,
    createdAt: new Date(w.created_at).getTime()
  })) as Withdrawal[];
};

export const updateWithdrawal = async (w: Withdrawal) => {
  const { data, error } = await supabase.from('withdrawals').upsert({
    id: w.id.length === 36 ? w.id : undefined,
    seller_id: w.sellerId,
    amount: w.amount,
    fee: w.fee,
    net_amount: w.netAmount,
    withdrawal_method: w.withdrawalMethod,
    account_details: w.accountDetails,
    status: w.status
  }).select();
  if (error) {
    console.error('Error saving withdrawal:', error);
    return null;
  }
  const ws = data[0];
  return {
    ...w,
    id: ws.id,
    createdAt: ws.created_at ? new Date(ws.created_at).getTime() : w.createdAt
  };
};
