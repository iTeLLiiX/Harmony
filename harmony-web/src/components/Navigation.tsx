import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Badge,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider
} from '@mui/material';
import {
  Home,
  Search,
  Chat,
  Person,
  Settings,
  Notifications,
  Help
} from '@mui/icons-material';
import Logo from './Logo';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [showHelp, setShowHelp] = useState(false);

  // Mock data für Benachrichtigungen
  const [notifications] = React.useState(3);
  const [unreadChats] = React.useState(2);

  const handleNavigationChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Logout Logic
    localStorage.removeItem('harmony_token');
    navigate('/');
    handleProfileMenuClose();
  };

  // Navigation Items mit deutschen Labels
  const navigationItems = [
    {
      value: '/',
      label: 'Start',
      icon: <Home />,
      badge: 0
    },
    {
      value: '/matching',
      label: 'Entdecken',
      icon: <Search />,
      badge: 0
    },
    {
      value: '/chat',
      label: 'Chats',
      icon: <Chat />,
      badge: unreadChats
    },
    {
      value: '/profil',
      label: 'Profil',
      icon: <Person />,
      badge: 0
    }
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bgcolor: 'white',
          boxShadow: 2,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          minHeight: 56
        }}
      >
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Logo size="small" color="primary" />
        </Box>

        {/* Right Side Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Benachrichtigungen */}
          <IconButton color="inherit">
            <Badge badgeContent={notifications} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Hilfe-Button */}
          <IconButton 
            color="inherit"
            onClick={() => setShowHelp(true)}
            aria-label="Hilfe"
          >
            <Help />
          </IconButton>

          {/* Profil-Menü */}
          <IconButton
            onClick={handleProfileMenuOpen}
            color="inherit"
            aria-label="Profil-Menü"
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              M
            </Avatar>
          </IconButton>
        </Box>
      </Box>

      {/* Bottom Navigation */}
      <BottomNavigation
        value={location.pathname}
        onChange={handleNavigationChange}
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'white',
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 0 8px',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.value}
            value={item.value}
            label={item.label}
            icon={
              item.badge > 0 ? (
                <Badge badgeContent={item.badge} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )
            }
            sx={{
              '& .MuiBottomNavigationAction-label': {
                fontSize: '12px',
                fontWeight: 500,
                mt: 0.5
              }
            }}
          />
        ))}
      </BottomNavigation>

      {/* Profil-Menü */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
              fontSize: '14px'
            }
          }
        }}
      >
        <MenuItem onClick={() => { navigate('/profil'); handleProfileMenuClose(); }}>
          <Person sx={{ mr: 2, fontSize: 20 }} />
          Mein Profil
        </MenuItem>
        <MenuItem onClick={() => { navigate('/einstellungen'); handleProfileMenuClose(); }}>
          <Settings sx={{ mr: 2, fontSize: 20 }} />
          Einstellungen
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          Abmelden
        </MenuItem>
      </Menu>

      {/* Hilfe Modal */}
      {showHelp && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300
          }}
          onClick={() => setShowHelp(false)}
        >
          <Box
            sx={{
              bgcolor: 'white',
              borderRadius: 2,
              p: 4,
              maxWidth: 500,
              m: 2,
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h5" gutterBottom>
              🆘 Hilfe & Navigation
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                📱 Navigation
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Start:</strong> Deine Übersicht und neueste Matches
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Entdecken:</strong> Swipe durch neue Profile und finde Matches
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Chats:</strong> Unterhalte dich mit deinen Matches
              </Typography>
              <Typography variant="body2" paragraph>
                <strong>Profil:</strong> Bearbeite dein Profil und deine Interessen
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                💡 Tipps
              </Typography>
              <Typography variant="body2" paragraph>
                • Vervollständige dein Profil für bessere Matches
              </Typography>
              <Typography variant="body2" paragraph>
                • Teile deine echten Interessen (Musik, Sport, Hobbys)
              </Typography>
              <Typography variant="body2" paragraph>
                • Sei ehrlich bei deinen Angaben
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowHelp(false)}
            >
              Verstanden
            </Button>
          </Box>
        </Box>
      )}

      {/* Spacer für Fixed Navigation */}
      <Box sx={{ height: 56 }} />
      <Box sx={{ height: 80 }} />
    </>
  );
};

export default Navigation;
