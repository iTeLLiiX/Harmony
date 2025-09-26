import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Divider,
  Chip,
  useTheme
} from '@mui/material';
import {
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  Favorite,
  Block,
  Report,
  Circle
} from '@mui/icons-material';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'emoji';
}

interface Chat {
  id: string;
  person: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastSeen: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: ChatMessage[];
}

const Chat: React.FC = () => {
  const theme = useTheme();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      person: {
        id: '1',
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        isOnline: true,
        lastSeen: 'vor 2 Minuten'
      },
      lastMessage: 'Hey! Wie war dein Tag? 😊',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      messages: [
        {
          id: '1',
          senderId: '1',
          content: 'Hi! Schön, dass wir uns gematcht haben! 👋',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          type: 'text'
        },
        {
          id: '2',
          senderId: 'me',
          content: 'Hallo Sarah! Freut mich auch sehr! Wie geht es dir?',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          type: 'text'
        },
        {
          id: '3',
          senderId: '1',
          content: 'Hey! Wie war dein Tag? 😊',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'text'
        }
      ]
    },
    {
      id: '2',
      person: {
        id: '2',
        name: 'Max',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        isOnline: false,
        lastSeen: 'vor 1 Stunde'
      },
      lastMessage: 'Lass uns mal was zusammen unternehmen!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 0,
      messages: [
        {
          id: '1',
          senderId: '2',
          content: 'Hey! Du hattest recht, das Konzert war fantastisch! 🎵',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          type: 'text'
        },
        {
          id: '2',
          senderId: 'me',
          content: 'Freut mich, dass es dir gefallen hat! Welcher Song war dein Favorit?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
          type: 'text'
        },
        {
          id: '3',
          senderId: '2',
          content: 'Lass uns mal was zusammen unternehmen!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          type: 'text'
        }
      ]
    }
  ]);

  const currentChat = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setChats(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: newMessage,
            lastMessageTime: new Date()
          }
        : chat
    ));

    setNewMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
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

  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      {/* Chat List */}
      <Box sx={{ width: 350, borderRight: 1, borderColor: 'divider', bgcolor: 'white' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h6">Nachrichten</Typography>
        </Box>
        
        <List>
          {chats.map((chat) => (
            <ListItem
              key={chat.id}
              button
              selected={selectedChat === chat.id}
              onClick={() => setSelectedChat(chat.id)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'primary.50',
                  '&:hover': { bgcolor: 'primary.100' }
                }
              }}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    chat.person.isOnline ? (
                      <Circle sx={{ fontSize: 12, color: 'success.main' }} />
                    ) : null
                  }
                >
                  <Avatar src={chat.person.avatar} />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {chat.person.name}
                    </Typography>
                    {chat.unreadCount > 0 && (
                      <Chip
                        label={chat.unreadCount}
                        size="small"
                        color="primary"
                        sx={{ minWidth: 20, height: 20 }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: 200
                      }}
                    >
                      {chat.lastMessage}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(chat.lastMessageTime)}
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Messages */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentChat ? (
          <>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'white' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={currentChat.person.avatar} />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6">{currentChat.person.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentChat.person.isOnline ? 'Online' : `Zuletzt online ${currentChat.person.lastSeen}`}
                  </Typography>
                </Box>
                <IconButton>
                  <Favorite />
                </IconButton>
                <IconButton>
                  <Block />
                </IconButton>
                <IconButton>
                  <Report />
                </IconButton>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: 'grey.50' }}>
              {currentChat.messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.senderId === 'me' ? 'flex-end' : 'flex-start',
                    mb: 2
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: '70%',
                      bgcolor: message.senderId === 'me' ? 'primary.main' : 'white',
                      color: message.senderId === 'me' ? 'white' : 'text.primary',
                      borderRadius: 2
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="body1">{message.content}</Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: message.senderId === 'me' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                          fontSize: '0.75rem'
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'white' }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <IconButton>
                  <AttachFile />
                </IconButton>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Nachricht schreiben..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  variant="outlined"
                  size="small"
                />
                <IconButton>
                  <EmojiEmotions />
                </IconButton>
                <IconButton
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  color="primary"
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Wähle einen Chat aus
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Beginne eine Unterhaltung mit deinen Matches
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
