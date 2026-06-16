import { motion } from 'motion/react';
import { ShieldCheck, Search, CheckCircle2, Lock } from 'lucide-react';

export default function VerificationProcess() {
  const steps = [
    {
      icon: Search,
      title: "Initial Screening",
      description: "Every website undergoes an automated technical health check using industry-standard tools (Ahrefs, Semrush, Moz) to verify DA, DR, and traffic metrics.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: ShieldCheck,
      title: "Manual Review",
      description: "Our quality assurance team manually visits the site to ensure real engagement, authentic content, and absence of PBN footprints or link farm indicators.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Lock,
      title: "Ownership Verification",
      description: "Sellers must prove ownership or editorial access through email verification from the domain or file upload methods.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: CheckCircle2,
      title: "Final Approval",
      description: "Once all criteria are met, the site is approved and listed in the marketplace with a 'Verified' badge.",
      color: "bg-emerald-100 text-emerald-600"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white pt-24 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
           <ShieldCheck className="w-64 h-64" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-slate-100 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
            <ShieldCheck className="w-4 h-4" /> Trusted Platform
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">Our Verification Process</h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            We maintain the highest standards of quality. Learn how we manually verify every website and seller before they enter our marketplace.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto w-full px-4 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[50%] left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2"></div>
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${step.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                      <span className="text-sm font-black text-slate-300">0{index + 1}</span>
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
        
        <div className="mt-20 bg-blue-50 border border-blue-100 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Zero Tolerance Policy</h2>
          <p className="text-slate-600 mb-0">
            We strictly do not allow link farms, private blog networks (PBNs), or hacked sites. 
            Any seller found violating our quality guidelines is permanently banned, and affected buyers are fully refunded.
          </p>
        </div>

      </div>
    </div>
  );
}
