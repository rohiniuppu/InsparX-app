import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';
import { api } from '../services/api';

export const Claims: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.getClaims().then(setData);
  }, []);

  if (!data) return <div className="p-8 text-center text-secondary font-bold">Loading Claims...</div>;

  return (
    <div className="space-y-8">
      <section className="mb-10">
        <h1 className="font-headline font-extrabold text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight mb-2">Zero-Touch Claims</h1>
        <p className="text-secondary text-base md:text-lg">InsparX AI monitors environmental triggers 24/7. Claims are initiated and processed without you lifting a finger.</p>
      </section>

      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 mb-8 flex items-center gap-4">
        <div className="bg-primary/10 p-3 rounded-xl text-primary">
          <Icons.Zap className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-on-surface text-sm">AI Prediction Active</h4>
          <p className="text-xs text-secondary">Based on current telemetry, there is a 12% probability of a rain-related trigger in the next 4 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-surface-container-low p-8 rounded-3xl flex flex-col justify-between h-48 shadow-sm border border-transparent hover:border-primary/10 transition-all">
          <Icons.Zap className="text-primary w-10 h-10" />
          <div>
            <div className="text-3xl md:text-4xl font-headline font-extrabold text-primary tracking-tighter">{data.autoProcessedRate}</div>
            <div className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mt-1">Auto-processed</div>
          </div>
        </div>
        <div className="luminous-gradient p-8 rounded-3xl flex flex-col justify-between h-48 text-on-primary shadow-xl">
          <Icons.DollarSign className="w-10 h-10" />
          <div>
            <div className="text-3xl md:text-4xl font-headline font-extrabold tracking-tighter">{data.paidThisMonth}</div>
            <div className="text-sm font-bold opacity-80 uppercase tracking-widest mt-1">Paid this month</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline font-bold text-xl flex items-center gap-3">
            Recent Triggers
            <span className="bg-primary/10 text-primary text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-bold">Live Feed</span>
          </h3>
          <button className="text-sm font-bold text-primary hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.history.map((claim: any) => {
            const Icon = (Icons as any)[claim.icon];
            return (
              <ClaimItem 
                key={claim.id}
                icon={Icon ? <Icon /> : <Icons.AlertTriangle />}
                title={claim.title}
                status={claim.status}
                detail={claim.detail}
                amount={claim.amount}
                color={claim.color}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-16 relative h-64 rounded-3xl overflow-hidden group shadow-2xl">
        <img 
          className="w-full h-full object-cover transition-transform duration-[15s] group-hover:scale-125" 
          src="https://picsum.photos/seed/weather-data/1200/600" 
          alt="Automation"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] p-8 flex flex-col justify-end">
          <div className="text-white font-headline font-extrabold text-2xl md:text-3xl mb-2 tracking-tight">How Automation Works</div>
          <p className="text-white/90 font-medium text-sm md:text-base max-w-xl leading-relaxed">
            Our sensors track local weather events in real-time. If a policy trigger is met, we start your claim instantly, ensuring you never miss a payout due to environmental risks.
          </p>
        </div>
      </div>
    </div>
  );
};

interface ClaimItemProps {
  icon: React.ReactNode;
  title: string;
  status: string;
  detail: string;
  amount: string;
  color: string;
}

const ClaimItem: React.FC<ClaimItemProps> = ({ icon, title, status, detail, amount, color }) => (
  <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-[0_8px_24px_rgba(25,27,35,0.04)] flex items-center justify-between group transition-all">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
        color === 'green' ? 'bg-green-50 text-green-600' : 
        color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
      </div>
      <div>
        <div className="font-headline font-bold text-on-surface text-base">{title}</div>
        <div className="flex items-center gap-2 mt-1">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
            color === 'green' ? 'bg-green-100 text-green-700' : 
            color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
          }`}>{status}</span>
          <span className="text-[11px] text-on-surface-variant font-medium">{detail}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <div className="font-headline font-extrabold text-lg text-on-surface">{amount}</div>
      <Icons.ChevronRight className="text-outline-variant group-hover:text-primary transition-colors w-4 h-4 ml-auto" />
    </div>
  </div>
);
