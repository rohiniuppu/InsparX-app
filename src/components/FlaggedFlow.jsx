import { ShieldAlert, RefreshCcw, Camera, ArrowLeft } from 'lucide-react';

const FlaggedFlow = ({ onRetry, onReset }) => {
  return (
    <div className="container animate-fade-in">
      <div className="flex-between mb-4">
        <button onClick={onReset} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
          <ArrowLeft size={20} style={{ marginRight: '4px' }}/> Exit
        </button>
        <div className="badge badge-warning">Verification Required</div>
      </div>

      <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--warning)' }}>
        <ShieldAlert size={48} className="text-warning mb-4" style={{ margin: '0 auto' }} />
        <h2>Unusual Activity Detected</h2>
        <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '8px' }}>
          Our system detected anomalies in your device sensors and platform activity that don't match the reported disruption event.
        </p>
        <p className="text-danger mb-6" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
          Reason: Static sensors & GPS location mismatch
        </p>
      </div>

      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '16px' }}>How would you like to proceed?</h3>

      <button className="btn btn-primary mb-4" onClick={() => alert("Mock: Opening camera to submit photo evidence...")}>
        <Camera size={20} />
        Submit Quick Proof
      </button>
      <p className="text-muted text-center" style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
        Upload a real-time photo of your surroundings.
      </p>

      <button className="btn btn-outline mt-4" onClick={onRetry}>
        <RefreshCcw size={20} />
        Re-run Decision Engine
      </button>

    </div>
  );
};

export default FlaggedFlow;
