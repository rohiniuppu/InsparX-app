import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icons } from './Icons';
import { api } from '../services/api';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    city: '',
    platform: '',
    workType: '',
    workingHours: '',
    dailyEarnings: '',
    locationPermission: false,
    notificationOptIn: false
  });

  const totalSteps = 4;

  useEffect(() => {
    // Autosave whenever formData changes (debounced)
    const timer = setTimeout(() => {
      if (formData.name) {
        api.autosaveProfile(formData);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData]);

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        await api.registerProfile(formData);
        onComplete();
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface">Personal Details</h2>
              <p className="text-secondary text-sm">Let's start with the basics to set up your sanctuary.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Date of Birth</label>
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => updateField('dob', e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Gender</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Male', 'Female', 'Other'].map((g) => (
                    <button
                      key={g}
                      onClick={() => updateField('gender', g)}
                      className={`p-3 rounded-xl text-sm font-bold transition-all ${
                        formData.gender === g 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'bg-surface-container-low text-secondary hover:bg-surface-container-high'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface">Work Details</h2>
              <p className="text-secondary text-sm">Tell us about your gig environment.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">City</label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="e.g. Mumbai"
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Primary Platform</label>
                <select 
                  value={formData.platform}
                  onChange={(e) => updateField('platform', e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary transition-all appearance-none"
                >
                  <option value="">Select Platform</option>
                  <option value="Swiggy">Swiggy</option>
                  <option value="Zomato">Zomato</option>
                  <option value="Uber">Uber</option>
                  <option value="Ola">Ola</option>
                  <option value="Dunzo">Dunzo</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Work Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Part-time', 'Full-Time'].map((t) => (
                    <button
                      key={t}
                      onClick={() => updateField('workType', t)}
                      className={`p-3 rounded-xl text-sm font-bold transition-all ${
                        formData.workType === t 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'bg-surface-container-low text-secondary hover:bg-surface-container-high'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface">Schedule & Earnings</h2>
              <p className="text-secondary text-sm">Help us calculate your dynamic protection.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Working Hours / Day</label>
                <input 
                  type="number" 
                  value={formData.workingHours}
                  onChange={(e) => updateField('workingHours', e.target.value)}
                  placeholder="e.g. 8"
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest pl-1">Avg. Daily Earnings (₹)</label>
                <input 
                  type="number" 
                  value={formData.dailyEarnings}
                  onChange={(e) => updateField('dailyEarnings', e.target.value)}
                  placeholder="e.g. 800"
                  className="w-full bg-surface-container-low border-none rounded-2xl p-4 text-on-surface focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-2xl font-headline font-bold text-on-surface">Permissions</h2>
              <p className="text-secondary text-sm">Enable real-time risk monitoring.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-low p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary">
                    <Icons.MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Location Access</h4>
                    <p className="text-[10px] text-secondary">Required for hyper-local risk detection.</p>
                  </div>
                </div>
                <button 
                  onClick={() => updateField('locationPermission', !formData.locationPermission)}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.locationPermission ? 'bg-primary' : 'bg-outline-variant'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.locationPermission ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
              <div className="bg-surface-container-low p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary">
                    <Icons.Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Notifications</h4>
                    <p className="text-[10px] text-secondary">Instant alerts for weather disruptions.</p>
                  </div>
                </div>
                <button 
                  onClick={() => updateField('notificationOptIn', !formData.notificationOptIn)}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.notificationOptIn ? 'bg-primary' : 'bg-outline-variant'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.notificationOptIn ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col p-6 md:p-12 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white">
            <Icons.Shield className="w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">InsparX</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`h-1 rounded-full transition-all ${s <= step ? 'w-6 bg-primary' : 'w-2 bg-outline-variant'}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="mt-12 flex gap-4">
        {step > 1 && (
          <button 
            onClick={handleBack}
            className="flex-1 bg-surface-container-high text-on-surface py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <Icons.ArrowLeft className="w-5 h-5" />
            Back
          </button>
        )}
        <button 
          onClick={handleNext}
          disabled={loading || (step === 1 && !formData.name)}
          className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Finalizing...' : step === totalSteps ? 'Complete Setup' : 'Continue'}
          {!loading && <Icons.ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
