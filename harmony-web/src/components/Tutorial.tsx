import React from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface TutorialProps {
  onComplete: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>
        🎉 Willkommen bei Harmony!
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          Hier ist eine kurze Einführung in die App:
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Entdecken:</strong> Swipe durch Profile und finde Matches
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Chats:</strong> Unterhalte dich mit deinen Matches
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Profil:</strong> Bearbeite dein Profil und deine Interessen
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Hilfe:</strong> Der Hilfe-Button ist immer verfügbar
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onComplete} fullWidth>
          Los geht's! 🚀
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Tutorial;
