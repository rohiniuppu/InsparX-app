import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ScenarioSelection from './components/ScenarioSelection';
import DecisionEngine from './components/DecisionEngine';
import FlaggedFlow from './components/FlaggedFlow';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedScenario, setSelectedScenario] = useState(null);

  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    navigateTo('decision');
  };

  return (
    <>
      <div className="header">
        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.5rem' }}>🛡️</span>
          InsparX
        </div>
      </div>

      {currentScreen === 'dashboard' && (
        <Dashboard onSimulate={() => navigateTo('scenario')} />
      )}

      {currentScreen === 'scenario' && (
        <ScenarioSelection
          onSelect={handleScenarioSelect}
          onBack={() => navigateTo('dashboard')}
        />
      )}

      {currentScreen === 'decision' && (
        <DecisionEngine
          scenario={selectedScenario}
          onComplete={(result) => {
            if (result === 'flagged') {
              navigateTo('flagged');
            } else {
              // Stay on decision or show success logic handled inside DecisionEngine
            }
          }}
          onReset={() => {
            setSelectedScenario(null);
            navigateTo('dashboard');
          }}
        />
      )}

      {currentScreen === 'flagged' && (
        <FlaggedFlow
          onRetry={() => navigateTo('decision')}
          onReset={() => {
            setSelectedScenario(null);
            navigateTo('dashboard');
          }}
        />
      )}
    </>
  );
}

export default App;
