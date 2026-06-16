import { useState, useEffect } from 'react';
import LoginPortal from './components/LoginPortal';
import LandingPage from './components/LandingPage';
import SellerDashboard from './components/SellerDashboard';
import AdminDashboard from './components/AdminDashboard';
import BuyerMarketplace from './components/BuyerMarketplace';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import ProfileManagement from './components/ProfileManagement';
import PublicMarketplace from './components/PublicMarketplace';
import HowItWorks from './components/HowItWorks';
import Pricing from './components/Pricing';
import RefundPolicy from './components/RefundPolicy';
import GenericPage from './components/GenericPage';
import ContactUs from './components/ContactUs';
import CookiePolicy from './components/CookiePolicy';
import SellerDirectory from './components/SellerDirectory';
import VerificationProcess from './components/VerificationProcess';
import TermsOfService from './components/TermsOfService';
import HelpCenter from './components/HelpCenter';
import PrivacyPolicy from './components/PrivacyPolicy';
import DisputeResolution from './components/DisputeResolution';
import { Role, User, WebsiteListing, Order, Withdrawal } from './types';
import { fetchUsers, fetchListings, fetchOrders, updateListing, saveUser, updateOrder, deleteUser, fetchWithdrawals, updateWithdrawal, deleteListing } from './supabaseService';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<WebsiteListing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authRole, setAuthRole] = useState<Role | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [publicView, setPublicView] = useState<string>('home');

  const loadData = async () => {
    // Basic local session for the prototype
    const savedUser = localStorage.getItem('linkify_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      if (user.role === 'seller') setActiveTab('dashboard');
      if (user.role === 'buyer') setActiveTab('marketplace');
      if (user.role === 'admin') setActiveTab('approvals');
    }

    const [users, ls, or, wts] = await Promise.all([
      fetchUsers(),
      fetchListings(),
      fetchOrders(),
      fetchWithdrawals()
    ]);
    
    setAllUsers(users);
    setListings(ls);
    setOrders(or);
    setWithdrawals(wts);
    
    setIsLoaded(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loginAs = async (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('linkify_user', JSON.stringify(user));
    setShowAuth(false);
    if (user.role === 'seller') setActiveTab('dashboard');
    if (user.role === 'buyer') setActiveTab('marketplace');
    if (user.role === 'admin') setActiveTab('approvals');
    
    const users = await fetchUsers();
    setAllUsers(users);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('linkify_user');
  };

  const addListing = async (listing: WebsiteListing) => {
    const saved = await updateListing(listing);
    if (saved) {
      setListings([saved, ...listings]);
    }
  };

  const updateListingStatus = async (id: string, status: 'approved' | 'rejected') => {
    const listing = listings.find(l => l.id === id);
    if (listing) {
      const updated = { ...listing, status };
      const saved = await updateListing(updated);
      if (saved) {
        setListings(listings.map(l => l.id === id ? saved : l));
      }
    }
  };

  const deleteListingById = async (id: string) => {
    const success = await deleteListing(id);
    if (success) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  const createOrder = async (order: Order) => {
    const saved = await updateOrder(order);
    if (saved) {
      setOrders([saved, ...orders]);
    }
  };

  const updateOrderStatus = async (id: string, status: Order['status'], additionalData?: Partial<Order>) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      const updated = { ...order, status, ...additionalData };
      const saved = await updateOrder(updated);
      if (saved) {
        setOrders(orders.map(o => o.id === id ? saved : o));
        
        // If the order is being marked as completed, add funds to the seller's balance
        if (status === 'completed' && order.status !== 'completed') {
           const seller = allUsers.find(u => u.id === order.sellerId);
           if (seller) {
              const updatedSeller = { ...seller, availableBalance: (seller.availableBalance || 0) + order.totalPrice };
              await saveUser(updatedSeller);
              setAllUsers(allUsers.map(u => u.id === seller.id ? updatedSeller : u));
              if (currentUser?.id === seller.id) setCurrentUser(updatedSeller);
           }
        }
      }
    }
  };

  const createWithdrawalRequest = async (withdrawal: Withdrawal) => {
    const saved = await updateWithdrawal(withdrawal);
    if (saved) {
      setWithdrawals([saved, ...withdrawals]);
    }
  };

  const updateWithdrawalStatus = async (id: string, status: Withdrawal['status']) => {
    const withdrawal = withdrawals.find(w => w.id === id);
    if (withdrawal) {
      const updated = { ...withdrawal, status };
      const saved = await updateWithdrawal(updated);
      if (saved) {
        setWithdrawals(withdrawals.map(w => w.id === id ? saved : w));
        
        // If approved, deduct from the seller's balance
        if (status === 'approved' && withdrawal.status !== 'approved') {
          const seller = allUsers.find(u => u.id === withdrawal.sellerId);
          if (seller) {
            const updatedSeller = { ...seller, availableBalance: (seller.availableBalance || 0) - withdrawal.amount };
            await saveUser(updatedSeller);
            setAllUsers(allUsers.map(u => u.id === seller.id ? updatedSeller : u));
            if (currentUser?.id === seller.id) setCurrentUser(updatedSeller);
          }
        }
      }
    }
  };

  const updateUserApproval = async (id: string, isApproved: boolean) => {
    const user = allUsers.find(u => u.id === id);
    if (user) {
      const updated = { ...user, isApproved };
      const saved = await saveUser(updated);
      if (saved) {
        setAllUsers(allUsers.map(u => u.id === id ? saved : u));
      }
    }
  };

  const rejectUser = async (id: string) => {
    const success = await deleteUser(id);
    if (success) {
      setAllUsers(allUsers.filter(u => u.id !== id));
    }
  };

  const updateUserProfile = async (updatedUser: User) => {
    const saved = await saveUser(updatedUser);
    if (saved) {
      setAllUsers(allUsers.map(u => u.id === updatedUser.id ? saved : u));
      setCurrentUser(saved);
      localStorage.setItem('linkify_user', JSON.stringify(saved));
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative">
      <Navbar 
        currentUser={currentUser} 
        logout={logout} 
        onLoginClick={() => {
          setAuthRole(undefined);
          setShowAuth(true);
        }} 
        onAdminClick={() => {
          setAuthRole('admin');
          setShowAuth(true);
        }}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onNavigatePublic={(view) => {
          if (currentUser) {
            // Already logged in, could navigate within but keeping it simple
            if (view === 'marketplace' && currentUser.role === 'buyer') setActiveTab('marketplace');
            if (view === 'how-it-works' || view === 'pricing') {
              // Ignore or logout or whatever. Typically logged in users might not see these but we can just logout or redirect.
              if (currentUser.role === 'buyer') setActiveTab('marketplace');
              else if (currentUser.role === 'seller') setActiveTab('dashboard');
              else setActiveTab('approvals');
            }
          } else {
            setPublicView(view);
            setShowAuth(false);
          }
        }}
        currentPublicView={publicView}
      />
      
      {!currentUser ? (
        <main className="flex-grow w-full flex flex-col">
          {showAuth ? (
            <LoginPortal 
              onLogin={loginAs} 
              onBack={() => {
                setShowAuth(false);
                setAuthRole(undefined);
              }} 
              defaultRole={authRole}
            />
          ) : (
            <>
              {publicView === 'home' && <LandingPage onGetStarted={() => setShowAuth(true)} />}
              {publicView === 'marketplace' && (
                <div className="max-w-7xl mx-auto w-full p-4 md:p-8">
                  <BuyerMarketplace 
                    listings={listings.filter(l => l.status === 'approved')}
                    currentUser={null}
                    createOrder={createOrder}
                    orders={[]}
                    activeTab="marketplace"
                    updateOrderStatus={updateOrderStatus}
                    users={allUsers}
                    onLoginRequest={() => {
                      setAuthRole('buyer');
                      setShowAuth(true);
                    }}
                  />
                </div>
              )}
              {publicView === 'how-it-works' && <HowItWorks onLoginRequest={() => setShowAuth(true)} />}
              {publicView === 'pricing' && <Pricing onLoginRequest={() => setShowAuth(true)} />}
              {publicView === 'sellers-directory' && <SellerDirectory users={allUsers} listings={listings} />}
              {publicView === 'help-center' && <HelpCenter />}
              {publicView === 'contact-us' && <ContactUs />}
              {publicView === 'dispute-resolution' && <DisputeResolution />}
              {publicView === 'verification-process' && <VerificationProcess />}
              {publicView === 'terms-of-service' && <TermsOfService />}
              {publicView === 'privacy-policy' && <PrivacyPolicy />}
              {publicView === 'cookie-policy' && <CookiePolicy />}
              {publicView === 'refund-protocol' && <RefundPolicy />}
            </>
          )}
        </main>
      ) : (
        <div className="flex-grow w-full max-w-7xl mx-auto flex relative">
          <Sidebar 
            currentUser={currentUser} 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
               setActiveTab(tab);
               setIsSidebarOpen(false);
            }} 
            isOpen={isSidebarOpen}
          />
          
          {/* Mobile sidebar overlay */}
          {isSidebarOpen && (
             <div 
               className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
               onClick={() => setIsSidebarOpen(false)}
             />
          )}

          <main className="flex-grow md:p-8 p-4 w-full overflow-hidden">
            {currentUser.role === 'seller' && (activeTab === 'dashboard' || activeTab === 'orders' || activeTab === 'earnings') && (
              <SellerDashboard 
                listings={listings.filter(l => l.sellerId === currentUser.id)} 
                addListing={addListing} 
                currentUser={currentUser}
                activeTab={activeTab}
                orders={orders.filter(o => o.sellerId === currentUser.id && o.status !== 'pending_payment')}
                updateOrderStatus={updateOrderStatus}
                withdrawals={withdrawals.filter(w => w.sellerId === currentUser.id)}
                createWithdrawalRequest={createWithdrawalRequest}
                deleteListing={deleteListingById}
                users={allUsers}
              />
            )}
            
            {currentUser.role === 'admin' && (activeTab === 'approvals' || activeTab === 'users' || activeTab === 'orders' || activeTab === 'withdrawals') && (
              <AdminDashboard 
                activeTab={activeTab === 'approvals' ? 'sites' : activeTab as any}
                listings={listings} 
                updateStatus={updateListingStatus} 
                orders={orders}
                updateOrderStatus={updateOrderStatus}
                users={allUsers.filter(u => u.role !== 'admin')}
                updateUserApproval={updateUserApproval}
                rejectUser={rejectUser}
                withdrawals={withdrawals}
                updateWithdrawalStatus={updateWithdrawalStatus}
                deleteListing={deleteListingById}
              />
            )}
            
            {currentUser.role === 'buyer' && (activeTab === 'marketplace' || activeTab === 'orders') && (
              <BuyerMarketplace 
                listings={listings.filter(l => l.status === 'approved')}
                currentUser={currentUser}
                createOrder={createOrder}
                orders={orders.filter(o => o.buyerId === currentUser.id)}
                activeTab={activeTab}
                updateOrderStatus={updateOrderStatus}
                users={allUsers}
              />
            )}

            {/* Placeholder for unimplemented tabs */}
            {activeTab === 'settings' && (
              <ProfileManagement 
                currentUser={currentUser} 
                onUpdateProfile={updateUserProfile} 
              />
            )}

            {((currentUser.role === 'seller' && activeTab !== 'dashboard' && activeTab !== 'orders' && activeTab !== 'earnings' && activeTab !== 'settings') ||
              (currentUser.role === 'buyer' && activeTab !== 'marketplace' && activeTab !== 'orders' && activeTab !== 'settings') ||
              (currentUser.role === 'admin' && activeTab !== 'approvals' && activeTab !== 'users' && activeTab !== 'settings')) && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center h-[500px] flex flex-col items-center justify-center">
                 <h2 className="text-2xl font-bold text-slate-800 mb-2 capitalize">{activeTab.replace('-', ' ')}</h2>
                 <p className="text-slate-500">This section is currently under construction.</p>
              </div>
            )}
          </main>
        </div>
      )}

      <Footer onNavigatePublic={(view) => {
        if (!currentUser) {
          setPublicView(view);
          setShowAuth(false);
        } else {
          // simple handling for logged in users, we can just logout and go there or show it.
          // The prompt says make buttons working, so let's log out if they click a footer link that is for public, 
          // or ideally just set it if we wanted to support public views while logged in but App.tsx structure shows publicView ONLY when !currentUser.
          // Wait, actually earlier logic says:
          if (view === 'marketplace' && currentUser.role === 'buyer') {
             setActiveTab('marketplace');
             return;
          }
          // Default fallback: just open it by logging out, or maybe we can just redirect if we had real routes.
          logout();
          setPublicView(view);
        }
      }} />
    </div>
  )
}
