import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Survey from './pages/survey/Index';
import Advanced from './pages/home/Index';
import Map from './pages/map/Index';
import VendorPage from './pages/vendors/Index';
import Wishlist from './pages/wishlist/Index';
import { WishlistProvider } from './pages/wishlist/WishlistContext';
import PrivacyPolicy from './pages/privacypolicy/Index';
import SafetyReminder from './components/SafetyReminder';
import ParentalConsent from './components/ParentalConsent';
import "./App.css";

const App = () => {
  const [preferences, setPreferences] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [showReminder, setShowReminder] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [showParentalConsent, setShowParentalConsent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const safetyReminderShown = localStorage.getItem('safetyReminderShown');
    const parentalConsentShown = localStorage.getItem('parentalConsentShown');

    if (!safetyReminderShown) {
      setShowReminder(true);
    }

    if (!parentalConsentShown) {
      setShowParentalConsent(true);
      setCommentsEnabled(false);
    }

    // Check if both reminders/consent are shown and verified
    if (safetyReminderShown && parentalConsentShown) {
      setIsVerified(true);
    }
  }, []);

  const handleSurveyComplete = (prefs) => {
    setPreferences(prefs);
    navigate('/advanced', { state: { preferences: prefs, vendors: vendors } });
  };

  const handleAgree = () => {
    localStorage.setItem('safetyReminderShown', 'true');
    setShowReminder(false);

    if (localStorage.getItem('parentalConsentShown')) {
      setIsVerified(true);
    }
  };

  const handleConsent = () => {
    localStorage.setItem('parentalConsentShown', 'true');
    setShowParentalConsent(false);

    if (localStorage.getItem('safetyReminderShown')) {
      setIsVerified(true);
    }
  };

  const handleToggleComments = () => {
    setCommentsEnabled(!commentsEnabled);
  };

  return (
    <div className="min-h-screen">
      {showReminder && <SafetyReminder onAgree={handleAgree} />}
      {!showReminder && !isVerified && showParentalConsent && <ParentalConsent onConsent={handleConsent} />}

      {isVerified && (
        <div className="w-screen overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Advanced preferences={preferences} />} />
            <Route path="/survey" element={<Survey onComplete={handleSurveyComplete} />} />
            <Route path="/map" element={<Map />} />
            <Route
              path="/vendors"
              element={<VendorPage handleToggleComments={handleToggleComments} commentsEnabled={commentsEnabled} />}
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

const AppWrapper = () => (
  <WishlistProvider>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </WishlistProvider>
);

export default AppWrapper;
