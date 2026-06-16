import { CheckCircle2, Store, LayoutDashboard } from 'lucide-react';

interface PricingProps {
  onLoginRequest: () => void;
}

export default function Pricing({ onLoginRequest }: PricingProps) {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Free to join. No monthly subscriptions. You only pay for what you buy or sell.
        </p>
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        
        {/* Buyer Pricing */}
        <div className="bg-white rounded-3xl p-8 border-2 border-blue-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            For Buyers
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <Store className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Buy SEO Backlinks</h2>
          <p className="text-slate-500 mb-6">Access our premium inventory of vetted websites and place orders seamlessly.</p>
          
          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-extrabold text-slate-900">$0</span>
            <span className="text-slate-500 ml-2 font-medium">/ month</span>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "Free account registration",
              "Full access to website marketplace",
              "Pay only the seller's listed price",
              "Secure escrow payments",
              "100% refund if seller fails to deliver",
              "Dedicated account manager for enterprise"
            ].map((feature, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mr-3 mt-0.5" />
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onLoginRequest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3.5 font-medium transition-colors"
          >
            Create Buyer Account
          </button>
        </div>

        {/* Seller Pricing */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
            <LayoutDashboard className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sell Guest Posts</h2>
          <p className="text-slate-500 mb-6">List your websites to our network of active SEO agencies and brands.</p>
          
          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-extrabold text-slate-900">15%</span>
            <span className="text-slate-500 ml-2 font-medium">fee per order</span>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              "Free to list unlimited websites",
              "You set your own prices",
              "Keep 85% of standard order value",
              "We handle all payment processing",
              "Guaranteed payout upon completion",
              "Protection against buyer fraud"
            ].map((feature, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mr-3 mt-0.5" />
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <button 
            onClick={onLoginRequest}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl py-3.5 font-medium transition-colors"
          >
            Create Publisher Account
          </button>
        </div>

      </div>
    </div>
  );
}
