import { ArrowRight, Shield, ShieldAlert, Lock, UserCheck, Eye, Database } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Privacy Policy</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          How we handle and protect your data.
        </p>
        <p className="text-slate-400 mt-4 text-sm tracking-wide uppercase">Last updated: May 2026</p>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 py-16 space-y-12">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-700 leading-relaxed mb-6 font-medium">
            Your privacy is critically important to us. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our platform.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-600" />
            1. Information We Collect
          </h2>
          <p className="text-slate-600 mb-4">We collect information to provide better services to all our users. Information we collect includes:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> <strong>Account Information:</strong> Name, email address, password, and profile details provided during registration.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> <strong>Transaction Data:</strong> Payment details, order history, billing address, and transaction IDs (processed securely via third-party providers).</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> <strong>Usage Information:</strong> Device information, IP addresses, browser type, and platform interactions collected via our essential and functional cookies.</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2">
            <Database className="w-6 h-6 text-emerald-600" />
            2. How We Use Your Information
          </h2>
          <p className="text-slate-600 mb-4">We rely on the collected data to maintain a secure and functional marketplace:</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <h4 className="font-semibold text-slate-900">Platform Operations</h4>
              <p className="text-sm text-slate-600 mt-1">To process orders, disburse payouts, and handle dispute resolutions efficiently.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <h4 className="font-semibold text-slate-900">Communication</h4>
              <p className="text-sm text-slate-600 mt-1">To send order updates, security alerts, and customer support responses.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <h4 className="font-semibold text-slate-900">Security & Fraud Prevention</h4>
              <p className="text-sm text-slate-600 mt-1">To verify seller ownership, deter fraudulent transactions, and enforce our Terms of Service.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
              <h4 className="font-semibold text-slate-900">Platform Improvement</h4>
              <p className="text-sm text-slate-600 mt-1">To analyze usage patterns to optimize user experience and platform functionality.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2"><UserCheck className="w-5 h-5 text-purple-600" /> 3. Data Sharing</h2>
            <p className="text-slate-600 mb-4 text-sm mt-2">We do not sell your personal data. We only share information with:</p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> <strong>Counterparties:</strong> Buyers and Sellers share necessary order details.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> <strong>Service Providers:</strong> Payment processors, hosting, and email delivery services.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> <strong>Legal Obligations:</strong> When legally required by authorities.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2"><Lock className="w-5 h-5 text-amber-600" /> 4. Data Security</h2>
            <p className="text-slate-600 mb-4 text-sm mt-2">
              We implement industry-standard encryption protocols (SSL/TLS) for data in transit and at rest. Access to personal data is strictly limited to authorized personnel only. 
            </p>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <p className="text-amber-800 text-xs font-semibold uppercase tracking-wider mb-1">Your Responsibility</p>
              <p className="text-amber-700 text-sm">Please ensure you use a strong password and do not share your account credentials.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict the processing of your data. You can manage your information from your profile settings or by contacting support.
          </p>
        </div>

        <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
          <h3 className="font-semibold text-slate-900 mb-1">Questions regarding your privacy?</h3>
          <p className="text-slate-600 text-sm">Contact our Data Protection Officer at <a href="mailto:support@linkifyhub.com" className="text-blue-600 hover:underline">support@linkifyhub.com</a>.</p>
        </div>

      </div>
    </div>
  );
}
