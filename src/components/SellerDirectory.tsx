import { User, WebsiteListing } from '../types';
import { motion } from 'motion/react';
import { Search, MapPin, Store, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SellerDirectoryProps {
  users: User[];
  listings: WebsiteListing[];
}

export default function SellerDirectory({ users, listings }: SellerDirectoryProps) {
  const [search, setSearch] = useState('');
  
  // Only show approved sellers
  const sellers = users.filter(u => u.role === 'seller' && u.isApproved);
  
  const filteredSellers = sellers.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    (s.businessType || '').toLowerCase().includes(search.toLowerCase())
  );

  const getSellerStats = (sellerId: string) => {
    const sellerListings = listings.filter(l => l.sellerId === sellerId && l.status === 'approved');
    return {
      sitesCount: sellerListings.length,
      // more stats could be gathered if needed
    }
  };

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 text-white pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Verified Sellers Directory</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Browse our curated list of verified publishers, agencies, and webmasters. 
            Connect with top-tier link building partners.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full px-4 py-12 -mt-8">
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto mb-12 flex items-center">
          <Search className="w-5 h-5 text-slate-400 ml-4 mr-2" />
          <input
            type="text"
            placeholder="Search sellers by name or business type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 px-2 outline-none text-slate-700 bg-transparent"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <Store className="w-16 h-16 text-slate-200 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-900">No sellers found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your search criteria.</p>
            </div>
          ) : (
            filteredSellers.map((seller, index) => {
              const stats = getSellerStats(seller.id);
              return (
                <motion.div
                  key={seller.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow group flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold uppercase">
                        {seller.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                          {seller.name}
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </h3>
                        <p className="text-sm text-slate-500 capitalize">{seller.businessType || 'Publisher'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-slate-600 mb-6 flex-grow space-y-2">
                    {seller.locationAddress && (
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                        <span className="line-clamp-2">{seller.locationAddress}</span>
                      </p>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Active Sites</p>
                      <p className="font-semibold text-slate-900">{stats.sitesCount}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
