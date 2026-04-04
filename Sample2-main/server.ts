import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock Database
  let userProfile: any = null;
  const users: any[] = [];
  let currentPremium = 45;
  let premiumReasoning = "Standard rate based on your profile.";

  const claims = [
    { id: 1, icon: 'CloudRain', title: 'Rainstorm, Oct 12', status: 'APPROVED', detail: 'Automatic payout', amount: '₹120', color: 'green' },
    { id: 2, icon: 'Zap', title: 'High Wind, Oct 10', status: 'PROCESSING', detail: 'Validating telemetry', amount: '₹450', color: 'blue' },
    { id: 3, icon: 'AlertTriangle', title: 'Heatwave, Oct 08', status: 'PENDING', detail: 'Waiting for log', amount: '₹85', color: 'amber' },
    { id: 4, icon: 'CloudRain', title: 'Flash Flood, Sep 28', status: 'APPROVED', detail: 'Automatic payout', amount: '₹1,200', color: 'green' },
  ];

  const triggers = [
    { id: 1, icon: 'CloudRain', title: 'Water Logging Risk', desc: 'Zone 4B historically safe. ₹2 discount applied.', progress: 10, type: 'HYPER-LOCAL', color: 'emerald', impact: -2 },
    { id: 2, icon: 'Zap', title: 'Predictive Storm', desc: 'Heavy rain expected in 2 hours. Coverage extended.', progress: 85, type: 'WEATHER', color: 'blue', impact: 0 },
    { id: 3, icon: 'AlertTriangle', title: 'Heatwave Alert', desc: 'Temperature > 42°C. Health coverage active.', progress: 95, type: 'ENVIRONMENTAL', color: 'amber', impact: 5 },
    { id: 4, icon: 'MapPin', title: 'Road Closure', desc: 'Major artery blocked. Delivery delay protection active.', progress: 100, type: 'LOGISTICS', color: 'error', impact: 3 },
    { id: 5, icon: 'Shield', title: 'Safe Zone Bonus', desc: 'Operating in low-crime area. Premium reduced.', progress: 5, type: 'SECURITY', color: 'emerald', impact: -1 },
  ];

  // API Routes
  app.post("/api/auth/otp/send", (req, res) => {
    const { phone } = req.body;
    console.log(`Sending OTP to ${phone}`);
    res.json({ success: true, message: "OTP sent successfully" });
  });

  app.post("/api/auth/otp/verify", (req, res) => {
    const { phone, otp } = req.body;
    if (otp.length === 6) {
      res.json({ success: true, token: "mock-jwt-token", user: { phone } });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  });

  app.get("/api/profile", (req, res) => {
    res.json(userProfile || {
      name: "",
      dob: "",
      gender: "",
      city: "",
      platform: "",
      workType: "",
      workingHours: "",
      dailyEarnings: "",
      locationPermission: false,
      notificationOptIn: false
    });
  });

  app.post("/api/profile/autosave", (req, res) => {
    userProfile = { ...userProfile, ...req.body };
    console.log("Autosaving profile:", userProfile);
    res.json({ success: true });
  });

  app.post("/api/profile/register", (req, res) => {
    userProfile = { ...req.body, registeredAt: new Date().toISOString() };
    console.log("Registering profile:", userProfile);
    res.json({ success: true, profile: userProfile });
  });

  app.get("/api/dashboard", (req, res) => {
    // Calculate dynamic premium
    const totalImpact = triggers.reduce((acc, t) => acc + (t.impact || 0), 0);
    const dynamicPremium = 45 + totalImpact;
    
    res.json({
      riskScore: "Low",
      premium: dynamicPremium,
      premiumReasoning: "Your premium was adjusted by ₹" + totalImpact + " based on 5 hyper-local risk factors.",
      location: "Andheri East, Mumbai",
      weatherAlert: "Upcoming Heavy Rainfall warning in your service area. Drive with caution.",
      triggers: triggers.slice(0, 3)
    });
  });

  app.get("/api/monitoring", (req, res) => {
    res.json({
      safetyIndex: 84,
      visibility: "Moderate",
      traffic: "Heavy",
      triggers: triggers
    });
  });

  app.get("/api/claims", (req, res) => {
    res.json({
      autoProcessedRate: "84%",
      paidThisMonth: "₹1,420",
      history: claims
    });
  });

  app.post("/api/profile/register", (req, res) => {
    const profile = req.body;
    users.push(profile);
    res.json({ success: true, message: "Registration completed" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
