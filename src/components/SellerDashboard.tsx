import React, { useState } from 'react';
import { WebsiteListing, User, Order, Withdrawal } from '../types';
import { Plus, Globe, Activity, TrendingUp, DollarSign, Tag, CheckCircle2, XCircle, Clock, Wallet, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SellerDashboardProps {
  listings: WebsiteListing[];
  addListing: (listing: WebsiteListing) => void;
  currentUser: User;
  activeTab: string;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status'], additionalData?: Partial<Order>) => void;
  withdrawals?: Withdrawal[];
  createWithdrawalRequest?: (w: Withdrawal) => void;
  deleteListing?: (id: string) => void;
  users?: User[];
}

export default function SellerDashboard({ listings, addListing, currentUser, activeTab, orders, updateOrderStatus, withdrawals = [], createWithdrawalRequest, deleteListing, users = [] }: SellerDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [orderToComplete, setOrderToComplete] = useState<Order | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState('');
  const [sellerArticle, setSellerArticle] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'jazzcash' | 'paypal'>('bank');
  const [accountDetails, setAccountDetails] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    url: '', da: '', pa: '', country: 'US', traffic: '', niche: 'Technology', guestPostPrice: '', linkInsertionPrice: '', prPrice: '', writingFee: '', isDoFollow: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newListing: WebsiteListing = {
      id: 'site_' + Math.random().toString(36).substr(2, 9),
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      url: formData.url,
      da: parseInt(formData.da) || 0,
      pa: parseInt(formData.pa) || 0,
      country: formData.country,
      traffic: parseInt(formData.traffic) || 0,
      niche: formData.niche,
      guestPostPrice: parseInt(formData.guestPostPrice) || 0,
      linkInsertionPrice: parseInt(formData.linkInsertionPrice) || 0,
      prPrice: parseInt(formData.prPrice) || 0,
      writingFee: parseInt(formData.writingFee) || 0,
      isDoFollow: formData.isDoFollow,
      status: 'pending',
      createdAt: Date.now(),
    };
    
    addListing(newListing);
    setIsModalOpen(false);
    setFormData({ url: '', da: '', pa: '', country: 'US', traffic: '', niche: 'Technology', guestPostPrice: '', linkInsertionPrice: '', prPrice: '', writingFee: '', isDoFollow: true });
  };

  const totalEarnedDynamic = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalPrice, 0);
  const totalWithdrawnDynamic = withdrawals.filter(w => w.status === 'approved' || w.status === 'pending').reduce((sum, w) => sum + w.amount, 0);
  const actualAvailableToWithdraw = Math.max(0, totalEarnedDynamic - totalWithdrawnDynamic);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(withdrawAmount);
    if (!amount || amount <= 0 || amount > actualAvailableToWithdraw) {
      alert("Invalid withdrawal amount.");
      return;
    }
    
    if (createWithdrawalRequest) {
      const fee = Math.round(amount * 0.2); // 20%
      const netAmount = amount - fee;
      
      createWithdrawalRequest({
        id: 'wd_' + Math.random().toString(36).substr(2, 9),
        sellerId: currentUser.id,
        amount,
        fee,
        netAmount,
        withdrawalMethod: withdrawMethod,
        accountDetails,
        status: 'pending',
        createdAt: Date.now()
      });
      
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      setAccountDetails('');
    }
  };

  const getStatusBadge = (status: WebsiteListing['status']) => {
    switch (status) {
      case 'approved': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold"><CheckCircle2 className="w-3.5 h-3.5"/> Approved</span>;
      case 'rejected': return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold"><XCircle className="w-3.5 h-3.5"/> Rejected</span>;
      default: return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold"><Clock className="w-3.5 h-3.5"/> Pending Admin Approval</span>;
    }
  };

  const completedOrders = orders.filter(o => o.status === 'completed');
  const processingOrders = orders.filter(o => o.status === 'processing');

  const totalEarned = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalPending = processingOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const activeWebsitesCount = new Set(orders.filter(o => o.status === 'completed' || o.status === 'processing').map(o => o.listingId)).size;

  const earningByWebsiteItems = orders.reduce((acc, order) => {
    if (order.status !== 'completed' && order.status !== 'processing') return acc;
    if (!acc[order.listingId]) {
      acc[order.listingId] = { url: order.listingUrl, completedCount: 0, processingCount: 0, earned: 0, pending: 0 };
    }
    if (order.status === 'completed') {
      acc[order.listingId].completedCount += 1;
      acc[order.listingId].earned += order.totalPrice;
    } else {
      acc[order.listingId].processingCount += 1;
      acc[order.listingId].pending += order.totalPrice;
    }
    return acc;
  }, {} as Record<string, { url: string, completedCount: number, processingCount: number, earned: number, pending: number }>);
  
  const websitesStats = Object.values(earningByWebsiteItems).sort((a, b) => b.earned - a.earned);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight text-slate-900">Seller Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your website listings and track their approval status.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium flex items-center space-x-2 transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Add Website</span>
        </motion.button>
      </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Submissions</p>
                <p className="text-2xl font-bold text-slate-900">{listings.length}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Approved Sites</p>
                <p className="text-2xl font-bold text-slate-900">{listings.filter(l => l.status === 'approved').length}</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Review</p>
                <p className="text-2xl font-bold text-slate-900">{listings.filter(l => l.status === 'pending').length}</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-slate-600 uppercase tracking-wider">Earnings</p>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-slate-900">${orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalPrice, 0)}</p>
                <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Completed</p>
              </div>
              <div className="flex items-center gap-2 mt-1">
                 <p className="text-sm font-medium text-slate-500">${orders.filter(o => o.status === 'processing').reduce((sum, o) => sum + o.totalPrice, 0)}</p>
                 <p className="text-[10px] uppercase font-bold text-slate-400">Processing</p>
              </div>
            </div>
          </div>
        )}

      {activeTab === 'dashboard' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">Your Submitted Websites</h2>
          </div>
          
          {listings.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-900">No websites found</p>
              <p className="mt-1">You haven't submitted any websites yet. Click "Add Website" to start selling.</p>
            </div>
          ) : (
            <div className="grid gap-4 p-6">
              {listings.map(site => (
                <div 
                  key={site.id} 
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-grow min-w-0 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-2">
                          <Globe className="w-5 h-5 text-slate-400" />
                          {site.url}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Added {new Date(site.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="lg:hidden">
                         {getStatusBadge(site.status)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">DA / PA</p>
                        <p className="font-semibold text-slate-900 flex items-center gap-1.5 whitespace-nowrap"><Activity className="w-4 h-4 text-emerald-500"/> {site.da} / {site.pa}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Traffic</p>
                        <p className="font-semibold text-slate-900 flex items-center gap-1.5 whitespace-nowrap"><TrendingUp className="w-4 h-4 text-blue-500"/> {(site.traffic / 1000).toFixed(1)}k</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Niche</p>
                        <p className="font-semibold text-slate-900 flex items-center gap-1.5 whitespace-nowrap"><Tag className="w-4 h-4 text-slate-400"/> {site.niche}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Link Type</p>
                        <p className="font-semibold text-slate-900 text-sm whitespace-nowrap">{site.isDoFollow ? 'Do-Follow' : 'No-Follow'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Prices</p>
                        <p className="font-semibold text-slate-900 text-xs whitespace-nowrap">GP: ${site.guestPostPrice} | LI: ${site.linkInsertionPrice} | PR: ${site.prPrice}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[140px]">
                     <div className="hidden lg:block text-right mb-2">
                         {getStatusBadge(site.status)}
                     </div>
                     {deleteListing && (
                       <button
                         onClick={() => {
                           if (window.confirm('Are you sure you want to delete this listing?')) {
                             deleteListing(site.id);
                           }
                         }}
                         className="flex items-center justify-center bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                       >
                         Delete
                       </button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">Your Orders</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Globe className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-900">No orders yet</p>
              <p className="mt-1">You haven't received any orders yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 p-6">
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-2">
                          <Globe className="w-5 h-5 text-slate-400" />
                          {order.listingUrl}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Order ID: {order.id} • Date & Time: {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500">
                          Buyer: {users?.find(u => u.id === order.buyerId)?.name || 'Unknown Buyer'} • Seller: {users?.find(u => u.id === order.sellerId)?.name || 'Unknown Seller'}
                        </p>
                        <p className="text-sm text-slate-500 max-w-2xl truncate">
                          Listing URL: {listings?.find(l => l.id === order.listingId)?.url || order.listingUrl}
                        </p>
                      </div>
                      <div className="lg:hidden">
                         <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                            order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                            order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                             order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :
                             'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {order.status === 'cancelled' ? 'Rejected' : 
                             order.status === 'processing' ? 'Processing' :
                              order.status === 'completion_review' ? 'In Review' : 
                             order.status}
                          </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Total Price</p>
                        <p className="font-semibold text-emerald-600 text-lg">${order.totalPrice}</p>
                      </div>
                      {order.transactionDetails && (
                        <div>
                          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Trans. Notes</p>
                          <p className="font-semibold text-slate-900">{order.transactionDetails}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Article Provision</p>
                        <p className="font-semibold text-slate-900 capitalize">{order.articleOption === 'none' ? 'N/A' : order.articleOption === 'provided' ? 'Buyer Provides' : 'Seller Writes'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target URL & Anchor</p>
                        <p className="font-semibold text-slate-900 truncate" title={order.targetUrl}>{order.targetUrl}</p>
                        <p className="text-sm text-slate-600 mt-0.5 truncate" title={order.anchorText}>"{order.anchorText}"</p>
                      </div>
                      {order.deliveryDetails && (
                        <div className="col-span-2 mt-2">
                          <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Delivery Details / Live URL</p>
                          {order.deliveryDetails.startsWith('http') ? (
                            <a href={order.deliveryDetails} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline break-all">
                              {order.deliveryDetails}
                            </a>
                          ) : (
                            <p className="text-sm font-semibold text-slate-900 whitespace-pre-wrap">{order.deliveryDetails}</p>
                          )}
                        </div>
                      )}
                    </div>
                    {order.articleOption === 'provided' && order.articleContent && (
                      <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">Article Content</p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{order.articleContent}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[140px]">
                     <div className="hidden lg:block text-right mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                            order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                            order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                             order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :
                             'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {order.status === 'cancelled' ? 'Rejected' : 
                             order.status === 'processing' ? 'Processing' :
                              order.status === 'completion_review' ? 'In Review' : 
                             order.status}
                          </span>
                     </div>
                     {order.status === 'processing' && (
                       <>
                         <button 
                            onClick={() => {
                              setOrderToComplete(order);
                              setDeliveryDetails('');
                              setSellerArticle('');
                              setCompleteModalOpen(true);
                            }}
                            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                          >
                            Mark Delivered
                          </button>
                          <button 
                            onClick={() => {
                              if (window.confirm('Are you sure you want to cancel this order?')) {
                                updateOrderStatus(order.id, 'cancelled');
                              }
                            }}
                            className="w-full flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm mt-2"
                          >
                            Cancel Order
                          </button>
                       </>
                     )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <Wallet className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Available for Withdrawal</p>
              </div>
              <h3 className="text-4xl font-bold text-slate-900">${totalEarned}</h3>
              <p className="text-sm text-emerald-600 font-medium mt-2">From {completedOrders.length} completed orders</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-amber-100 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Pending Clearance</p>
              </div>
              <h3 className="text-4xl font-bold text-slate-900">${totalPending}</h3>
              <p className="text-sm text-amber-600 font-medium mt-2">From {processingOrders.length} processing orders</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Active Websites</p>
              </div>
              <h3 className="text-4xl font-bold text-slate-900">{activeWebsitesCount}</h3>
              <p className="text-sm text-blue-600 font-medium mt-2">Websites generating revenue</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Earnings by Website</h2>
            </div>
            
            {websitesStats.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Wallet className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-900">No earnings yet</p>
                <p className="mt-1">Once you complete orders, your earnings breakdown will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 font-semibold">Website</th>
                      <th className="p-4 font-semibold text-center">Completed Orders</th>
                      <th className="p-4 font-semibold text-center">Processing Orders</th>
                      <th className="p-4 font-semibold text-right">Pending Earnings</th>
                      <th className="p-4 font-semibold text-right">Cleared Earnings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {websitesStats.map((stat) => (
                      <tr key={stat.url} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-slate-900 flex items-center gap-2">
                             <Globe className="w-4 h-4 text-slate-400" />
                             {stat.url}
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                            {stat.completedCount}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center justify-center bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                            {stat.processingCount}
                          </span>
                        </td>
                        <td className="p-4 text-right font-medium text-amber-600">
                          ${stat.pending}
                        </td>
                        <td className="p-4 text-right font-bold text-emerald-600">
                          ${stat.earned}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Withdrawals Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-6">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-semibold text-slate-800">Withdrawals</h2>
              <button 
                onClick={() => setIsWithdrawModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" />
                Request Withdrawal
              </button>
            </div>
            
            {withdrawals && withdrawals.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <p>No withdrawals yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 font-semibold">Date</th>
                      <th className="p-4 font-semibold">Amount</th>
                      <th className="p-4 font-semibold">Fee (20%)</th>
                      <th className="p-4 font-semibold">Net Amount</th>
                      <th className="p-4 font-semibold">Method</th>
                      <th className="p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {withdrawals?.sort((a, b) => b.createdAt - a.createdAt).map((w) => (
                      <tr key={w.id}>
                        <td className="p-4 text-sm text-slate-600">{new Date(w.createdAt).toLocaleDateString()}</td>
                        <td className="p-4 text-sm font-medium text-slate-900">${w.amount}</td>
                        <td className="p-4 text-sm text-red-500">-${w.fee}</td>
                        <td className="p-4 text-sm font-bold text-emerald-600">${w.netAmount}</td>
                        <td className="p-4 text-sm uppercase text-slate-600">{w.withdrawalMethod}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            w.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                            w.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {w.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Listing Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl relative z-10 my-auto"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  Submit Website for Approval
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Website URL *</label>
                  <input required type="url" placeholder="https://example.com" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400"
                    value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Domain Authority (DA) *</label>
                    <input required type="number" min="0" max="100" placeholder="e.g. 45" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.da} onChange={e => setFormData({...formData, da: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Page Authority (PA) *</label>
                    <input required type="number" min="0" max="100" placeholder="e.g. 35" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.pa} onChange={e => setFormData({...formData, pa: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Country *</label>
                    <select className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})}>
                      {['US', 'UK', 'CA', 'AU', 'IN', 'PK', 'Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Monthly Traffic *</label>
                    <input required type="number" min="0" placeholder="e.g. 50000" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.traffic} onChange={e => setFormData({...formData, traffic: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Niche / Category *</label>
                    <select className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      value={formData.niche} onChange={e => setFormData({...formData, niche: e.target.value})}>
                      {['Technology', 'Health', 'Finance', 'Travel', 'Lifestyle', 'Business', 'Education', 'Sports', 'Other'].map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Do-Follow Link?</label>
                    <div className="flex items-center h-[42px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-slate-300"
                          checked={formData.isDoFollow} onChange={e => setFormData({...formData, isDoFollow: e.target.checked})} />
                        <span className="text-slate-700 font-medium text-sm">Yes, provide Do-Follow link</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Guest Post Price *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <input required type="number" min="1" placeholder="99" className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.guestPostPrice} onChange={e => setFormData({...formData, guestPostPrice: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Link Insertion Price *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <input required type="number" min="1" placeholder="59" className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.linkInsertionPrice} onChange={e => setFormData({...formData, linkInsertionPrice: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">PR Price *</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <input required type="number" min="1" placeholder="149" className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.prPrice} onChange={e => setFormData({...formData, prPrice: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Additional Fee (If you write it) *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <input required type="number" min="0" placeholder="20" className="w-full border border-slate-300 rounded-lg pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                      value={formData.writingFee} onChange={e => setFormData({...formData, writingFee: e.target.value})} />
                  </div>
                </div>
                
                <div className="bg-amber-50 text-amber-800 p-4 rounded-xl text-sm border border-amber-200 mt-2">
                  <strong>Note:</strong> Your website will be manually reviewed by our admin team before appearing in the marketplace. Accurate metrics ensure faster approval.
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                    Submit for Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsWithdrawModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md relative z-10 my-auto"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-600" />
                  Request Withdrawal
                </h3>
                <button onClick={() => setIsWithdrawModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleWithdraw} className="p-6 space-y-5">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 flex justify-between items-center">
                  <span className="font-medium text-sm">Available Balance:</span>
                  <div className="text-right">
                    <span className="font-bold text-xl">${actualAvailableToWithdraw}</span>
                    {totalWithdrawnDynamic > 0 && <p className="text-xs font-medium opacity-75 mt-0.5">(${totalWithdrawnDynamic} pending/withdrawn)</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Withdrawal Amount ($)</label>
                  <input required type="number" min="1" max={actualAvailableToWithdraw} placeholder="e.g. 100" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} />
                  {withdrawAmount && (
                    <p className="text-xs text-slate-500 mt-2">
                       A 20% platform fee (${Math.round(parseInt(withdrawAmount || '0') * 0.2)}) will be deducted. You will receive <strong>${parseInt(withdrawAmount || '0') - Math.round(parseInt(withdrawAmount || '0') * 0.2)}</strong>.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Withdrawal Method</label>
                  <select className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
                    value={withdrawMethod} onChange={e => setWithdrawMethod(e.target.value as any)}>
                    <option value="bank">Bank Transfer</option>
                    <option value="jazzcash">JazzCash</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Account Details</label>
                  <textarea required rows={3} placeholder={withdrawMethod === 'bank' ? "Bank Name, Account Holder, IBAN" : withdrawMethod === 'paypal' ? "PayPal Email Address" : "JazzCash Phone Number"} className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                    value={accountDetails} onChange={e => setAccountDetails(e.target.value)} />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setIsWithdrawModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={!withdrawAmount || parseInt(withdrawAmount) > actualAvailableToWithdraw || parseInt(withdrawAmount) <= 0} className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Complete Order Modal */}
      <AnimatePresence>
        {completeModalOpen && orderToComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setCompleteModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md relative z-10 my-auto"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  Complete Order
                </h3>
                <button onClick={() => setCompleteModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  &times;
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                updateOrderStatus(orderToComplete.id, 'completion_review', { 
                  deliveryDetails, 
                  ...(orderToComplete.articleOption === 'written' && sellerArticle ? { articleContent: sellerArticle } : {}) 
                });
                setCompleteModalOpen(false);
              }} className="p-6 space-y-5">
                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-200">
                  <p className="text-sm">Please provide the live link or proof of delivery. This will be sent to the admin for review.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Live URL / Delivery Proof</label>
                  <textarea required rows={4} placeholder="https://example.com/your-guest-post" className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    value={deliveryDetails} onChange={e => setDeliveryDetails(e.target.value)} />
                </div>
                
                {orderToComplete.articleOption === 'written' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Article Content (Written by You)</label>
                    <textarea required rows={8} placeholder="Paste the content you wrote for the buyer here..." className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                      value={sellerArticle} onChange={e => setSellerArticle(e.target.value)} />
                    <p className="text-xs text-slate-500 mt-1">This will be shared with the admin for review along with your delivery link.</p>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setCompleteModalOpen(false)} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" disabled={!deliveryDetails.trim() || (orderToComplete.articleOption === 'written' && !sellerArticle.trim())} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                    Submit for Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
