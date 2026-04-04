import React from 'react';
import { Icons } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  showNav?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, showNav = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 glass-effect shadow-[0_8px_24px_rgba(25,27,35,0.06)] flex justify-between items-center px-4 md:px-8 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Icons.Shield className="text-primary w-6 h-6 fill-primary/20" />
          </div>
          <span className="text-xl font-extrabold text-primary font-headline tracking-tight hidden sm:block">InsparX</span>
        </div>

        {/* Desktop Nav */}
        {showNav && (
          <nav className="hidden md:flex items-center gap-1 lg:gap-4">
            <DesktopNavItem 
              icon={<Icons.Home />} 
              label="Home" 
              active={activeTab === 'home'} 
              onClick={() => onTabChange('home')} 
            />
            <DesktopNavItem 
              icon={<Icons.Radar />} 
              label="Monitoring" 
              active={activeTab === 'monitoring'} 
              onClick={() => onTabChange('monitoring')} 
            />
            <DesktopNavItem 
              icon={<Icons.FileText />} 
              label="Claims" 
              active={activeTab === 'claims'} 
              onClick={() => onTabChange('claims')} 
            />
            <DesktopNavItem 
              icon={<Icons.User />} 
              label="Profile" 
              active={activeTab === 'profile'} 
              onClick={() => onTabChange('profile')} 
            />
          </nav>
        )}

        <div className="flex items-center gap-2">
          <button className="p-2 text-secondary hover:bg-primary/5 hover:text-primary rounded-full transition-all active:scale-95">
            <Icons.Bell className="w-6 h-6" />
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant md:hidden">
            <img src="https://picsum.photos/seed/user/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 ${showNav ? 'pb-32 md:pb-12' : 'pb-12'} pt-24`}>
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      {showNav && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full glass-effect shadow-[0_-8px_24px_rgba(25,27,35,0.06)] rounded-t-3xl flex justify-around items-center px-4 pt-3 pb-8 z-50">
          <NavItem 
            icon={<Icons.Home />} 
            label="Home" 
            active={activeTab === 'home'} 
            onClick={() => onTabChange('home')} 
          />
          <NavItem 
            icon={<Icons.Radar />} 
            label="Monitoring" 
            active={activeTab === 'monitoring'} 
            onClick={() => onTabChange('monitoring')} 
          />
          <NavItem 
            icon={<Icons.FileText />} 
            label="Claims" 
            active={activeTab === 'claims'} 
            onClick={() => onTabChange('claims')} 
          />
          <NavItem 
            icon={<Icons.User />} 
            label="Profile" 
            active={activeTab === 'profile'} 
            onClick={() => onTabChange('profile')} 
          />
        </nav>
      )}
    </div>
  );
};

const DesktopNavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all active:scale-95 ${
      active ? 'bg-primary text-on-primary shadow-md' : 'text-secondary hover:bg-primary/5 hover:text-primary'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: "w-5 h-5" })}
    <span className="text-sm font-bold font-headline">{label}</span>
  </button>
);

const NavItem = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-2 py-1 rounded-2xl transition-all active:scale-90 duration-150 ${
      active ? 'bg-primary/10 text-primary' : 'text-secondary'
    }`}
  >
    {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 mb-1 ${active ? 'fill-primary/20' : ''}` })}
    <span className="text-[10px] font-bold tracking-wide uppercase">{label}</span>
  </button>
);
