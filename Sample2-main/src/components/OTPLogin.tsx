import React, { useState } from 'react';
import { Icons } from './Icons';
import { motion } from 'motion/react';
import { api } from '../services/api';

interface OTPLoginProps {
  onLogin: () => void;
}

export const OTPLogin: React.FC<OTPLoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    setLoading(true);
    try {
      if (step === 'phone' && phone.length >= 10) {
        const res = await api.sendOTP(phone);
        if (res.success) setStep('otp');
      } else if (step === 'otp') {
        const res = await api.verifyOTP(phone, otp.join(''));
        if (res.success) onLogin();
        else alert(res.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      <div className="absolute top-[40%] -right-[10%] w-[35%] h-[35%] rounded-full bg-tertiary-fixed/10 blur-[100px]"></div>

      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-[0_24px_80px_rgba(25,27,35,0.1)] border border-outline-variant/30 relative z-10">
        
        {/* Left Side: Visual/Brand */}
        <div className="hidden md:flex flex-col justify-between p-12 luminous-gradient text-on-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-container/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
              <Icons.Shield className="w-7 h-7 text-white fill-white/20" />
            </div>
            <h1 className="font-headline text-5xl font-extrabold tracking-tight leading-tight">
              InsparX:<br/>Safety, Architected.
            </h1>
            <p className="mt-6 text-primary-container text-lg font-medium max-w-xs leading-relaxed">
              The first AI-driven registration and insurance platform designed specifically for the modern gig economy.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-surface-container-highest overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-sm font-bold tracking-wide">JOIN 10K+ GIG WORKERS</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <div className="md:hidden w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Icons.Shield className="w-7 h-7 text-primary fill-primary/20" />
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-surface tracking-tight">
              {step === 'phone' ? 'Welcome back' : 'Verify Identity'}
            </h2>
            <p className="text-secondary mt-2 text-base md:text-lg">
              {step === 'phone' ? 'Enter your phone to access your sanctuary.' : 'We sent a 6-digit code to your device.'}
            </p>
          </div>

          <div className="space-y-8">
            {step === 'phone' ? (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest pl-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-outline-variant pr-3">
                    <span className="text-on-surface font-bold">+91</span>
                  </div>
                  <input 
                    className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/20 rounded-2xl py-5 pl-20 pr-4 text-on-surface font-headline font-bold text-xl tracking-widest transition-all" 
                    placeholder="0000000000" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-outline uppercase tracking-widest pl-1">Verification Code</label>
                <div className="flex justify-between gap-2">
                  {otp.map((digit, i) => (
                    <input 
                      key={i}
                      className="w-full aspect-square bg-surface-container-low border-0 focus:ring-2 focus:ring-primary/20 rounded-xl text-center font-headline font-bold text-2xl text-primary transition-all"
                      maxLength={1}
                      type="text"
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[i] = e.target.value.slice(-1);
                        setOtp(newOtp);
                        if (e.target.value && i < 5) {
                          (e.target.nextElementSibling as HTMLInputElement)?.focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={() => setStep('phone')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Change number
                  </button>
                  <span className="text-[10px] text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded-md font-bold">Expires in 01:59</span>
                </div>
              </div>
            )}

            <button 
              onClick={handleNext}
              disabled={loading || (step === 'phone' ? phone.length < 10 : otp.some(d => !d))}
              className="w-full luminous-gradient text-on-primary font-headline font-bold text-xl py-5 rounded-2xl shadow-2xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex justify-center items-center gap-3"
            >
              {loading ? 'Processing...' : (step === 'phone' ? 'Get Started' : 'Verify & Enter')}
              {!loading && <Icons.ArrowRight className="w-6 h-6" />}
            </button>
          </div>

          <p className="mt-10 text-center text-xs text-outline font-medium leading-relaxed">
            By continuing, you agree to our <span className="text-secondary font-bold cursor-pointer">Terms of Service</span> and <span className="text-secondary font-bold cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
