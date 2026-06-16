import { Globe, Search, Filter, Activity, TrendingUp, ShoppingCart, Lock } from 'lucide-react';

interface PublicMarketplaceProps {
  onLoginRequest: () => void;
}

export default function PublicMarketplace({ onLoginRequest }: PublicMarketplaceProps) {
  // Mock data for public view to show what's possible
  const sampleListings = [
    { id: '1', url: 'techcrunch-style.com', niche: 'Technology', da: 65, pa: 45, traffic: 150000, guestPostPrice: 250, linkInsertionPrice: 150, prPrice: 350 },
    { id: '2', url: 'fitness-blog-example.org', niche: 'Health', da: 45, pa: 32, traffic: 45000, guestPostPrice: 120, linkInsertionPrice: 80, prPrice: 200 },
    { id: '3', url: 'finance-news-daily.net', niche: 'Finance', da: 58, pa: 41, traffic: 89000, guestPostPrice: 180, linkInsertionPrice: 100, prPrice: 250 },
    { id: '4', url: 'travel-diaries.com', niche: 'Travel', da: 52, pa: 38, traffic: 65000, guestPostPrice: 150, linkInsertionPrice: 90, prPrice: 200 },
  ];

  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">LinkifyHub Marketplace</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Browse verified, high-authority websites. Filter by metrics to find the perfect context to rank your business higher.
        </p>
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by keyword... (Sign in to unlock full search)" 
              disabled
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-slate-500 cursor-not-allowed"
            />
          </div>
          <div className="flex gap-2">
            <button 
              disabled
              className="px-4 py-3 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl font-medium inline-flex items-center gap-2 cursor-not-allowed whitespace-nowrap"
            >
              <Filter className="w-5 h-5" />
              Filters ▼
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative">
           <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center pt-20">
             <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-md border border-slate-100">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                 <Lock className="w-8 h-8 text-blue-600" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">Create an account to unlock</h3>
               <p className="text-slate-500 mb-6">Sign up for a buyer account to view thousands of real websites, full URLs, and place orders directly.</p>
               <button 
                 onClick={onLoginRequest}
                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors w-full"
               >
                 Sign Up for Free
               </button>
             </div>
           </div>

          <div className="overflow-x-auto opacity-50 select-none pointer-events-none">
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
                {sampleListings.map((site) => (
                  <tr key={site.id} className="hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <span className="font-semibold text-slate-900 blur-[3px]">{site.url}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-md">{site.niche}</span>
                        <span className="text-xs text-slate-500 font-medium">US</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                        <Activity className="w-4 h-4 text-emerald-500"/> {site.da}
                      </div>
                    </td>
                    <td className="p-4 text-slate-900 font-medium">{site.pa}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                        <TrendingUp className="w-4 h-4 text-blue-500"/> {(site.traffic / 1000).toFixed(1)}k
                      </div>
                    </td>
                    <td className="p-4">
                        <div className="text-xs font-bold text-slate-900">GP: ${site.guestPostPrice}</div>
                        <div className="text-xs font-bold text-slate-900 mt-0.5">LI: ${site.linkInsertionPrice}</div>
                        <div className="text-xs font-bold text-slate-900 mt-0.5">PR: ${site.prPrice}</div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium inline-flex items-center justify-center gap-2 text-sm">
                        <ShoppingCart className="w-4 h-4" /> Order Post
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
