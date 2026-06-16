import { Role, User } from '../types';
import { 
  LayoutDashboard, 
  Settings, 
  Store, 
  ListOrdered, 
  Wallet, 
  ShieldCheck, 
  Users,
  Globe
} from 'lucide-react';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
}

export default function Sidebar({ currentUser, activeTab, setActiveTab, isOpen }: SidebarProps) {
  const getTabs = () => {
    switch (currentUser.role) {
      case 'seller':
        return [
          { id: 'dashboard', label: 'My Websites', icon: LayoutDashboard },
          { id: 'orders', label: 'Orders', icon: ListOrdered },
          { id: 'earnings', label: 'Earnings', icon: Wallet },
          { id: 'settings', label: 'Account Settings', icon: Settings },
        ];
      case 'buyer':
        return [
          { id: 'marketplace', label: 'Marketplace', icon: Store },
          { id: 'orders', label: 'My Orders', icon: ListOrdered },
          { id: 'settings', label: 'Account Settings', icon: Settings },
        ];
      case 'admin':
        return [
          { id: 'approvals', label: 'Approvals', icon: ShieldCheck },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'withdrawals', label: 'Withdrawals', icon: Wallet },
          { id: 'settings', label: 'Account Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const tabs = getTabs();

  return (
    <aside className={`w-64 flex-shrink-0 border-r border-slate-200 bg-white fixed lg:static inset-y-0 left-0 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="h-full py-6 px-4 flex flex-col pt-20 lg:pt-6">
        <div className="mb-8 px-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Menu</p>
          <h2 className="text-lg font-medium text-slate-900 capitalize">{currentUser.role === 'admin' ? 'Administrator' : currentUser.role} Portal</h2>
        </div>
        
        <nav className="flex-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-6 border-t border-slate-200">
           <div className="px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                 {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-sm font-medium text-slate-900 truncate">{currentUser.name}</p>
                 <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
              </div>
           </div>
        </div>
      </div>
    </aside>
  );
}
