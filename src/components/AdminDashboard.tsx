import { WebsiteListing, Order, User, Withdrawal } from '../types';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Globe, Activity, TrendingUp, Filter, ShoppingCart, DollarSign, Clock, Users, Wallet } from 'lucide-react';
import React, { useState, useEffect } from 'react';

interface AdminDashboardProps {
  listings: WebsiteListing[];
  updateStatus: (id: string, status: 'approved' | 'rejected') => void;
  orders: Order[];
  updateOrderStatus: (id: string, status: Order['status'], additionalData?: Partial<Order>) => void;
  users: User[];
  updateUserApproval: (id: string, isApproved: boolean) => void;
  rejectUser: (id: string) => void;
  withdrawals?: Withdrawal[];
  updateWithdrawalStatus?: (id: string, status: Withdrawal['status']) => void;
  deleteListing?: (id: string) => void;
  activeTab?: 'sites' | 'orders' | 'users' | 'withdrawals';
}

export default function AdminDashboard({ listings, updateStatus, orders, updateOrderStatus, users, updateUserApproval, rejectUser, withdrawals = [], updateWithdrawalStatus, deleteListing, activeTab: initialActiveTab = 'sites' }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'sites' | 'orders' | 'users' | 'withdrawals'>(initialActiveTab);
  
  // Update internal active tab when prop changes
  useEffect(() => {
    setActiveTab(initialActiveTab);
  }, [initialActiveTab]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending_payment' | 'processing' | 'completed' | 'cancelled'>('pending_payment');
  const [userFilter, setUserFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [withdrawalFilter, setWithdrawalFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  
  const filteredListings = listings.filter(l => filter === 'all' ? true : l.status === filter);
  const filteredOrders = orders.filter(o => orderFilter === 'all' ? true : o.status === orderFilter);
  const filteredUsers = users.filter((u: any) => userFilter === 'all' ? true : userFilter === 'pending' ? u.isApproved === false : u.isApproved === true);
  const filteredWithdrawals = withdrawals.filter(w => withdrawalFilter === 'all' ? true : w.status === withdrawalFilter);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight text-slate-900">Administrator Panel</h1>
          <p className="text-slate-500 mt-1">Manage users, marketplace quality and approve payments.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
           <button 
             onClick={() => setActiveTab('users')}
             className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'users' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
           >
              <Users className="w-4 h-4" />
              Users
              {users.filter(u => u.isApproved === false).length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                  {users.filter(u => u.isApproved === false).length}
                </span>
              )}
           </button>
           <button 
             onClick={() => setActiveTab('sites')}
             className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'sites' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
           >
              <Globe className="w-4 h-4" />
              Site Approvals
              {listings.filter(l => l.status === 'pending').length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                  {listings.filter(l => l.status === 'pending').length}
                </span>
              )}
           </button>
           <button 
             onClick={() => setActiveTab('orders')}
             className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
           >
              <ShoppingCart className="w-4 h-4" />
              Payment Approvals
              {orders.filter(o => o.status === 'pending_payment').length > 0 && (
                <span className="ml-1 inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                  {orders.filter(o => o.status === 'pending_payment').length}
                </span>
              )}
           </button>
        </div>
      </div>
        
      {activeTab === 'users' ? (
        <>
          <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl">
            {(['pending', 'approved', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setUserFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center capitalize ${
                  userFilter === f 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
                {f === 'pending' && users.filter(u => u.isApproved === false).length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                    {users.filter(u => u.isApproved === false).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid gap-6">
            {filteredUsers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No users found</h3>
                <p className="text-slate-500 mt-1">No users match your current filter ({userFilter}).</p>
              </div>
            ) : (
              filteredUsers.map(user => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-grow space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                        <p className="text-sm text-slate-500 mt-1">{user.email}</p>
                      </div>
                      <div className="lg:hidden">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                          user.isApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                        }`}>{user.isApproved ? 'Approved' : 'Pending'}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Role</p>
                        <p className="font-semibold text-slate-900 capitalize">{user.role}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Business Type</p>
                        <p className="font-semibold text-slate-900 capitalize">{user.businessType || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Phone</p>
                        <p className="font-semibold text-slate-900 text-sm">{user.phoneNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Location</p>
                        <p className="font-semibold text-slate-900 text-sm">{user.locationAddress || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[140px]">
                    <div className="hidden lg:block text-right mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border inline-block ${
                        user.isApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>{user.isApproved ? 'Approved' : 'Pending'}</span>
                    </div>
                    
                    {!user.isApproved && (
                      <div className="flex flex-col xl:flex-row gap-2 w-full lg:w-auto">
                        <button 
                          onClick={() => updateUserApproval(user.id, true)}
                          className="flex-1 lg:flex-none flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Are you sure you want to reject this user? This will delete the user account.')) {
                              rejectUser(user.id);
                            }
                          }}
                          className="flex-1 lg:flex-none flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      ) : activeTab === 'sites' ? (
        <>
          <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl">
            {(['pending', 'approved', 'rejected', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center capitalize ${
                  filter === f 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
                {f === 'pending' && listings.filter(l => l.status === 'pending').length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                    {listings.filter(l => l.status === 'pending').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-500">Total Sites</p>
              <p className="text-3xl font-bold text-slate-900 mt-2">{listings.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-500">Pending Review</p>
              <p className="text-3xl font-bold text-amber-600 mt-2">{listings.filter(l => l.status === 'pending').length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-500">Approved</p>
              <p className="text-3xl font-bold text-emerald-600 mt-2">{listings.filter(l => l.status === 'approved').length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <p className="text-sm font-medium text-slate-500">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{listings.filter(l => l.status === 'rejected').length}</p>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
                <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No sites found</h3>
                <p className="text-slate-500 mt-1">No websites match your current filter ({filter}).</p>
              </div>
            ) : (
              filteredListings.map(site => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex-grow min-w-0 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-2">
                          <Globe className="w-5 h-5 text-slate-400" />
                          {site.url}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">
                          Submitted by <span className="font-medium text-slate-700">{site.sellerName}</span> • {new Date(site.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="lg:hidden">
                        {site.status === 'pending' ? (
                          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium">Review Req</span>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                            site.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                          }`}>{site.status}</span>
                        )}
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
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Country</p>
                        <p className="font-semibold text-slate-900 text-sm whitespace-nowrap">{site.country}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Link Type / Niche</p>
                        <p className="font-semibold text-slate-900 text-sm whitespace-nowrap">{site.isDoFollow ? 'Do-Follow' : 'No-Follow'} • {site.niche}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Prices</p>
                        <p className="font-semibold text-emerald-600 text-[10px] whitespace-nowrap">GP: ${site.guestPostPrice} | LI: ${site.linkInsertionPrice} | PR: ${site.prPrice}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[140px]">
                    <div className="hidden lg:block text-right mb-2">
                        {site.status === 'pending' ? (
                          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-medium inline-block">Review Req</span>
                        ) : (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border inline-block ${
                            site.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'
                          }`}>{site.status.charAt(0).toUpperCase() + site.status.slice(1)}</span>
                        )}
                    </div>
                    
                    {site.status === 'pending' && (
                      <div className="flex gap-2 w-full lg:w-auto mt-2">
                        <button 
                          onClick={() => updateStatus(site.id, 'approved')}
                          className="flex-1 lg:flex-none flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => updateStatus(site.id, 'rejected')}
                          className="flex-1 lg:flex-none flex items-center justify-center bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {deleteListing && (
                      <div className="flex gap-2 w-full lg:w-auto mt-2">
                        <button 
                          onClick={() => {
                            if(window.confirm('Are you sure you want to delete this listing?')) {
                              deleteListing(site.id);
                            }
                          }}
                          className="flex-1 lg:flex-none flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm w-full"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap items-center bg-slate-100 p-1 rounded-xl">
            {(['pending_payment', 'processing', 'completed', 'cancelled', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setOrderFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center capitalize ${
                  orderFilter === f 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.replace('_', ' ')}
                {f === 'pending_payment' && orders.filter(o => o.status === 'pending_payment').length > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                    {orders.filter(o => o.status === 'pending_payment').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="grid gap-6">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-slate-200">
                <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No orders found</h3>
                <p className="text-slate-500 mt-1">No orders match your current filter ({orderFilter.replace('_', ' ')}).</p>
              </div>
            ) : (
              filteredOrders.map(order => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow"
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
                          Buyer: {users.find(u => u.id === order.buyerId)?.name || 'Unknown Buyer'} • Seller: {users.find(u => u.id === order.sellerId)?.name || 'Unknown Seller'}
                        </p>
                        <p className="text-sm text-slate-500 max-w-2xl truncate">
                          Listing URL: {listings.find(l => l.id === order.listingId)?.url || order.listingUrl}
                        </p>
                      </div>
                      <div className="lg:hidden">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                          order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                          order.status === 'pending_payment' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                           order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :
                           'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {order.status === 'pending_payment' ? 'Pending Payment Review' : 
                           order.status === 'cancelled' ? 'Rejected' : 
                           order.status === 'processing' ? 'Processing' :
                            order.status === 'completion_review' ? 'Pending Completion' :
                            order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Total Price</p>
                        <p className="font-semibold text-emerald-600 text-lg">${order.totalPrice}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Payment Details</p>
                        <p className="font-semibold text-slate-900 capitalize">{order.paymentMethod || 'None'} • {order.transactionId || 'No TID'}</p>
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
                    {order.articleContent && (
                      <div className="mt-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <p className="text-xs text-slate-500 font-medium mb-2 uppercase tracking-wider">
                          Article Content ({order.articleOption === 'provided' ? 'Provided by Buyer' : 'Written by Seller'})
                        </p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{order.articleContent}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[140px]">
                    <div className="hidden lg:block text-right mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border inline-block capitalize ${
                          order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                          order.status === 'pending_payment' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                           order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :
                           'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {order.status === 'pending_payment' ? 'Pending Payment Review' : 
                           order.status === 'cancelled' ? 'Rejected' : 
                           order.status === 'processing' ? 'Processing' :
                            order.status === 'completion_review' ? 'Pending Completion' :
                            order.status}
                        </span>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full mt-2">
                       <select 
                         className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                         value={order.status}
                         onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                       >
                         <option value="pending_payment">Pending Payment</option>
                         <option value="processing">Processing</option>
                         <option value="completion_review">Completion Review</option>
                         <option value="completed">Completed</option>
                         <option value="cancelled">Cancelled/Rejected</option>
                       </select>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === 'withdrawals' && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-slate-800">Pending Withdrawals</h2>
            <div className="flex bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
              <button onClick={() => setWithdrawalFilter('all')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${withdrawalFilter === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>All</button>
              <button onClick={() => setWithdrawalFilter('pending')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${withdrawalFilter === 'pending' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Pending</button>
              <button onClick={() => setWithdrawalFilter('approved')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${withdrawalFilter === 'approved' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Approved</button>
              <button onClick={() => setWithdrawalFilter('rejected')} className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${withdrawalFilter === 'rejected' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Rejected</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {filteredWithdrawals.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Wallet className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-lg font-medium text-slate-900">No withdrawals found</p>
                <p className="mt-1">There are no withdrawals matching your filter.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 font-semibold">Date</th>
                      <th className="p-4 font-semibold">Seller ID</th>
                      <th className="p-4 font-semibold">Amount</th>
                      <th className="p-4 font-semibold">Net</th>
                      <th className="p-4 font-semibold">Method / Details</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredWithdrawals.map((w) => {
                      const user = users.find(u => u.id === w.sellerId);
                      return (
                        <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-sm text-slate-600">{new Date(w.createdAt).toLocaleDateString()}</td>
                          <td className="p-4 text-sm text-slate-900">{user ? user.name : w.sellerId}</td>
                          <td className="p-4 text-sm font-medium text-slate-900">${w.amount}</td>
                          <td className="p-4 text-sm font-bold text-emerald-600">${w.netAmount}</td>
                          <td className="p-4 text-sm text-slate-600 uppercase">
                            <div className="font-semibold">{w.withdrawalMethod}</div>
                            <div className="text-xs normal-case">{w.accountDetails}</div>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              w.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                              w.status === 'rejected' ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {w.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {w.status === 'pending' && updateWithdrawalStatus && (
                              <>
                                <button
                                  onClick={() => updateWithdrawalStatus(w.id, 'approved')}
                                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => updateWithdrawalStatus(w.id, 'rejected')}
                                  className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
