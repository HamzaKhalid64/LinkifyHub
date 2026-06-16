import { WebsiteListing, User, Order, PaymentMethod } from '../types';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Globe, Activity, TrendingUp, ShoppingCart, CheckCircle2, DollarSign } from 'lucide-react';

interface BuyerMarketplaceProps {
  listings: WebsiteListing[];
  currentUser?: User | null;
  orders: Order[];
  createOrder: (order: Order) => void;
  activeTab: string;
  updateOrderStatus?: (id: string, status: Order['status'], additionalData?: Partial<Order>) => void;
  onLoginRequest?: () => void;
  users?: User[];
}

export default function BuyerMarketplace({ listings, currentUser, orders, createOrder, activeTab, updateOrderStatus, onLoginRequest, users = [] }: BuyerMarketplaceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [nicheFilter, setNicheFilter] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [minDa, setMinDa] = useState('');
  const [maxDa, setMaxDa] = useState('');
  const [minPa, setMinPa] = useState('');
  const [maxPa, setMaxPa] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  
  // Purchase Modal State
  const [selectedListing, setSelectedListing] = useState<WebsiteListing | null>(null);
  const [orderType, setOrderType] = useState<'guest_post' | 'link_insertion' | 'pr'>('guest_post');
  const [articleOption, setArticleOption] = useState<'provided' | 'written' | 'none'>('provided');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
  const [transactionId, setTransactionId] = useState('');
  const [transactionDetails, setTransactionDetails] = useState('');
  
  const [articleContent, setArticleContent] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [anchorText, setAnchorText] = useState('');

  const uniqueNiches = ['All', ...Array.from(new Set(listings.map(l => l.niche)))];
  const uniqueCountries = ['All', ...Array.from(new Set(listings.map(l => l.country || 'US')))];

  const filteredListings = listings.filter(site => {
    const matchesSearch = site.url.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          site.niche.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = nicheFilter === 'All' || site.niche === nicheFilter;
    const matchesCountry = countryFilter === 'All' || (site.country || 'US') === countryFilter;
    
    const siteDa = site.da || 0;
    const matchesMinDa = minDa ? siteDa >= parseInt(minDa) : true;
    const matchesMaxDa = maxDa ? siteDa <= parseInt(maxDa) : true;
    
    const sitePa = site.pa || 0;
    const matchesMinPa = minPa ? sitePa >= parseInt(minPa) : true;
    const matchesMaxPa = maxPa ? sitePa <= parseInt(maxPa) : true;
    
    const sitePrice = site.guestPostPrice || 0;
    const matchesMinPrice = minPrice ? sitePrice >= parseInt(minPrice) : true;
    const matchesMaxPrice = maxPrice ? sitePrice <= parseInt(maxPrice) : true;

    return matchesSearch && matchesNiche && matchesCountry && matchesMinDa && matchesMaxDa && matchesMinPa && matchesMaxPa && matchesMinPrice && matchesMaxPrice;
  });

  const handleOpenPurchase = (site: WebsiteListing) => {
    if (!currentUser) {
      if (onLoginRequest) onLoginRequest();
      return;
    }
    setSelectedListing(site);
    setOrderType('guest_post');
    setArticleOption('provided');
    setPaymentMethod('bank');
    setTransactionId('');
    setTransactionDetails('');
    setArticleContent('');
    setTargetUrl('');
    setAnchorText('');
  };

  const submitPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing || !currentUser) return;

    if (articleOption === 'provided' && !articleContent.trim() && orderType !== 'link_insertion') {
      alert('Please provide the article content or a link to your article.');
      return;
    }
    
    if (!targetUrl.trim() || !anchorText.trim()) {
      alert('Please provide the target URL and anchor text.');
      return;
    }

    let basePrice = selectedListing.guestPostPrice;
    if (orderType === 'link_insertion') basePrice = selectedListing.linkInsertionPrice;
    if (orderType === 'pr') basePrice = selectedListing.prPrice;

    const totalPrice = articleOption === 'written' 
      ? basePrice + (selectedListing.writingFee || 0) 
      : basePrice;

    const newOrder: Order = {
      id: 'ord_' + Math.random().toString(36).substr(2, 9),
      buyerId: currentUser.id,
      sellerId: selectedListing.sellerId,
      listingId: selectedListing.id,
      listingUrl: selectedListing.url,
      orderType,
      articleOption,
      articleContent: articleOption === 'provided' ? articleContent : undefined,
      targetUrl,
      anchorText,
      totalPrice,
      paymentMethod,
      transactionId,
      transactionDetails,
      status: 'pending_payment',
      createdAt: Date.now()
    };

    createOrder(newOrder);
    setSelectedListing(null);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 font-medium"
          >
            <CheckCircle2 className="w-6 h-6" />
            Successfully secured guest post! Check your email.
          </motion.div>
        )}
      </AnimatePresence>

      {activeTab === 'marketplace' ? (
        <>
          <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative flex flex-col justify-center items-center text-center overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Globe className="w-64 h-64" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-medium tracking-tight relative z-10 mb-4">Buyer Marketplace</h1>
            <p className="text-lg text-slate-300 max-w-2xl relative z-10">
              Browse verified, high-authority websites. Filter by metrics to find the perfect context to rank your business higher.
            </p>
          </div>

          <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search by URL or keyword..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-all placeholder-slate-400 text-slate-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex-none px-4 py-3 border ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-700'} hover:bg-slate-100 rounded-xl font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap`}
                >
                  <Filter className="w-5 h-5" />
                  Filters {showFilters ? '▲' : '▼'}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Niche</label>
                      <select 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-all text-slate-700 font-medium"
                        value={nicheFilter}
                        onChange={(e) => setNicheFilter(e.target.value)}
                      >
                        {uniqueNiches.map(n => <option key={n} value={n}>{n} Niche</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Country</label>
                      <select 
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-all text-slate-700 font-medium"
                        value={countryFilter}
                        onChange={(e) => setCountryFilter(e.target.value)}
                      >
                        {uniqueCountries.map(c => <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>)}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">DA Range</label>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" value={minDa} onChange={e => setMinDa(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                        <span className="text-slate-400">-</span>
                        <input type="number" placeholder="Max" value={maxDa} onChange={e => setMaxDa(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">PA Range</label>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" value={minPa} onChange={e => setMinPa(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                        <span className="text-slate-400">-</span>
                        <input type="number" placeholder="Max" value={maxPa} onChange={e => setMaxPa(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                      </div>
                    </div>

                    <div className="space-y-2 lg:col-span-2">
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Price Range (GP)</label>
                      <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min $" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                        <span className="text-slate-400">-</span>
                        <input type="number" placeholder="Max $" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-blue-500" />
                        <button 
                          onClick={() => {
                            setNicheFilter('All');
                            setCountryFilter('All');
                            setMinDa(''); setMaxDa('');
                            setMinPa(''); setMaxPa('');
                            setMinPrice(''); setMaxPrice('');
                            setSearchTerm('');
                          }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-medium transition-colors whitespace-nowrap ml-2"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {filteredListings.length === 0 ? (
              <div className="py-20 text-center border-dashed">
                <p className="text-slate-500 font-medium text-lg">No websites found matching your criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                      <th className="p-4 font-semibold">Website</th>
                      <th className="p-4 font-semibold">Niche / Country</th>
                      <th className="p-4 font-semibold">DA</th>
                      <th className="p-4 font-semibold">PA</th>
                      <th className="p-4 font-semibold">Traffic</th>
                      <th className="p-4 font-semibold">Prices</th>
                      <th className="p-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredListings.map((site) => (
                      <tr key={site.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-slate-400" />
                            <span className="font-semibold text-slate-900">{site.url.replace(/^https?:\/\//, '')}</span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">Seller: {site.sellerName}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1 items-start">
                             <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap">
                               {site.niche}
                             </span>
                             <span className="text-xs text-slate-500 font-medium">
                               {site.country}
                             </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-slate-900 font-medium whitespace-nowrap">
                            <Activity className="w-4 h-4 text-emerald-500"/> {site.da}
                          </div>
                        </td>
                        <td className="p-4 text-slate-900 font-medium">{site.pa}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-slate-900 font-medium whitespace-nowrap">
                            <TrendingUp className="w-4 h-4 text-blue-500"/> {(site.traffic / 1000).toFixed(1)}k
                          </div>
                        </td>
                        <td className="p-4">
                      <div className="text-xs font-bold text-slate-900">GP: ${site.guestPostPrice}</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">LI: ${site.linkInsertionPrice}</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">PR: ${site.prPrice}</div>
                      {site.writingFee > 0 && (
                        <div className="text-[10px] text-slate-500 mt-1">
                          +${site.writingFee} writing fee
                        </div>
                      )}
                    </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => handleOpenPurchase(site)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium inline-flex items-center justify-center gap-2 transition-colors shadow-sm text-sm whitespace-nowrap"
                          >
                            <ShoppingCart className="w-4 h-4" /> Order Post
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-800">Your Orders</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-900">No orders placed</p>
              <p className="mt-1">Head to the marketplace to secure your first guest post.</p>
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
                            order.status === 'pending_payment' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {order.status === 'pending_payment' ? 'Pending Admin Approval' : 
                             order.status === 'processing' ? 'Processing' :
                             order.status === 'completion_review' ? 'In Review' : 
                             order.status === 'cancelled' ? 'Rejected' : 
                             order.status}
                          </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-slate-100">
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
                        <p className="font-semibold text-slate-900 capitalize">{order.articleOption === 'none' ? 'N/A' : order.articleOption === 'provided' ? 'I Provide' : 'Seller Writes'}</p>
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
                      <div className="col-span-2">
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Target URL & Anchor</p>
                        <p className="font-semibold text-slate-900 truncate" title={order.targetUrl}>{order.targetUrl}</p>
                        <p className="text-sm text-slate-600 mt-0.5 truncate" title={order.anchorText}>"{order.anchorText}"</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Payment Method</p>
                        <p className="font-semibold text-slate-900 capitalize">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[140px]">
                     <div className="hidden lg:block text-right mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize ${
                            order.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                            order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                            order.status === 'pending_payment' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                            order.status === 'completion_review' ? 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }`}>
                            {order.status === 'pending_payment' ? 'Pending Admin Approval' : 
                             order.status === 'processing' ? 'Processing' :
                             order.status === 'completion_review' ? 'In Review' : 
                             order.status === 'cancelled' ? 'Rejected' : 
                             order.status}
                          </span>
                     </div>
                     {(order.status === 'pending_payment' || order.status === 'processing') && updateOrderStatus && (
                       <button 
                         onClick={() => {
                           if (window.confirm('Are you sure you want to cancel this order?')) {
                             updateOrderStatus(order.id, 'cancelled');
                           }
                         }}
                         className="w-full flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 rounded-xl px-4 py-2 text-sm font-medium transition-colors shadow-sm"
                       >
                         Cancel Order
                       </button>
                     )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Purchase Modal */}
      <AnimatePresence>
        {selectedListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-20 pb-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setSelectedListing(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl relative z-10 my-auto"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 rounded-t-2xl">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  Complete Your Order
                </h3>
                <button onClick={() => setSelectedListing(null)} className="text-slate-400 hover:text-slate-600 p-1">
                  &times;
                </button>
              </div>
              
              <form onSubmit={submitPurchase} className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">{selectedListing.url.replace(/^https?:\/\//, '')}</h4>
                  <p className="text-sm text-slate-500">Domain Authority: {selectedListing.da} • {selectedListing.isDoFollow ? 'Do-Follow Link' : 'No-Follow Link'}</p>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Order Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors capitalize ${orderType === 'guest_post' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                        <input type="radio" value="guest_post" checked={orderType === 'guest_post'} onChange={() => { setOrderType('guest_post'); setArticleOption('provided'); }} className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded" />
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">Guest Post</span>
                          <span className="text-sm font-bold text-slate-900">${selectedListing.guestPostPrice}</span>
                        </div>
                     </label>
                     <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors capitalize ${orderType === 'link_insertion' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                        <input type="radio" value="link_insertion" checked={orderType === 'link_insertion'} onChange={() => { setOrderType('link_insertion'); setArticleOption('none'); }} className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded" />
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">Link Insertion</span>
                          <span className="text-sm font-bold text-slate-900">${selectedListing.linkInsertionPrice}</span>
                        </div>
                     </label>
                     <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors capitalize ${orderType === 'pr' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                        <input type="radio" value="pr" checked={orderType === 'pr'} onChange={() => { setOrderType('pr'); setArticleOption('provided'); }} className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded" />
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">Press Release</span>
                          <span className="text-sm font-bold text-slate-900">${selectedListing.prPrice}</span>
                        </div>
                     </label>
                  </div>
                </div>

                {orderType !== 'link_insertion' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-700">Article Provision</label>
                    <label className={`block p-4 border rounded-xl cursor-pointer transition-colors ${articleOption === 'provided' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <input type="radio" name="article" value="provided" checked={articleOption === 'provided'} onChange={() => setArticleOption('provided')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                             <span className="font-medium text-slate-900 text-sm">I will provide the content</span>
                          </div>
                          <span className="font-bold text-slate-900">+ $0</span>
                       </div>
                    </label>
                    {selectedListing.writingFee > 0 && (
                       <label className={`block p-4 border rounded-xl cursor-pointer transition-colors ${articleOption === 'written' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                          <div className="flex justify-between items-center">
                             <div className="flex items-center gap-3">
                                <input type="radio" name="article" value="written" checked={articleOption === 'written'} onChange={() => setArticleOption('written')} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                                <span className="font-medium text-slate-900 text-sm">Seller will write the content</span>
                             </div>
                             <span className="font-bold text-slate-900">+${selectedListing.writingFee}</span>
                          </div>
                       </label>
                    )}
                  </div>
                )}

                {articleOption === 'provided' && orderType !== 'link_insertion' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Content (or Google Doc Link)</label>
                    <textarea 
                      required 
                      rows={4}
                      placeholder="Paste your content here, or provide a public link to your Google Doc..."
                      value={articleContent}
                      onChange={e => setArticleContent(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-all resize-none"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Target URL</label>
                    <input 
                      required 
                      type="url" 
                      placeholder="https://yourwebsite.com/page"
                      value={targetUrl}
                      onChange={e => setTargetUrl(e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Anchor Text</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Best SEO Tools"
                      value={anchorText}
                      onChange={e => setAnchorText(e.target.value)}
                      className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-700">Payment Method (Admin Approval Required)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                     {(['paypal', 'bank', 'google_pay', 'crypto'] as PaymentMethod[]).map(method => (
                        <label key={method || 'bank'} className={`text-center p-3 border rounded-xl cursor-pointer transition-colors capitalize ${paymentMethod === method ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium' : 'border-slate-200 hover:border-slate-300 text-slate-600'}`}>
                           <input type="radio" name="payment" value={method || ''} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="sr-only" />
                           {method?.replace('_', ' ')}
                        </label>
                     ))}
                  </div>
                  {paymentMethod === 'paypal' && (
                     <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
                        <p className="text-sm text-blue-800">Please send payment to: <strong>admin@guestpostingsite.com</strong></p>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Your PayPal Email or Transaction ID</label>
                           <input required type="text" placeholder="Enter your PayPal email or Transaction ID" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none transition-all shadow-sm" />
                        </div>
                     </div>
                  )}
                  {paymentMethod === 'bank' && (
                     <div className="mt-4 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-3">
                        <p className="text-sm text-emerald-800">Please send payment to our Bank Account (PK33BUKB20201555555555).</p>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Your IBAN Number</label>
                           <input required type="text" placeholder="Enter your IBAN number" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none transition-all shadow-sm" />
                        </div>
                     </div>
                  )}
                  {paymentMethod === 'google_pay' && (
                     <div className="mt-4 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 space-y-3">
                        <p className="text-sm text-indigo-800">Please send payment via Google Pay.</p>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Your Google Pay Email (LinkifyHub@GPay)</label>
                           <input required type="text" placeholder="Enter your Google Pay Email" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none transition-all shadow-sm" />
                        </div>
                     </div>
                  )}
                  {paymentMethod === 'crypto' && (
                     <div className="mt-4 p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-3">
                        <p className="text-sm text-amber-800 break-all">Please send payment to TRC20 Wallet: <br className="md:hidden" /><strong className="font-mono text-amber-900 tracking-tight">TUU1234567890ABCDEF1234567890XYZ</strong></p>
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Your TRC20 Wallet Address or Transaction ID</label>
                           <input required type="text" placeholder="Enter wallet address or TRX ID" value={transactionId} onChange={e => setTransactionId(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none transition-all shadow-sm" />
                        </div>
                     </div>
                  )}
                </div>

                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1">Transaction Details / Order Notes (Optional)</label>
                   <textarea rows={2} placeholder="Any additional information about the payment or order requirements..." value={transactionDetails} onChange={e => setTransactionDetails(e.target.value)} className="w-full px-4 py-2 bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none transition-all shadow-sm resize-none"></textarea>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center mt-6">
                   <span className="text-slate-600 font-medium">Total Amount</span>
                   <span className="text-2xl font-bold text-emerald-600">
                      ${articleOption === 'written' ? (orderType === 'guest_post' ? selectedListing.guestPostPrice : orderType === 'link_insertion' ? selectedListing.linkInsertionPrice : selectedListing.prPrice) + (selectedListing.writingFee || 0) : (orderType === 'guest_post' ? selectedListing.guestPostPrice : orderType === 'link_insertion' ? selectedListing.linkInsertionPrice : selectedListing.prPrice)}
                   </span>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setSelectedListing(null)} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
                    Submit Order
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
