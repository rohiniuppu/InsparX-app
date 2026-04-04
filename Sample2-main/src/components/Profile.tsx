import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';
import { api } from '../services/api';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-8 text-center text-secondary font-bold">Loading Profile...</div>;

  return (
    <div className="space-y-8">
      <section className="mb-10">
        <h1 className="font-headline font-extrabold text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight mb-2">Your Profile</h1>
        <p className="text-secondary text-base md:text-lg">Manage your personal sanctuary and policy parameters.</p>
      </section>

      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-transparent hover:border-primary/10 transition-all">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
            {profile.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="font-headline font-bold text-2xl text-on-surface">{profile.name || 'InsparX User'}</h2>
            <p className="text-secondary font-medium">{profile.city || 'Location not set'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProfileField label="Date of Birth" value={profile.dob} icon={<Icons.Clock />} />
          <ProfileField label="Gender" value={profile.gender} icon={<Icons.User />} />
          <ProfileField label="Platform" value={profile.platform} icon={<Icons.ShoppingBasket />} />
          <ProfileField label="Work Type" value={profile.workType} icon={<Icons.Zap />} />
          <ProfileField label="Working Hours" value={`${profile.workingHours} hrs/day`} icon={<Icons.Clock />} />
          <ProfileField label="Daily Earnings" value={`₹${profile.dailyEarnings}`} icon={<Icons.DollarSign />} />
        </div>
      </div>

      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
            <Icons.ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900">Policy Active</h4>
            <p className="text-xs text-emerald-700">Your gig protection is live and monitoring risks.</p>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-white px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-200">Verified</span>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
  <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl">
    <div className="text-primary opacity-60">
      {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
    </div>
    <div>
      <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">{label}</p>
      <p className="font-bold text-on-surface">{value || 'Not set'}</p>
    </div>
  </div>
);
