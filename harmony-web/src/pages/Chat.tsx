import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Chat: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        💬 Chats
      </Typography>
      <Typography variant="body1">
        Hier findest du deine Matches und kannst mit ihnen chatten.
      </Typography>
    </Container>
  );
};

export default Chat;
