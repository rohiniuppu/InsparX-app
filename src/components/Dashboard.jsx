import { ShieldCheck, CloudRain, ChevronRight } from 'lucide-react';

const Dashboard = ({ onSimulate }) => {
  return (
    <div className="container animate-fade-in">
      <h2>Welcome Back, Rahul</h2>
      
      <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div className="flex-between mb-4">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} color="var(--primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Active Coverage</h3>
          </div>
          <span className="badge badge-primary">Active</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <p className="text-muted mb-1" style={{ fontSize: '0.80rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Plan Cycle</p>
            <p style={{ fontWeight: 600, fontSize: '1rem' }}>Weekly (Mon-Sun)</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="text-muted mb-1" style={{ fontSize: '0.80rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Weekly Premium</p>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary)' }}>
              ₹20
            </p>
            <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px'}}>
              (Base ₹10 + Risk ₹5 + Usage ₹5)
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--bg-color)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <p className="text-muted mb-2" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Parametric Triggers Active:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '12px', fontWeight: 500 }}>🌧️ Rain &gt; Threshold</span>
            <span style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#fef08a', color: '#854d0e', borderRadius: '12px', fontWeight: 500 }}>🌫️ AQI &gt; 300</span>
            <span style={{ fontSize: '0.75rem', padding: '4px 8px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '12px', fontWeight: 500 }}>🛑 Outage / Curfew</span>
          </div>
          <p style={{ fontSize: '0.8rem', marginTop: '12px', color: 'var(--text-muted)' }}>
            <strong>Payout:</strong> Auto-calculated instantly (Hours Lost × Earnings/hr)
          </p>
        </div>
      </div>

      <div className="card animate-pulse-btn" style={{ borderColor: 'var(--danger)', backgroundColor: 'var(--danger-bg)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ padding: '8px', backgroundColor: '#fff', borderRadius: '50%' }}>
            <CloudRain size={24} className="text-danger" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#991b1b', marginBottom: '4px' }}>Heavy Rain Alert 🚨</h3>
            <p style={{ fontSize: '0.9rem', color: '#7f1d1d', margin: 0 }}>
              Severe waterlogging reported in Koramangala. Earnings disrupted?
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button className="btn btn-primary" onClick={onSimulate} style={{ height: '56px' }}>
          Simulate Parametric Claim <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
