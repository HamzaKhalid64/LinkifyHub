import { ShieldCheck, TrendingUp, DollarSign, Store, LayoutDashboard } from 'lucide-react';

interface HowItWorksProps {
  onLoginRequest: () => void;
}

export default function HowItWorks({ onLoginRequest }: HowItWorksProps) {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">How LinkifyHub Works</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          The most straightforward guest posting marketplace. Connect directly with website owners to secure high-quality backlinks.
        </p>
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* For Buyers */}
          <div className="space-y-8">
            <div className="bg-blue-50 text-blue-700 font-bold tracking-wider uppercase text-sm px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <Store className="w-4 h-4" /> For SEOs & Buyers
            </div>
            
            <h2 className="text-3xl font-display font-bold text-slate-900">Rank your websites higher with quality backlinks</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Sign up securely</h3>
                  <p className="text-slate-600">Create a buyer account using your company email to access our highly curated invite-only marketplace.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Find the perfect domains</h3>
                  <p className="text-slate-600">Filter by metrics like DA, PA, Traffic, and Niche. All publishers are vetted by our admin team.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Place your order</h3>
                  <p className="text-slate-600">Provide your own article or pay the seller to write it. We hold funds securely until your link is live.</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onLoginRequest}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors border border-transparent"
            >
              Start Buying Links
            </button>
          </div>

          {/* For Sellers */}
          <div className="space-y-8">
            <div className="bg-emerald-50 text-emerald-700 font-bold tracking-wider uppercase text-sm px-4 py-1.5 rounded-full inline-flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> For Publishers
            </div>
            
            <h2 className="text-3xl font-display font-bold text-slate-900">Monetize your website audience easily</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Submit your website</h3>
                  <p className="text-slate-600">Add your domain metrics, pricing per post, and whether you accept casino/CBD links.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Pass verification</h3>
                  <p className="text-slate-600">Our administrators will verify your website's traffic and authority before listing it in the marketplace.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Receive orders & get paid</h3>
                  <p className="text-slate-600">Publish content according to the buyer's instructions, submit the live URL, and withdraw your earnings safely.</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onLoginRequest}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors border border-transparent"
            >
              Become a Seller
            </button>
          </div>

        </div>
      </div>
      
      {/* Guarantees */}
      <div className="max-w-6xl w-full mx-auto px-4 py-12 border-t border-slate-200">
        <h2 className="text-2xl font-bold text-center mb-10">Platform Guarantees</h2>
        <div className="grid md:grid-cols-3 gap-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
              <ShieldCheck className="w-10 h-10 text-slate-800 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Vetted Quality</h3>
              <p className="text-slate-600 text-sm">Every single site is manually checked for real traffic, not just metrics manipulation.</p>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
              <TrendingUp className="w-10 h-10 text-slate-800 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Rankings Focus</h3>
              <p className="text-slate-600 text-sm">We specialize in Do-Follow, contextual backlinks that actually move the needle for your business.</p>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
              <DollarSign className="w-10 h-10 text-slate-800 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Transparent Pricing</h3>
              <p className="text-slate-600 text-sm">No hidden fees. Sellers set their rates, buyers pay the listed price. Simple and authentic.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
