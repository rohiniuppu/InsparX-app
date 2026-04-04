/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Layout } from './components/Layout';
import { OTPLogin } from './components/OTPLogin';
import { Onboarding } from './components/Onboarding';
import { Dashboard } from './components/Dashboard';
import { Monitoring } from './components/Monitoring';
import { Claims } from './components/Claims';
import { Profile } from './components/Profile';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  if (!isLoggedIn) {
    return <OTPLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!isOnboarded) {
    return <Onboarding onComplete={() => setIsOnboarded(true)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'monitoring':
        return <Monitoring />;
      case 'claims':
        return <Claims />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}
