import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';
import { api } from '../services/api';
import { Modal } from './Modal';
import { geminiService, AIPricingResult } from '../services/geminiService';

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [aiPricing, setAiPricing] = useState<AIPricingResult | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [dashboardData, userProfile] = await Promise.all([
        api.getDashboard(),
        api.getProfile()
      ]);
      setData(dashboardData);
      setProfile(userProfile);

      // Trigger AI Dynamic Pricing
      setLoadingAI(true);
      try {
        const aiResult = await geminiService.calculateDynamicPremium(
          dashboardData.premium,
          dashboardData.location,
          dashboardData.triggers,
          userProfile
        );
        setAiPricing(aiResult);
      } catch (err) {
        console.error("AI Pricing failed", err);
      } finally {
        setLoadingAI(false);
      }
    };
    fetchData();
  }, []);

  if (!data) return <div className="p-8 text-center text-secondary font-bold">Loading Dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Weather Alert Banner */}
      <motion.section 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#FFF9E6] p-4 md:p-6 rounded-2xl flex items-center gap-4 animate-pulse-subtle border border-amber-200/50"
      >
        <div className="bg-amber-100 p-3 rounded-full text-amber-700 shrink-0">
          <Icons.CloudRain className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-headline font-bold text-amber-900 text-base md:text-lg">Weather Alert</h4>
          <p className="text-sm text-amber-800/80 leading-tight">{data.weatherAlert}</p>
        </div>
        <Icons.AlertTriangle className="text-amber-400 w-6 h-6 shrink-0" />
      </motion.section>

      {/* Bento Grid Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Risk Score Dial Card */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-[0_8px_24px_rgba(25,27,35,0.04)] flex flex-col items-center justify-center text-center relative overflow-hidden lg:col-span-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
          <h3 className="font-headline font-bold text-secondary mb-6 self-start">Risk Score</h3>
          <div className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-surface-container" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-emerald-500" cx="50%" cy="50%" fill="transparent" r="42%" stroke="currentColor" strokeDasharray="264" strokeDashoffset="180" strokeLinecap="round" strokeWidth="12"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl md:text-4xl font-headline font-extrabold text-emerald-600">{data.riskScore}</span>
              <span className="text-[10px] md:text-xs font-bold text-secondary uppercase tracking-widest mt-1">Status</span>
            </div>
          </div>
          <p className="mt-6 text-sm text-on-surface-variant font-medium max-w-[200px]">Your activity metrics are within the optimal safety threshold.</p>
          <button 
            onClick={() => setActiveModal('risk_details')}
            className="mt-4 text-xs font-bold text-primary hover:underline"
          >
            View Details
          </button>
        </div>

        {/* Premium Card */}
        <div className="luminous-gradient text-on-primary rounded-3xl p-6 md:p-8 shadow-[0_8px_24px_rgba(0,63,177,0.15)] flex flex-col justify-between overflow-hidden relative md:col-span-1 lg:col-span-2">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Icons.ShieldCheck className="w-24 h-24 md:w-32 md:h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <p className="text-primary-container text-xs md:text-sm font-bold tracking-widest uppercase">Dynamic Premium Management</p>
              {loadingAI && <Icons.Loader2 className="w-4 h-4 animate-spin text-primary-container" />}
            </div>
            <h2 className="font-headline font-extrabold text-4xl md:text-5xl lg:text-6xl mt-2 tracking-tight">Current Premium</h2>
          </div>
          <div className="mt-8 flex items-baseline gap-2 relative z-10">
            <span className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter">
              ₹{aiPricing ? aiPricing.recommendedPremium : data.premium}
            </span>
            <span className="text-primary-container font-bold text-lg">/ week</span>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center relative z-10">
            <div className="flex flex-col">
              <span className="text-sm font-medium opacity-90">
                {aiPricing ? aiPricing.adjustmentReason : data.premiumReasoning}
              </span>
              {aiPricing && (
                <button 
                  onClick={() => setActiveModal('ai_pricing')}
                  className="text-[10px] font-bold text-white/70 hover:text-white mt-1 flex items-center gap-1 uppercase tracking-widest"
                >
                  <Icons.Zap className="w-3 h-3" /> View AI Analysis
                </button>
              )}
            </div>
            <Icons.ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* AI-Driven Risk Triggers Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="font-headline font-bold text-xl text-on-surface">AI-Driven Risk Triggers</h3>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">5 Active Triggers</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.triggers?.map((trigger: any) => {
            const Icon = (Icons as any)[trigger.icon];
            return (
              <div key={trigger.id} className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm border border-transparent hover:border-primary/10 transition-all flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  trigger.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : 
                  trigger.color === 'blue' ? 'bg-blue-100 text-blue-600' : 
                  trigger.color === 'amber' ? 'bg-amber-100 text-amber-600' : 
                  'bg-red-100 text-red-600'
                }`}>
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{trigger.type}</span>
                    <span className={`text-[10px] font-bold ${trigger.impact < 0 ? 'text-emerald-600' : trigger.impact > 0 ? 'text-red-600' : 'text-primary'}`}>
                      {trigger.impact === 0 ? 'COVERAGE+' : (trigger.impact < 0 ? `₹${trigger.impact}` : `+₹${trigger.impact}`)}
                    </span>
                  </div>
                  <h4 className="font-bold text-on-surface text-sm truncate">{trigger.title}</h4>
                  <p className="text-[11px] text-on-surface-variant truncate">{trigger.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Zero-Touch Claim Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="flex items-center gap-6 relative z-10 mb-4 md:mb-0">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Icons.CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-xl">Zero-Touch Claim Detected</h4>
            <p className="text-emerald-50 opacity-90 text-sm mt-1">Heavy rain detected at your location. ₹120 payout initiated automatically.</p>
          </div>
        </div>
        <button 
          onClick={() => setActiveModal('claim_details')}
          className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-emerald-50 transition-colors relative z-10 w-full md:w-auto"
        >
          View Details
        </button>
      </motion.div>

      {/* Quick Actions & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 space-y-4">
          <h3 className="font-headline font-bold text-lg px-1">Policy Management</h3>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <ActionCard 
              icon={<Icons.History />} 
              title="Premium History" 
              desc="Dynamic calculation logs" 
              onClick={() => setActiveModal('premium_history')}
            />
            <ActionCard 
              icon={<Icons.FileText />} 
              title="Policy Documents" 
              desc="Manage active certificates" 
              onClick={() => setActiveModal('policy_docs')}
            />
          </div>
        </section>

        {/* Environmental Insights Card */}
        <section className="lg:col-span-2 space-y-4">
          <h3 className="font-headline font-bold text-lg px-1">Risk Environment</h3>
          <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_4px_12px_rgba(25,27,35,0.03)] overflow-hidden h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Icons.Radar className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-on-surface">Live Telemetry</span>
              </div>
              <span className="text-[10px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full tracking-widest">REAL-TIME</span>
            </div>
            <div className="relative flex-1 min-h-[160px] w-full rounded-2xl overflow-hidden bg-slate-200 group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                src="https://picsum.photos/seed/mumbai-map/1200/600" 
                alt="Risk Map"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-[10px] font-bold opacity-70 tracking-widest uppercase">Current Location</p>
                <p className="font-headline font-bold text-lg">{data.location}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'risk_details'} 
        onClose={() => setActiveModal(null)} 
        title="Risk Score Details"
      >
        <div className="space-y-4">
          <p className="text-sm text-secondary">Your risk score is calculated using real-time telemetry from your active route.</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
              <span className="text-sm font-medium">Driving Safety</span>
              <span className="text-emerald-600 font-bold">Excellent</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
              <span className="text-sm font-medium">Environmental Risk</span>
              <span className="text-emerald-600 font-bold">Low</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
              <span className="text-sm font-medium">Vehicle Health</span>
              <span className="text-emerald-600 font-bold">Optimal</span>
            </div>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'claim_details'} 
        onClose={() => setActiveModal(null)} 
        title="Zero-Touch Claim Details"
      >
        <div className="space-y-6">
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
              <Icons.ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-900">Claim Approved</h4>
              <p className="text-xs text-emerald-700">Payout of ₹120 has been initiated to your linked account.</p>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="font-bold text-on-surface text-sm uppercase tracking-widest">Trigger Breakdown</h5>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                <span className="text-sm font-medium">Event Type</span>
                <span className="text-on-surface font-bold">Severe Rainfall</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                <span className="text-sm font-medium">Duration</span>
                <span className="text-on-surface font-bold">2.5 Hours</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl">
                <span className="text-sm font-medium">Location Precision</span>
                <span className="text-on-surface font-bold">98.4% (GPS Verified)</span>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'ai_pricing'} 
        onClose={() => setActiveModal(null)} 
        title="AI Dynamic Pricing Analysis"
      >
        {aiPricing ? (
          <div className="space-y-6">
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <Icons.Zap className="text-primary w-6 h-6" />
                <h4 className="font-headline font-bold text-primary text-lg">Machine Learning Insights</h4>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                {aiPricing.riskAnalysis}
              </p>
              <div className="p-4 bg-white rounded-xl border border-primary/5">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">AI Recommendation</p>
                <p className="font-headline font-bold text-2xl text-primary">{aiPricing.adjustmentReason}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-on-surface text-sm uppercase tracking-widest">Coverage Suggestions</h5>
              <div className="space-y-2">
                {aiPricing.coverageSuggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                    <Icons.PlusCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium text-on-surface">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icons.Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-secondary font-bold">Generating AI Insights...</p>
          </div>
        )}
      </Modal>

      <Modal 
        isOpen={activeModal === 'premium_history'} 
        onClose={() => setActiveModal(null)} 
        title="Premium History"
      >
        <div className="space-y-4">
          {[
            { date: 'Apr 04', amount: '₹45', status: 'Paid', reasoning: 'Standard rate' },
            { date: 'Mar 28', amount: '₹43', status: 'Paid', reasoning: 'Safe zone discount' },
            { date: 'Mar 21', amount: '₹48', status: 'Paid', reasoning: 'High traffic surge' },
          ].map((log, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-surface-container-low rounded-2xl">
              <div>
                <p className="font-bold text-on-surface">{log.date}</p>
                <p className="text-[10px] text-secondary uppercase font-bold">{log.reasoning}</p>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-primary">{log.amount}</p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{log.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'policy_docs'} 
        onClose={() => setActiveModal(null)} 
        title="Policy Documents"
      >
        <div className="space-y-4">
          {[
            { name: 'Active Policy Certificate', size: '1.2 MB', type: 'PDF' },
            { name: 'Terms & Conditions', size: '0.8 MB', type: 'PDF' },
            { name: 'Claim Guidelines', size: '0.5 MB', type: 'PDF' },
          ].map((doc, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-surface-container-low rounded-2xl group cursor-pointer hover:bg-surface-container-high transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Icons.FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">{doc.name}</p>
                  <p className="text-[10px] text-secondary font-bold uppercase">{doc.size} • {doc.type}</p>
                </div>
              </div>
              <Icons.Download className="w-5 h-5 text-outline group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const ActionCard = ({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-start p-5 bg-surface-container-low hover:bg-surface-container-high transition-all rounded-2xl text-left group w-full border border-transparent hover:border-primary/10"
  >
    <div className="bg-primary/10 p-3 rounded-xl text-primary mb-4 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6 fill-primary/20" })}
    </div>
    <span className="font-headline font-bold text-on-surface text-base">{title}</span>
    <span className="text-xs text-on-surface-variant mt-1 font-medium">{desc}</span>
  </button>
);
