import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';
import { api } from '../services/api';

export const Monitoring: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.getMonitoring().then(setData);
  }, []);

  if (!data) return <div className="p-8 text-center text-secondary font-bold">Loading Monitoring...</div>;

  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-2">Live Monitoring</h1>
        <p className="text-secondary text-base md:text-lg lg:text-xl max-w-2xl">Real-time risk assessment for your active gig route. Data updated every 30 seconds.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Map View Widget (Large) */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl shadow-[0_8px_24px_rgba(25,27,35,0.06)] overflow-hidden relative min-h-[400px] lg:min-h-[500px] group">
          <div className="absolute inset-0">
            <img 
              alt="Map View" 
              className="w-full h-full object-cover opacity-60 transition-transform duration-[10s] group-hover:scale-110" 
              src="https://picsum.photos/seed/london-map/1600/1000"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Map Overlays */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex flex-col gap-3">
            <div className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center gap-4 shadow-lg border border-white/20">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Icons.CloudRain className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-secondary">Atmospheric</p>
                <p className="font-headline font-bold text-on-surface text-sm md:text-base">Heavy Rain, 22°C</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10">
            <div className="bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border border-white/20 max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-on-surface tracking-widest uppercase">Live Tracking</span>
              </div>
              <p className="text-xs md:text-sm text-secondary leading-relaxed">
                Central London Segment<br/>
                <span className="text-on-surface font-bold">Route Coverage: 88%</span>
              </p>
            </div>
          </div>

          {/* Live Indicators on Map */}
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-2xl border-2 border-white">
                <Icons.Zap className="text-white w-5 h-5 fill-white" />
              </div>
              <div className="absolute inset-0 w-10 h-10 bg-primary rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        </div>

        {/* Risk Metrics Side Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Current Score */}
          <div className="luminous-gradient p-8 rounded-3xl text-on-primary relative overflow-hidden flex-1 flex flex-col justify-center shadow-xl">
            <div className="relative z-10">
              <h3 className="font-headline font-bold text-xl mb-1">Safety Index</h3>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-7xl font-headline font-extrabold tracking-tighter">{data.safetyIndex}</span>
                <span className="text-xl opacity-80 font-bold">/100</span>
              </div>
              <p className="mt-6 text-sm md:text-base font-medium leading-relaxed opacity-90">
                Your profile is currently within the <span className="font-bold">"Stable Sanctuary"</span> threshold. Premium protected.
              </p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              icon={<Icons.Search />} 
              label="Visibility" 
              value={data.visibility} 
              color="secondary"
            />
            <StatCard 
              icon={<Icons.TrendingUp />} 
              label="Traffic" 
              value={data.traffic} 
              color="tertiary"
            />
          </div>
        </div>

        {/* AI Risk Insights */}
        <div className="lg:col-span-12">
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-transparent hover:border-primary/10 transition-all">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Icons.Brain className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-bold text-2xl text-on-surface tracking-tight">AI Risk Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Predictive Analysis</p>
                <h4 className="font-bold text-on-surface text-lg">Traffic Density Spike</h4>
                <p className="text-sm text-secondary leading-relaxed font-medium">Model predicts a 15% increase in traffic density on your current route within 30 minutes. Premium coverage for "Delay Protection" is now active.</p>
              </div>
              <div className="space-y-3 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Safety Optimization</p>
                <h4 className="font-bold text-emerald-900 text-lg">Safe Zone Bonus</h4>
                <p className="text-sm text-emerald-800/80 leading-relaxed font-medium">You are currently in a "Safe Zone" (historically low accident rate). Your safety index bonus has been boosted by 5%.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Risk Triggers */}
        <div className="lg:col-span-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">Active Risk Triggers</h2>
            <div className="flex items-center gap-2 px-4 py-2 bg-error-container text-error text-xs font-bold rounded-full shadow-sm">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
              {data.triggers.length} DETECTED
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.triggers.map((trigger: any) => {
              const Icon = (Icons as any)[trigger.icon];
              return (
                <RiskTriggerCard 
                  key={trigger.id}
                  icon={Icon ? <Icon /> : <Icons.AlertTriangle />}
                  title={trigger.title}
                  desc={trigger.desc}
                  progress={trigger.progress}
                  type={trigger.type}
                  color={trigger.color}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className="bg-surface-container-low p-6 rounded-3xl border border-transparent hover:border-primary/10 transition-all group">
    <div className={`mb-3 transition-transform group-hover:scale-110 ${color === 'tertiary' ? 'text-tertiary' : 'text-secondary'}`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
    </div>
    <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{label}</p>
    <p className="font-headline font-bold text-xl text-on-surface mt-1">{value}</p>
  </div>
);

interface RiskTriggerCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  progress: number;
  type: string;
  color: string;
}

const RiskTriggerCard: React.FC<RiskTriggerCardProps> = ({ icon, title, desc, progress, type, color }) => (
  <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
    <div className="flex justify-between items-start mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        color === 'tertiary' ? 'bg-tertiary-fixed text-tertiary' : 
        color === 'error' ? 'bg-error-container text-error' : 'bg-primary/10 text-primary'
      }`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      </div>
      <span className="text-[10px] font-bold bg-surface-container-highest px-3 py-1 rounded-full text-secondary">{type}</span>
    </div>
    <div>
      <h3 className="font-headline font-bold text-xl mb-2 text-on-surface">{title}</h3>
      <p className="text-sm text-secondary leading-relaxed mb-4">{desc}</p>
      <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${
          color === 'tertiary' ? 'bg-tertiary' : 
          color === 'error' ? 'bg-error' : 'bg-primary'
        }`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  </div>
);
