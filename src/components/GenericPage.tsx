import { FileText } from 'lucide-react';

export default function GenericPage({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex-grow flex flex-col items-center bg-slate-50 w-full animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 w-full py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">{title}</h1>
      </div>

      <div className="max-w-4xl w-full mx-auto px-4 py-16">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center min-h-[400px] justify-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">{title} is under construction</h2>
          <p className="text-slate-500 max-w-lg mx-auto">{description}</p>
        </div>
      </div>
    </div>
  );
}
