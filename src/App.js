import React, { useState } from 'react';
import Survey from './pages/survey/Index';
import Advanced from './pages/home/Index';

function App() {
  const [preferences, setPreferences] = useState(null);

  const handleSurveyComplete = (prefs) => {
    setPreferences(prefs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-400 to-blue-400">
      {!preferences ? (
        <Survey onComplete={handleSurveyComplete} />
      ) : (
        <Advanced preferences={preferences} />
      )}
    </div>
  );
}

export default App;
