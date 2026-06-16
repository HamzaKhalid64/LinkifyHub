import { Cookie, ShieldCheck, Settings, Info, ArrowRight } from 'lucide-react';

export default function CookiePolicy() {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">Cookie Policy</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          How we use cookies on our platform.
        </p>
        <p className="text-slate-400 mt-4 text-sm tracking-wide uppercase">Last updated: May 2026</p>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 py-16 space-y-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p className="text-slate-700 leading-relaxed mb-6">
            This Cookie Policy explains what cookies are, how we use them on our link building platform, and how you can manage your cookie preferences.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2 flex items-center gap-2">
            1. What Are Cookies?
          </h2>
          <p className="text-slate-600 mb-4">
            Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, maintain your session, and collect usage data to improve performance.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">2. Types of Cookies We Use</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0" /> <strong>Essential cookies</strong> — required for the platform to function. Cannot be disabled.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0" /> <strong>Functional cookies</strong> — remember your preferences and settings.</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0" /> <strong>Analytics cookies</strong> — help us understand how users interact with the platform (anonymised).</li>
            <li className="flex items-start gap-2 text-slate-700"><ArrowRight className="w-5 h-5 text-blue-500 shrink-0" /> <strong>Consent cookies</strong> — store your cookie consent choices.</li>
          </ul>
          <div className="flex items-start gap-3 bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5 text-emerald-600" />
            <p className="text-sm font-medium">We do NOT use advertising or third-party tracking cookies. Your browsing activity is never shared with ad networks.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">3. Cookie Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700 border-b border-slate-200">
                  <th className="p-4 font-semibold w-1/4">Cookie Name</th>
                  <th className="p-4 font-semibold w-1/6">Type</th>
                  <th className="p-4 font-semibold">Purpose</th>
                  <th className="p-4 font-semibold w-1/6">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">session_id</td>
                  <td className="p-4 text-slate-600"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-semibold flex w-fit">Essential</span></td>
                  <td className="p-4 text-slate-600">Maintains your login session securely across pages.</td>
                  <td className="p-4 text-slate-500">Session</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">csrf_token</td>
                  <td className="p-4 text-slate-600"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-semibold flex w-fit">Essential</span></td>
                  <td className="p-4 text-slate-600">Protects against cross-site request forgery attacks.</td>
                  <td className="p-4 text-slate-500">Session</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">user_prefs</td>
                  <td className="p-4 text-slate-600"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs font-semibold flex w-fit">Functional</span></td>
                  <td className="p-4 text-slate-600">Stores your dashboard preferences (language, layout).</td>
                  <td className="p-4 text-slate-500">1 year</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">_analytics</td>
                  <td className="p-4 text-slate-600"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-xs font-semibold flex w-fit">Analytics</span></td>
                  <td className="p-4 text-slate-600">Tracks anonymised usage data to improve the platform.</td>
                  <td className="p-4 text-slate-500">2 years</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">utm_source</td>
                  <td className="p-4 text-slate-600"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md text-xs font-semibold flex w-fit">Analytics</span></td>
                  <td className="p-4 text-slate-600">Records traffic source for internal reporting only.</td>
                  <td className="p-4 text-slate-500">30 days</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">consent_v1</td>
                  <td className="p-4 text-slate-600"><span className="bg-slate-200 text-slate-700 px-2 py-1 rounded-md text-xs font-semibold flex w-fit">Consent</span></td>
                  <td className="p-4 text-slate-600">Stores your cookie consent choice.</td>
                  <td className="p-4 text-slate-500">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-blue-600" /> 4. Managing Cookies</h2>
            <p className="text-slate-600 mb-4 text-sm mt-2">You can control and manage cookies in your browser settings. Most browsers allow you to:</p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> View and delete stored cookies.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Block cookies from specific or all websites.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Receive notifications when a cookie is set.</li>
            </ul>
            <p className="text-slate-500 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
              Disabling essential cookies will prevent you from logging in and using core platform features. Functional and analytics cookies can be disabled without affecting core functionality.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Cookie className="w-5 h-5 text-amber-600" /> 5. Cookie Consent</h2>
            <p className="text-slate-600 mb-4 text-sm mt-2">
              When you first visit the platform, you will be shown a cookie consent banner. By clicking "Accept All", you consent to all cookie categories. You may update your preferences at any time via the cookie settings link in the footer.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8 flex items-center gap-2"><Info className="w-5 h-5 text-purple-600" /> 6. Third-Party Cookies</h2>
            <p className="text-slate-600 mb-4 text-sm mt-2">We use the following third-party services which may set their own cookies:</p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Payment processors (Stripe / PayPal) — for secure transaction handling.</li>
              <li className="flex items-start gap-2 text-slate-700 text-sm"><ArrowRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Analytics provider — for anonymised usage statistics.</li>
            </ul>
            <p className="text-slate-500 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
              These third parties operate under their own privacy and cookie policies, which we encourage you to review.
            </p>
          </div>
        </div>

        <div className="bg-slate-100 p-8 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
          <h3 className="font-semibold text-slate-900 mb-1">Questions or concerns?</h3>
          <p className="text-slate-600 text-sm">Contact us at <a href="mailto:support@linkifyhub.com" className="text-blue-600 hover:underline">support@linkifyhub.com</a> — we respond within 48 hours.</p>
        </div>

      </div>
    </div>
  );
}
