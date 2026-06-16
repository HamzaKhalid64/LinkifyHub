import { ArrowRight, Scale, ShieldAlert, CheckCircle2, Gavel, MessagesSquare } from 'lucide-react';

export default function DisputeResolution() {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center border-b-4 border-amber-500">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Dispute Resolution</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Our safe transaction guarantee and dispute handling process.
        </p>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 py-16 space-y-12">
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">1. How Disputes Work</h2>
              <p className="text-slate-500 text-sm">A fair and transparent mediation process.</p>
            </div>
          </div>
          
          <p className="text-slate-700 leading-relaxed mb-6">
            We hold funds securely in escrow to protect both Buyers and Sellers. If an issue arises with an order, a Dispute can be raised. We encourage both parties to communicate and resolve the issue amicably before our administrative team steps in.
          </p>

          <h3 className="font-semibold text-slate-900 mb-3">Valid Reasons for a Dispute</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500" /> Content not published</p>
            </div>
            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500" /> Post removed prematurely</p>
            </div>
            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500" /> Wrong anchor text / URL</p>
            </div>
            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700 flex items-center gap-2"><ArrowRight className="w-4 h-4 text-amber-500" /> Site metrics severely misrepresented</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative overflow-hidden">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">2. The Resolution Timeline</h2>
          
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200">
            
            {/* Step 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <MessagesSquare className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900">Initiate Discussion</h4>
                <p className="text-sm text-slate-600 mt-1">The offended party opens a dispute ticket. Communication begins directly on the order page.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-amber-100 text-amber-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900">Resolution Window (72 hours)</h4>
                <p className="text-sm text-slate-600 mt-1">Both sides have 72 hours to mutually resolve the issue, upload corrections, or agree on a cancellation.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Gavel className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900">Escalation to Admin</h4>
                <p className="text-sm text-slate-600 mt-1">If no agreement is reached, the dispute is escalated to an Admin for mandatory arbitration.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-semibold text-slate-900">Final Verdict</h4>
                <p className="text-sm text-slate-600 mt-1">Admin reviews evidence and makes a final, binding decision: Refund or Payout.</p>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">3. Admin Arbitration Rulings</h2>
          <p className="text-slate-600 mb-6 text-sm">When Admins review a dispute, their rulings are final and abide by the following constraints:</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-1"><ShieldAlert className="w-5 h-5 text-slate-400" /></div>
              <div>
                <strong className="text-slate-900 block mb-1">If the Seller is at fault:</strong>
                <p className="text-sm text-slate-600">The Buyer will receive a full refund, and a penalty strike may be added to the Seller's account. Three strikes will result in a permanent ban.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-1"><CheckCircle2 className="w-5 h-5 text-emerald-500" /></div>
              <div>
                <strong className="text-slate-900 block mb-1">If the Order was properly fulfilled:</strong>
                <p className="text-sm text-slate-600">The dispute is declined, and the funds are released from Escrow to the Seller.</p>
              </div>
            </li>
          </ul>

          <div className="mt-8 p-4 bg-white rounded-xl border border-slate-200 flex flex-col items-center text-center">
            <h3 className="font-semibold text-slate-900 mb-1">Need to open a dispute?</h3>
            <p className="text-slate-600 text-sm">Navigate to the specific order page in your Dashboard and click "Report Issue/Dispute".</p>
          </div>
        </div>

      </div>
    </div>
  );
}
