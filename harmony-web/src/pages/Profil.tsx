import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Profil: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        👤 Mein Profil
      </Typography>
      <Typography variant="body1">
        Hier kannst du dein Profil bearbeiten und vervollständigen.
      </Typography>
    </Container>
  );
};

export default Profil;
