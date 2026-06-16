import React, { useState } from 'react';
import { User } from '../types';
import { User as UserIcon, Save, MapPin, Phone, Briefcase, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileManagementProps {
  currentUser: User;
  onUpdateProfile: (updatedUser: User) => void;
}

export default function ProfileManagement({ currentUser, onUpdateProfile }: ProfileManagementProps) {
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    locationAddress: currentUser.locationAddress || '',
    phoneNumber: currentUser.phoneNumber || '',
    businessType: currentUser.businessType || '',
    budget: currentUser.budget || ''
  });
  
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      ...formData
    });
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-3xl font-display font-medium tracking-tight text-slate-900 flex items-center gap-3">
            <UserIcon className="w-8 h-8 text-blue-600" />
            Profile Management
          </h1>
          <p className="text-slate-500 mt-1">Update your account details and business information.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  required
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email <span className="text-slate-400 font-normal">(Cannot be changed)</span></label>
              <input 
                type="text" 
                disabled
                value={currentUser.email} 
                className="w-full border border-slate-200 bg-slate-50 text-slate-500 rounded-xl px-4 py-2.5 outline-none cursor-not-allowed" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Company Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  value={formData.locationAddress} 
                  onChange={e => setFormData({...formData, locationAddress: e.target.value})}
                  className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="123 Business St, City"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Phone className="w-4 h-4" />
                </div>
                <input 
                  type="tel" 
                  value={formData.phoneNumber} 
                  onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
                  className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" 
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Business Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Briefcase className="w-4 h-4" />
                </div>
                <select 
                  value={formData.businessType} 
                  onChange={e => setFormData({...formData, businessType: e.target.value})}
                  className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                >
                  <option value="">Select a business type...</option>
                  <option value="agency">Agency</option>
                  <option value="brand">Brand / In-house</option>
                  <option value="freelancer">Freelancer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            {currentUser.role === 'buyer' && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Monthly Traffic Building Budget</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <select 
                    value={formData.budget} 
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    <option value="">Select a range...</option>
                    <option value="<1000">&lt; $1,000</option>
                    <option value="1000-5000">$1,000 - $5,000</option>
                    <option value="5000-10000">$5,000 - $10,000</option>
                    <option value="10000+">$10,000+</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
            <button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
            {isSuccess && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald-600 font-medium text-sm flex items-center gap-1.5"
              >
                Profile updated successfully!
              </motion.span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
