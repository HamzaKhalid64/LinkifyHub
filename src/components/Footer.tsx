import React from 'react';
import { Store } from 'lucide-react';

interface FooterProps {
  onNavigatePublic: (view: string) => void;
}

export default function Footer({ onNavigatePublic }: FooterProps) {
  const handleNav = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    onNavigatePublic(view);
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
                <Store className="w-4 h-4" />
              </span>
              <span className="text-xl font-display font-medium tracking-tight text-slate-900">
                Linkify<span className="text-blue-600 font-bold">Hub</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm mb-4">
              The premier marketplace for verified guest posts and high authority backlinks.
            </p>
            <div className="text-sm font-medium text-slate-400">
              &copy; {new Date().getFullYear()} LinkifyHub.
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={(e) => handleNav(e, 'marketplace')} className="hover:text-blue-600 transition-colors">Marketplace</button></li>
              <li><button onClick={(e) => handleNav(e, 'how-it-works')} className="hover:text-blue-600 transition-colors">How it works</button></li>
              <li><button onClick={(e) => handleNav(e, 'pricing')} className="hover:text-blue-600 transition-colors">Pricing</button></li>
              <li><button onClick={(e) => handleNav(e, 'sellers-directory')} className="hover:text-blue-600 transition-colors">Sellers Directory</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={(e) => handleNav(e, 'help-center')} className="hover:text-blue-600 transition-colors">Help Center</button></li>
              <li><button onClick={(e) => handleNav(e, 'contact-us')} className="hover:text-blue-600 transition-colors">Contact Us</button></li>
              <li><button onClick={(e) => handleNav(e, 'dispute-resolution')} className="hover:text-blue-600 transition-colors">Dispute Resolution</button></li>
              <li><button onClick={(e) => handleNav(e, 'verification-process')} className="hover:text-blue-600 transition-colors">Verification Process</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><button onClick={(e) => handleNav(e, 'terms-of-service')} className="hover:text-blue-600 transition-colors">Terms of Service</button></li>
              <li><button onClick={(e) => handleNav(e, 'privacy-policy')} className="hover:text-blue-600 transition-colors">Privacy Policy</button></li>
              <li><button onClick={(e) => handleNav(e, 'cookie-policy')} className="hover:text-blue-600 transition-colors">Cookie Policy</button></li>
              <li><button onClick={(e) => handleNav(e, 'refund-protocol')} className="hover:text-blue-600 transition-colors">Refund Protocol</button></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
