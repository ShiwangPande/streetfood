import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Survey from './pages/survey/Index';
import Advanced from './pages/home/Index';
import Map from './pages/map/Index';
import Navbar from './components/Navbar';
import Tabbar from './components/Tabbar';
import VendorPage from './pages/vendors/Index';
import Wishlist from './pages/wishlist/Index';
import { WishlistProvider } from './pages/wishlist/WishlistContext';
import Loader from './components/Loader';
import InstallPopup from './components/InstallButton';
import PrivacyPolicy from './pages/privacypolicy/Index';
import "./App.css";
const App = () => {
  const [preferences, setPreferences] = useState(null);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const handleSurveyComplete = (prefs) => {
    setPreferences(prefs);
    navigate('/advanced', { state: { preferences: prefs, vendors: vendors } });
  };
  const [showPopup, setShowPopup] = useState(false);

  const handleInstall = () => {
    window.deferredPrompt.prompt();
    setShowPopup(false);
  };

  

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      window.deferredPrompt = e;
      setShowPopup(true);
    });
    setTimeout(() => {
      setShowPopup(true);
    }, 5000);
  }, []);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  }, [])

  return (
    <div className=" h-[100vh] ">
   
          <> 
           {/* <InstallPopup showPopup={showPopup} onInstall={handleInstall} /> */}
            <Routes>
              <Route element={<Survey onComplete={handleSurveyComplete} />} />
              <Route path="/" element={<Advanced preferences={preferences} />} />
              <Route path="/map" element={<Map />} />
              <Route path="/vendors" element={<VendorPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />

            </Routes>
          </>
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
