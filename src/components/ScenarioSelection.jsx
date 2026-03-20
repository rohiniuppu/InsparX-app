import { User, MapPinOff, Activity, SignalLow, ArrowLeft } from 'lucide-react';

const ScenarioSelection = ({ onSelect, onBack }) => {
  return (
    <div className="container animate-fade-in">
      <div className="flex-between mb-4">
        <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
          <ArrowLeft size={20} style={{ marginRight: '4px' }}/> Back
        </button>
      </div>

      <h2>Select Simulation Scenario</h2>
      <p className="text-muted">Choose a profile to see how the AI decision engine evaluates the parametric claim signals.</p>

      {/* Scenario A */}
      <div 
        className="card interactive-card mt-6" 
        onClick={() => onSelect('genuine')}
        style={{ borderLeft: '4px solid var(--success)' }}
      >
        <div className="flex-between mb-2">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} className="text-success" /> Scenario A: Genuine
          </h3>
          <span className="badge badge-success">High Trust</span>
        </div>
        <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: 'var(--text-main)' }}>
          <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><Activity size={16} className="text-muted"/> Driving slowly in rain</li>
          <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><SignalLow size={16} className="text-muted"/> Spotty network connection</li>
          <li style={{ display: 'flex', gap: '8px' }}><User size={16} className="text-muted"/> Completed 1 order since morning</li>
        </ul>
      </div>

      {/* Scenario B */}
      <div 
        className="card interactive-card mt-4" 
        onClick={() => onSelect('fraud')}
        style={{ borderLeft: '4px solid var(--danger)' }}
      >
        <div className="flex-between mb-2">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPinOff size={20} className="text-danger" /> Scenario B: Fraudster
          </h3>
          <span className="badge badge-danger">High Risk</span>
        </div>
        <ul style={{ listStyle: 'none', fontSize: '0.9rem', color: 'var(--text-main)' }}>
          <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><Activity size={16} className="text-muted"/> Static sensors (No movement)</li>
          <li style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><MapPinOff size={16} className="text-muted"/> GPS Spoofed to flood zone</li>
          <li style={{ display: 'flex', gap: '8px' }}><User size={16} className="text-muted"/> 0 deliveries today</li>
        </ul>
      </div>
    </div>
  );
};

export default ScenarioSelection;
