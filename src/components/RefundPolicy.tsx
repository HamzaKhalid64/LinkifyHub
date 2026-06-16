import React from 'react';
import { ShieldAlert, RefreshCcw, DollarSign, Scale, ArrowRight } from 'lucide-react';

export default function RefundPolicy() {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Refund Protocol</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Internal process for handling refund requests.
        </p>
        <p className="text-slate-400 mt-4 text-sm tracking-wide uppercase">Last updated: May 2026</p>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 py-16 space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-700 leading-relaxed mb-6">
            This document defines the internal step-by-step protocol followed by the platform team when a refund request is received. It complements the public-facing Refund Policy.
          </p>
          
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">1. Refund Request Intake</h2>
          <p className="text-slate-600 mb-4">All refund requests must be submitted via the official support channel with the following mandatory information:</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-slate-700"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" /> Order ID and date of placement.</li>
            <li className="flex items-start gap-2 text-slate-700"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" /> Buyer account email.</li>
            <li className="flex items-start gap-2 text-slate-700"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" /> Reason for refund (with supporting screenshots or evidence where applicable).</li>
            <li className="flex items-start gap-2 text-slate-700"><CheckIcon className="w-5 h-5 text-emerald-500 shrink-0" /> Preferred resolution: refund, credit, or replacement.</li>
          </ul>
          <p className="text-amber-600 bg-amber-50 p-4 rounded-xl text-sm font-medium border border-amber-200">
            Requests missing Order ID or reason will be placed on hold until complete information is received.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">2. Step-by-Step Refund Process</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <th className="p-4 font-semibold w-1/4">Step / Owner</th>
                  <th className="p-4 font-semibold">Action</th>
                  <th className="p-4 font-semibold w-1/6">SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">1. Request Received<br/><span className="text-slate-500">Support Team</span></td>
                  <td className="p-4 text-slate-600">Log the request in the dispute management system. Assign a unique Dispute ID. Acknowledge receipt to the buyer within 24 hours.</td>
                  <td className="p-4 text-slate-500">Within 24 hrs</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">2. Eligibility Check<br/><span className="text-slate-500">Support Team</span></td>
                  <td className="p-4 text-slate-600">Verify request against Refund Policy criteria: published status, anchor text accuracy, metric misrepresentation, or duplicate order.</td>
                  <td className="p-4 text-slate-500">Within 48 hrs</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">3. Seller Notification<br/><span className="text-slate-500">Support Team</span></td>
                  <td className="p-4 text-slate-600">Notify the seller of the dispute. Request their response and any counter-evidence (e.g., publication URL, screenshots).</td>
                  <td className="p-4 text-slate-500">Within 48 hrs</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">4. Seller Response<br/><span className="text-slate-500">Seller</span></td>
                  <td className="p-4 text-slate-600">Seller must respond with evidence or acknowledgement. Failure to respond within the window is treated as acceptance of the refund claim.</td>
                  <td className="p-4 text-slate-500">3 business days</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">5. Decision<br/><span className="text-slate-500">Platform Admin</span></td>
                  <td className="p-4 text-slate-600">Review all evidence. Issue a decision: full refund, partial refund, credit, replacement, or rejection. Notify both parties.</td>
                  <td className="p-4 text-slate-500">5 business days</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">6. Refund Execution<br/><span className="text-slate-500">Finance Team</span></td>
                  <td className="p-4 text-slate-600">Process approved refund to buyer's original payment method. Initiate seller recovery or deduct from next payout.</td>
                  <td className="p-4 text-slate-500">7–10 business days</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">7. Case Closure<br/><span className="text-slate-500">Support Team</span></td>
                  <td className="p-4 text-slate-600">Mark dispute as resolved. Update platform records. Issue closure confirmation to both buyer and seller.</td>
                  <td className="p-4 text-slate-500">Within 24 hrs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Scale className="w-5 h-5 text-blue-600" /> 3. Escalation Matrix</h2>
            <p className="text-slate-600 mb-4 text-sm mt-2">If either party disputes the decision:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Either party may request escalation within 5 days of the initial decision.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Escalated cases are reviewed by a senior platform administrator.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> The senior administrator's decision is final and binding on both parties.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Unresolved escalations may be referred to third-party mediation.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><DollarSign className="w-5 h-5 text-emerald-600" /> 4. Seller Recovery Process</h2>
            <p className="text-slate-600 mb-4 text-sm mt-2">When a refund has been paid to a buyer and seller recovery is required:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Seller is notified of the recovery amount via email.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> If the seller has a pending payout, the refund amount is deducted automatically.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> If no pending payout exists, the seller has 7 business days to transfer the amount.</li>
              <li className="flex items-start gap-2 text-red-700 font-medium text-sm"><CrossIcon /> Non-payment by the seller after 7 days will result in account suspension and possible legal action.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-2">5. Refund Decision Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <OutcomeCard icon={<CheckIcon className="w-5 h-5 text-emerald-500" />} title="Full refund" desc="Order not delivered, metrics heavily misrepresented, or duplicate order confirmed." />
            <OutcomeCard icon={<CheckIcon className="w-5 h-5 text-emerald-500" />} title="Partial refund" desc="Partial delivery or minor discrepancy in agreed specs resolved." />
            <OutcomeCard icon={<CheckIcon className="w-5 h-5 text-emerald-500" />} title="Credit" desc="Buyer prefers platform credit over cash refund." />
            <OutcomeCard icon={<CheckIcon className="w-5 h-5 text-emerald-500" />} title="Replacement" desc="Buyer accepts a comparable link placement on a different site." />
            <OutcomeCard icon={<CrossIcon className="w-5 h-5 text-red-500" />} title="Rejected" desc="Order was fulfilled correctly per agreed specifications." />
          </div>
        </div>

        <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">6. Record Keeping</h2>
          <p className="text-slate-600 mb-4 text-sm">All refund cases must be documented with:</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Dispute ID, buyer and seller account IDs, and order details.</li>
            <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Timeline of all communications and evidence submitted.</li>
            <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Final decision, rationale, and outcome.</li>
            <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowIcon /> Records are retained for a minimum of 3 years for audit and compliance purposes.</li>
          </ul>

          <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 text-center">
            <h3 className="font-semibold text-slate-900 mb-1">Questions or concerns?</h3>
            <p className="text-slate-600 text-sm">Contact us at <a href="mailto:admin@yourplatform.com" className="text-blue-600 hover:underline">admin@linkifyhub.com</a> — we respond within 48 hours.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ArrowIcon() {
  return <ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
}

function OutcomeCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
      <div className="mt-0.5">{icon}</div>
      <div>
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <p className="text-slate-600 text-sm mt-1">{desc}</p>
      </div>
    </div>
  )
}
