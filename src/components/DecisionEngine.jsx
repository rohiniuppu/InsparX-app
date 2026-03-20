import { useState, useEffect } from 'react';
import { CheckCircle, ShieldAlert, Cpu, MapPin, Activity, Smartphone, Users, RotateCcw } from 'lucide-react';

const DecisionEngine = ({ scenario, onComplete, onReset }) => {
  const [step, setStep] = useState(0);
  const isGenuine = scenario === 'genuine';

  useEffect(() => {
    if (step < 4) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1);
      }, 2500); // 2.5s per analysis step
      return () => clearTimeout(timer);
    } else if (step === 4 && !isGenuine) {
      // Small delay before redirecting to flagged flow
      const timer = setTimeout(() => {
        onComplete('flagged');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step, isGenuine, onComplete]);

  const renderStatusIcon = (currentStep, targetStep, passed) => {
    if (currentStep < targetStep) return <div className="spinner-placeholder" style={{ width: '20px', height: '20px', border: '2px solid #e2e8f0', borderTop: '2px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />;
    if (passed) return <CheckCircle size={20} className="text-success animate-fade-in" />;
    return <ShieldAlert size={20} className="text-danger animate-fade-in" />;
  };

  const signals = [
    {
      icon: <Activity size={20} />,
      title: "Device Accelerometer & GPS",
      desc: isGenuine ? "Moving 12km/h in reported zone." : "Sensors static in exact position for 4h.",
      aiReasoning: isGenuine ? "Movement consistent with delivery behavior." : "Anomaly: Lack of physical movement.",
      passed: isGenuine
    },
    {
      icon: <Smartphone size={20} />,
      title: "Network & App Activity",
      desc: isGenuine ? "Spotty connection, 1 order accepted." : "Perfect 5G, 0 orders accepted today.",
      aiReasoning: isGenuine ? "Matches area weather disruption." : "Suspicious: No platform activity reported.",
      passed: isGenuine
    },
    {
      icon: <Users size={20} />,
      title: "Nearby Worker Context",
      desc: isGenuine ? "85% of nearby workers confirm slowdown." : "Local workers performing normally.",
      aiReasoning: isGenuine ? "Matches local macro-trends." : "Mismatch with nearby user behavior.",
      passed: isGenuine
    }
  ];

  return (
    <div className="container animate-fade-in">
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
      
      <div className="text-center mb-6">
        <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#eff6ff', borderRadius: '50%', marginBottom: '16px' }}>
          <Cpu size={32} color="var(--primary)" className={step < 4 ? "animate-pulse-btn" : ""} />
        </div>
        <h2>AI Decision Engine</h2>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
          {step < 4 ? "Analyzing physical and platform signals..." : "Analysis complete."}
        </p>
      </div>

      <div className="card">
        <div style={{ padding: '8px 0' }}>
          {signals.map((sig, index) => {
            const isAnalyzed = step > index;
            const isAnalyzing = step === index;
            
            return (
              <div key={index} className="signal-item" style={{ opacity: isAnalyzed || isAnalyzing ? 1 : 0.4, transition: 'opacity 0.5s' }}>
                <div className="signal-icon" style={{ color: 'var(--primary)' }}>
                  {sig.icon}
                </div>
                <div className="signal-content">
                  <h4 className="signal-title flex-between">
                    {sig.title}
                    {isAnalyzed ? renderStatusIcon(step, index + 1, sig.passed) : (isAnalyzing ? renderStatusIcon(step, index + 1) : null)}
                  </h4>
                  {isAnalyzed && (
                    <div className="animate-slide-up mt-2">
                      <p className="signal-desc mb-2"><strong>Data:</strong> {sig.desc}</p>
                      <div style={{ fontSize: '0.85rem', padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f1f5f9', borderLeft: `3px solid ${sig.passed ? 'var(--success)' : 'var(--warning)'}` }}>
                        <strong>AI:</strong> {sig.aiReasoning}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {step === 4 && (
        <div className="card animate-slide-up" style={{ textAlign: 'center', borderColor: isGenuine ? 'var(--success)' : 'var(--danger)', backgroundColor: isGenuine ? 'var(--success-bg)' : 'var(--danger-bg)' }}>
          {isGenuine ? (
            <>
              <CheckCircle size={48} className="text-success mb-2" style={{ margin: '0 auto' }} />
              <h2 className="text-success mb-2">Claim Approved</h2>
              <p style={{ color: '#166534', fontWeight: 600, fontSize: '1.25rem' }}>₹5,000 Payout Initiated</p>
              <p style={{ color: '#166534', fontSize: '0.9rem', marginTop: '8px' }}>High trust score. Funds added to your wallet instantly.</p>
              <button className="btn btn-outline mt-6" onClick={onReset} style={{ backgroundColor: '#fff', borderColor: 'var(--success)' }}>
                Back to Dashboard
              </button>
            </>
          ) : (
            <>
              <ShieldAlert size={48} className="text-danger mb-2" style={{ margin: '0 auto' }} />
              <h2 className="text-danger mb-2">Claim Flagged</h2>
              <p className="text-danger">High fraud risk detected.</p>
              <p style={{ color: '#991b1b', fontSize: '0.9rem', marginTop: '8px' }}>Redirecting to verification process...</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DecisionEngine;
