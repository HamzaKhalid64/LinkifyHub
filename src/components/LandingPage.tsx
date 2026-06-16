import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Zap, Users, Store, LayoutDashboard } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 w-full overflow-x-hidden pt-12 pb-24">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-200">
            <Zap className="w-4 h-4" />
            <span>The Premier Link Building Marketplace</span>
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Build authority with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">verified backlinks</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            A transparent marketplace where website owners and SEO professionals connect. Buy and sell guest posts securely with verified DA, PA, and traffic metrics.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button 
              onClick={onGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-lg hover:shadow-xl shadow-blue-500/30"
            >
              Start Trading Now
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full text-lg font-medium transition-colors shadow-sm">
              How it works
            </button>
          </div>
        </motion.div>
      </section>

      {/* Roles Section */}
      <section className="bg-white py-24 border-y border-slate-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">One Platform, Three Portals</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Whether you're looking to monetize your audience or boost your search rankings, LinkifyHub is built for you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group hover:border-emerald-200 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <Store className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <Store className="w-7 h-7 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">SEO Buyers</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Filter thousands of verified websites by niche, DA, PA, and traffic. Purchase guest posts securely and boost your client's search rankings.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> 100% Verified Metrics</li>
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Escrow Protection</li>
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Direct Communication</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <LayoutDashboard className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <LayoutDashboard className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Publishers</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Monetize your website's authority. List your site, set your own prices, and receive guest post requests directly from verified buyers.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Zero Listing Fees</li>
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Total Editorial Control</li>
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Guaranteed Payments</li>
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group hover:border-indigo-200 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Moderators</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Our dedicated admin team manually reviews every website submission to ensure quality, spam-free listings and accurate metrics.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Manual Verification</li>
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Dispute Resolution</li>
                <li className="flex items-center text-sm text-slate-600"><CheckIcon /> Spam Prevention</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white shadow-2xl relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">Why trust LinkifyHub?</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We've built an ecosystem that eliminates the spam, hidden PBNs, and guesswork from link building. Every site is pre-vetted.
              </p>
              
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="bg-emerald-500/20 p-3 rounded-xl h-fit">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Move the Needle</h4>
                    <p className="text-slate-400">Backlinks from our vetted marketplace provide real SEO value, helping your clients rank higher on search engines.</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl h-fit">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Safe Trading Environment</h4>
                    <p className="text-slate-400">Escrow-style payments mean sellers are guaranteed their money, and buyers are guaranteed their links remain live.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-3xl">
              <h4 className="font-semibold text-xl mb-6">By the Numbers</h4>
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">15,000+</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider font-medium">Verified Websites</div>
                </div>
                <div className="w-full h-px bg-slate-700"></div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">4.9/5</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider font-medium">Average Seller Rating</div>
                </div>
                <div className="w-full h-px bg-slate-700"></div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-1">&lt; 48h</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider font-medium">Average Publishing Time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
