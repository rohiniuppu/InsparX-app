export const api = {
  async sendOTP(phone: string) {
    const response = await fetch('/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    return response.json();
  },

  async verifyOTP(phone: string, otp: string) {
    const response = await fetch('/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    return response.json();
  },

  async getDashboard() {
    const response = await fetch('/api/dashboard');
    return response.json();
  },

  async getMonitoring() {
    const response = await fetch('/api/monitoring');
    return response.json();
  },

  async getClaims() {
    const response = await fetch('/api/claims');
    return response.json();
  },

  async registerProfile(profile: any) {
    const response = await fetch('/api/profile/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    return response.json();
  },

  async autosaveProfile(profile: any) {
    const response = await fetch('/api/profile/autosave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });
    return response.json();
  },

  async getProfile() {
    const response = await fetch('/api/profile');
    return response.json();
  }
};
