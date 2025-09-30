import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Einstellungen: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        ⚙️ Einstellungen
      </Typography>
      <Typography variant="body1">
        Hier kannst du deine App-Einstellungen anpassen.
      </Typography>
    </Container>
  );
};

export default Einstellungen;
