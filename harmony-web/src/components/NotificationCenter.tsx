import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  IconButton,
  Chip,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import {
  Close,
  Favorite,
  Message,
  SupervisedUserCircle,
  Event,
  Security,
  Star
} from '@mui/icons-material';

interface Notification {
  id: string;
  type: 'match' | 'message' | 'like' | 'super_like' | 'event' | 'security';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  avatar?: string;
  actionUrl?: string;
}

const NotificationCenter: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'match',
      title: 'Neues Match! 🎉',
      message: 'Du und Sarah habt euch gematcht! Beginnt ein Gespräch.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      actionUrl: '/chat'
    },
    {
      id: '2',
      type: 'message',
      title: 'Neue Nachricht',
      message: 'Max hat dir eine Nachricht geschickt: "Hey! Wie geht es dir?"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: false,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      actionUrl: '/chat'
    },
    {
      id: '3',
      type: 'like',
      title: 'Jemand hat dich geliked! 💕',
      message: 'Eine neue Person hat Interesse an dir gezeigt.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
      actionUrl: '/matching'
    },
    {
      id: '4',
      type: 'super_like',
      title: 'Super Like erhalten! ⭐',
      message: 'Anna hat dir einen Super Like gegeben! Das ist etwas Besonderes.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      read: true,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      actionUrl: '/matching'
    },
    {
      id: '5',
      type: 'event',
      title: 'Neues Event in deiner Nähe',
      message: 'Konzert am Samstag in München - 3 deiner Matches sind auch dabei!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      read: true,
      actionUrl: '/events'
    },
    {
      id: '6',
      type: 'security',
      title: 'Sicherheitshinweis',
      message: 'Dein Profil wurde erfolgreich verifiziert. ✅',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      actionUrl: '/profil'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Favorite sx={{ color: 'success.main' }} />;
      case 'message':
        return <Message sx={{ color: 'primary.main' }} />;
      case 'like':
        return <Favorite sx={{ color: 'error.main' }} />;
      case 'super_like':
        return <Star sx={{ color: 'warning.main' }} />;
      case 'event':
        return <Event sx={{ color: 'info.main' }} />;
      case 'security':
        return <Security sx={{ color: 'success.main' }} />;
      default:
        return <SupervisedUserCircle />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'match':
        return 'success.main';
      case 'message':
        return 'primary.main';
      case 'like':
        return 'error.main';
      case 'super_like':
        return 'warning.main';
      case 'event':
        return 'info.main';
      case 'security':
        return 'success.main';
      default:
        return 'grey.500';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Jetzt';
    if (minutes < 60) return `vor ${minutes} Min`;
    if (hours < 24) return `vor ${hours} Std`;
    return `vor ${days} Tag${days > 1 ? 'en' : ''}`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 400,
          maxWidth: '90vw'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5">
            🔔 Benachrichtigungen
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {unreadCount > 0 && (
          <Box sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={markAllAsRead}
              sx={{ mr: 2 }}
            >
              Alle als gelesen markieren
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={clearAll}
              color="error"
            >
              Alle löschen
            </Button>
          </Box>
        )}

        <Divider sx={{ mb: 2 }} />

        {notifications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Keine Benachrichtigungen
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Du hast alle Benachrichtigungen gelesen.
            </Typography>
          </Box>
        ) : (
          <List>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'primary.50',
                  borderRadius: 1,
                  mb: 1,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: notification.read ? 'grey.50' : 'primary.100'
                  }
                }}
                onClick={() => {
                  markAsRead(notification.id);
                  if (notification.actionUrl) {
                    window.location.href = notification.actionUrl;
                  }
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      !notification.read ? (
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: getNotificationColor(notification.type)
                          }}
                        />
                      ) : null
                    }
                  >
                    <Avatar 
                      src={notification.avatar}
                      sx={{ 
                        bgcolor: notification.avatar ? 'transparent' : getNotificationColor(notification.type),
                        color: 'white'
                      }}
                    >
                      {!notification.avatar && getNotificationIcon(notification.type)}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: notification.read ? 'normal' : 'bold',
                          color: notification.read ? 'text.primary' : 'primary.main'
                        }}
                      >
                        {notification.title}
                      </Typography>
                      <Chip
                        label={notification.type.replace('_', ' ')}
                        size="small"
                        sx={{ 
                          bgcolor: getNotificationColor(notification.type),
                          color: 'white',
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(notification.timestamp)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        <Divider sx={{ mt: 3 }} />
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            💡 Tipp: Aktiviere Push-Benachrichtigungen für sofortige Updates!
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NotificationCenter;
