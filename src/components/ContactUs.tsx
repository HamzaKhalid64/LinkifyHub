import React from 'react';
import { Mail, MessageCircle, HelpCircle, Send } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Contact Us</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          We're here to help. Reach out to our support team through any of the channels below.
        </p>
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 py-16 space-y-16">
        
        {/* Support Channels */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">Support Channels</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-3">Email Support</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li><a href="mailto:support@linkifyhub.com" className="text-blue-600 font-medium hover:underline">support@linkifyhub.com</a></li>
                <li>Response within 24 hours (business days)</li>
                <li>Recommended for detailed queries</li>
              </ul>
            </div>
            
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-3">Live Chat</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>Available Monday – Friday</li>
                <li>9:00 AM – 6:00 PM (PKT)</li>
                <li>Real-time assistance for urgent issues</li>
              </ul>
            </div>

            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-3">Help Center</h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li>Self-service articles available 24/7</li>
                <li>Instant answers to the most common questions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Submit a Support Ticket */}
        <section>
          <div className="border-b pb-2 mb-6 pointer-events-none">
             <h2 className="text-2xl font-bold text-slate-900 inline-block bg-white pr-4">Submit a Support Ticket</h2>
          </div>
          <p className="text-slate-600 mb-8">
            If you prefer written communication, complete the information below and send it to support@linkifyhub.com. Our team will log your request and follow up within one business day.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <form className="divide-y divide-slate-100" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-3">
                <div className="p-4 md:p-6 bg-slate-50 font-semibold text-slate-900 flex items-center">
                  Full Name
                </div>
                <div className="p-4 md:p-6 md:col-span-2">
                  <input type="text" placeholder="Your registered name on LinkifyHub" className="w-full bg-transparent border-0 outline-none text-slate-700 placeholder-slate-400 focus:ring-0" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3">
                <div className="p-4 md:p-6 bg-slate-50 font-semibold text-slate-900 flex items-center">
                  Email Address
                </div>
                <div className="p-4 md:p-6 md:col-span-2">
                  <input type="email" placeholder="The email address linked to your account" className="w-full bg-transparent border-0 outline-none text-slate-700 placeholder-slate-400 focus:ring-0" />
                </div>
              </div>

              <div className="grid md:grid-cols-3">
                <div className="p-4 md:p-6 bg-slate-50 font-semibold text-slate-900 flex items-center">
                  User Type
                </div>
                <div className="p-4 md:p-6 md:col-span-2">
                  <select className="w-full bg-transparent border-0 outline-none text-slate-700 focus:ring-0 appearance-none">
                    <option value="" disabled selected className="text-slate-400">Buyer / Seller / Other</option>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3">
                <div className="p-4 md:p-6 bg-slate-50 font-semibold text-slate-900 flex items-center">
                  Category
                </div>
                <div className="p-4 md:p-6 md:col-span-2">
                  <select className="w-full bg-transparent border-0 outline-none text-slate-700 focus:ring-0 appearance-none">
                    <option value="" disabled selected className="text-slate-400">Order Related / Payment & Billing / Account Issue / Dispute / Other</option>
                    <option value="order">Order Related</option>
                    <option value="payment">Payment & Billing</option>
                    <option value="account">Account Issue</option>
                    <option value="dispute">Dispute</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-slate-50/50 flex justify-end">
                <button type="button" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                  <Send className="w-4 h-4" />
                  Generate Email
                </button>
              </div>
            </form>
          </div>
        </section>

      </div>
    </div>
  );
}
