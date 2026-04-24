import { createContext, useContext, useState, useEffect } from 'react';

const PreferenceContext = createContext();

export function PreferenceProvider({ children }) {
  const [recruiterMode, setRecruiterMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('recruiterMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('recruiterMode', recruiterMode);
  }, [recruiterMode]);

  return (
    <PreferenceContext.Provider value={{ recruiterMode, setRecruiterMode }}>
      {children}
    </PreferenceContext.Provider>
  );
}

export const usePreference = () => useContext(PreferenceContext);
