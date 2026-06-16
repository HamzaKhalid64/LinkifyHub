import { Search, Book, FileText, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react';

export default function HelpCenter() {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of our platform, how to create an account, and navigate the dashboard.",
      icon: Book,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "For Buyers",
      description: "Everything you need to know about purchasing links, writing guidelines, and understanding metrics.",
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "For Sellers (Publishers)",
      description: "How to list your websites, fulfill orders, handle content, and manage payouts.",
      icon: HelpCircle,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Payments & Billing",
      description: "Information about deposits, withdrawals, fees, and transaction history.",
      icon: MessageCircle,
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  const popularArticles = [
    "How to deposit funds into your account",
    "What are the acceptance criteria for a new Website?",
    "Understanding the Escrow Process",
    "What happens if a seller misses the deadline?",
    "Difference between Do-Follow and No-Follow links"
  ];

  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      
      {/* Search Header */}
      <div className="bg-slate-900 w-full pt-20 pb-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">How can we help you?</h1>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for articles, tutorials, or FAQs..." 
            className="w-full pl-14 pr-4 py-4 rounded-xl outline-none text-slate-900 text-lg shadow-lg border-2 border-transparent focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto px-4 py-16 -mt-16">
        
        {/* Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 relative z-10">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.bg} ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-3">{cat.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  View articles <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Popular Articles */}
          <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Popular Articles</h2>
            <div className="space-y-4">
              {popularArticles.map((article, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                  <span className="font-medium text-slate-700">{article}</span>
                  <ArrowRight className="w-5 h-5 text-slate-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-blue-600 rounded-2xl p-8 shadow-sm border border-blue-700 text-center flex flex-col justify-center">
            <MessageCircle className="w-12 h-12 text-white/80 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Still need help?</h2>
            <p className="text-blue-100 mb-8 text-sm">
              Cannot find the answer you are looking for? Our support team is here to assist you.
            </p>
            <button className="bg-white text-blue-600 font-medium py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Contact Support
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
