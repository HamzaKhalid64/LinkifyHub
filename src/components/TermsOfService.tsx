import { ArrowRight, CheckCircle2, XCircle, Shield, Scale, Gavel, FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Terms of Service</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Please read carefully before using the platform.
        </p>
        <p className="text-slate-400 mt-4 text-sm tracking-wide uppercase">Last updated: May 2026</p>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 py-16 space-y-12">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-700 leading-relaxed mb-6 font-medium">
            By accessing or using our link building marketplace, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the platform immediately.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2">
            1. Definitions
          </h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> <strong>"Platform"</strong> refers to our link building marketplace website and services.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> <strong>"Buyer"</strong> refers to any individual or business purchasing link placements through the platform.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> <strong>"Seller / Publisher"</strong> refers to any individual or business listing their website for link placements.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> <strong>"Order"</strong> refers to a confirmed link placement transaction between a Buyer and Publisher via the platform.</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">2. Account Registration</h2>
            <p className="text-slate-600 mb-4 text-sm">To use the platform, you must register an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your credentials.</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You must be at least 18 years old to register.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> One account per individual or business entity is permitted.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> You are responsible for all activity that occurs under your account.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Sharing account credentials with third parties is strictly prohibited.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">3. Buyer Obligations</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Buyers must provide accurate target URLs, anchor text, and content guidelines at the time of order.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Buyers must not request placements that promote illegal, harmful, or deceptive content.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Buyers acknowledge that SEO results from link placements are not guaranteed by the platform.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Payment must be completed before an order is processed.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">4. Seller / Publisher Obligations</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Sellers must list only websites they own or have explicit authorization to manage.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Sellers must ensure website metrics (DA, traffic, niche) listed on the platform are accurate and up to date.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Sellers must publish agreed content within the stated delivery timeframe.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> Sellers must keep published links live for a minimum of 12 months from the publication date.</li>
            <li className="flex items-start gap-2 text-slate-700"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Sellers may not accept orders and then publish on a different domain without buyer consent.</li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">5. Platform's Role</h2>
          <p className="text-slate-600 mb-4">The platform acts solely as an intermediary facilitating transactions between Buyers and Sellers. The platform:</p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Holds all payments in escrow until successful delivery is confirmed.</li>
            <li className="flex items-start gap-2 text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Manages disputes between buyers and sellers fairly and impartially.</li>
            <li className="flex items-start gap-2 text-slate-700"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> Releases seller payment only after buyer confirmation or automatic approval after 7 days.</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
             <p className="text-amber-800 text-sm font-medium">The platform is not responsible for the SEO impact, editorial quality, or long-term ranking effects of any link placement.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2 text-red-600">6. Prohibited Activities</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-slate-700"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Using the platform for link schemes that violate Google Webmaster Guidelines.</li>
            <li className="flex items-start gap-2 text-slate-700"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Creating fake reviews, manipulating ratings, or misrepresenting services.</li>
            <li className="flex items-start gap-2 text-slate-700"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Attempting to reverse engineer, scrape, or exploit the platform's systems.</li>
            <li className="flex items-start gap-2 text-slate-700"><XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" /> Circumventing the platform to transact directly with users you discovered through it.</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Scale className="w-5 h-5 text-slate-600" /> 7. Termination</h3>
            <p className="text-slate-600 text-sm">
              The platform reserves the right to suspend or terminate any account at its discretion for violations of these terms, repeated disputes, or fraudulent activity. Pending balances at the time of termination will be handled per the Refund Policy.
            </p>
          </div>
          <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Shield className="w-5 h-5 text-slate-600" /> 8. Limitation of Liability</h3>
            <p className="text-slate-600 text-sm">
              To the maximum extent permitted by law, the platform shall not be liable for any indirect, incidental, or consequential damages arising from the use of this service. Total liability shall not exceed the amount paid by the user in the 30 days preceding the claim.
            </p>
          </div>
          <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Gavel className="w-5 h-5 text-slate-600" /> 9. Governing Law</h3>
            <p className="text-slate-600 text-sm">
              These terms are governed by applicable law. Any disputes shall be resolved through binding arbitration before resorting to litigation.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 p-8 rounded-2xl text-center shadow-md">
          <h3 className="font-semibold text-white mb-2 text-lg">Questions or concerns?</h3>
          <p className="text-blue-100 mb-0">Contact us at <a href="mailto:support@linkifyhub.com" className="text-white font-bold underline hover:text-blue-50 transition-colors">support@linkifyhub.com</a> — we respond within 48 hours.</p>
        </div>

      </div>
    </div>
  );
}
