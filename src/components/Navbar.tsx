import { Role, User } from '../types';
import { LogOut, LayoutDashboard, Store, ShieldAlert, Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  currentUser: User | null;
  logout: () => void;
  onLoginClick?: () => void;
  onAdminClick?: () => void;
  onMenuClick?: () => void;
  onNavigatePublic: (view: 'home' | 'marketplace' | 'how-it-works' | 'pricing') => void;
  currentPublicView?: string;
}

export default function Navbar({ currentUser, logout, onLoginClick, onAdminClick, onMenuClick, onNavigatePublic, currentPublicView }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-3">
            {currentUser && (
               <button 
                 onClick={onMenuClick}
                 className="mr-2 p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 lg:hidden focus:outline-none"
               >
                 <Menu className="w-5 h-5" />
               </button>
            )}
            <span className="bg-blue-600 text-white p-2 rounded-xl shadow-sm">
              <Store className="w-5 h-5" />
            </span>
            <button onClick={() => onNavigatePublic('home')} className="text-2xl font-display font-medium tracking-tight text-slate-900 hover:opacity-80 transition-opacity">
              Linkify<span className="text-blue-600 font-bold">Hub</span>
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6 text-sm font-medium mr-2">
              <button 
                onClick={() => onNavigatePublic('marketplace')} 
                className={`transition-colors ${currentPublicView === 'marketplace' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Marketplace
              </button>
              <button 
                onClick={() => onNavigatePublic('how-it-works')} 
                className={`transition-colors ${currentPublicView === 'how-it-works' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
              >
                How it works
              </button>
              <button 
                onClick={() => onNavigatePublic('pricing')} 
                className={`transition-colors ${currentPublicView === 'pricing' ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Pricing
              </button>
              {!currentUser && (
                <button onClick={onAdminClick} className="text-slate-500 hover:text-slate-900 transition-colors">Administrator</button>
              )}
            </div>
            
            {currentUser ? (
              <div className="flex items-center space-x-4 pl-6 border-l border-slate-200">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-sm font-semibold text-slate-900">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider flex items-center justify-end space-x-1 mt-0.5">
                    {currentUser.role === 'admin' && <ShieldAlert className="w-3 h-3 text-red-500" />}
                    {currentUser.role === 'seller' && <LayoutDashboard className="w-3 h-3 text-blue-500" />}
                    {currentUser.role === 'buyer' && <Store className="w-3 h-3 text-emerald-500" />}
                    <span>{currentUser.role === 'admin' ? 'Administrator' : currentUser.role} Portal</span>
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors flex items-center group relative"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="absolute -bottom-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                    Log out
                  </span>
                </motion.button>
              </div>
            ) : (
               <div className="flex items-center space-x-4 pl-6 border-l border-slate-200">
                 <button onClick={onLoginClick} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</button>
                 <button onClick={onLoginClick} className="bg-slate-900 text-white hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition-colors">Get Started</button>
               </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
