import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

export const DarkModeToggle: React.FC = () => {
  const theme = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Lade gespeicherten Theme-Modus
    const savedTheme = localStorage.getItem('harmony-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.setAttribute('data-theme', shouldBeDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('harmony-theme', newTheme ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    
    // Dispatch custom event für Theme-Change
    window.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { theme: newTheme ? 'dark' : 'light' } 
    }));
  };

  return (
    <Tooltip title={isDark ? 'Hell-Modus aktivieren' : 'Dunkel-Modus aktivieren'}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          onClick={toggleTheme}
          sx={{
            background: isDark 
              ? 'linear-gradient(135deg, #FFD700, #FFA500)'
              : 'linear-gradient(135deg, #4A5568, #2D3748)',
            color: isDark ? 'black' : 'white',
            '&:hover': {
              background: isDark 
                ? 'linear-gradient(135deg, #FFA500, #FFD700)'
                : 'linear-gradient(135deg, #2D3748, #4A5568)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isDark 
              ? '0 4px 20px rgba(255, 215, 0, 0.3)'
              : '0 4px 20px rgba(74, 85, 104, 0.3)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDark ? 'dark' : 'light'}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {isDark ? <LightMode /> : <DarkMode />}
            </motion.div>
          </AnimatePresence>
        </IconButton>
      </motion.div>
    </Tooltip>
  );
};

// Theme Provider Hook
export const useThemeMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDark(event.detail.theme === 'dark');
    };

    window.addEventListener('theme-change', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('theme-change', handleThemeChange as EventListener);
    };
  }, []);

  return { isDark };
};

export default DarkModeToggle;
