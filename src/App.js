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
const App = () => {
  const [preferences, setPreferences] = useState(null);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const handleSurveyComplete = (prefs) => {
    setPreferences(prefs);
    navigate('/advanced', { state: { preferences: prefs, vendors: vendors } });
  };

  useEffect(() => {
    // Fetch vendors data here or from wherever it is available
    const fetchVendors = async () => {
      try {
        // Fetch vendors data from API or any other source
        // Example:
        const response = await fetch('http://localhost:3000/vendors');
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    // Call the fetchVendors function when component mounts
    fetchVendors();
  }, []);

  return (
    <div className=" h-[100vh] ">
      <Routes>
        <Route path="/" element={<Survey onComplete={handleSurveyComplete} />} />
        <Route path="/advanced" element={<Advanced preferences={preferences} />} />
        <Route path="/map" element={<Map />} />
        <Route path="/vendors" element={<VendorPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
};

const AppWrapper = () => (
  <WishlistProvider>
    <Router>
   
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
      <Tabbar />
    </Router>
  </WishlistProvider>
);

export default AppWrapper;
