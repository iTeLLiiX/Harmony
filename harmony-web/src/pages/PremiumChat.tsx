import React, { useState, useEffect, useRef } from 'react';
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
  useTheme,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputAdornment,
  Paper,
  Fade,
  Zoom
} from '@mui/material';
import {
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  Favorite,
  Block,
  Report,
  Phone,
  VideoCall,
  Search,
  FilterList,
  Star,
  Verified,
  Online,
  Offline,
  Schedule,
  Image,
  Gif,
  Sticker,
  Mic,
  MicOff,
  VolumeUp,
  VolumeOff,
  Settings,
  Archive,
  Delete,
  MarkAsUnread,
  Pin,
  Unpin
} from '@mui/icons-material';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  PremiumButton, 
  PremiumCard, 
  fadeInUp,
  staggerContainer,
  scaleIn
} from '../components/animations/AdvancedAnimations';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'emoji' | 'voice' | 'gif';
  isRead: boolean;
  isLiked: boolean;
  replyTo?: string;
}

interface Chat {
  id: string;
  person: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastSeen: string;
    verified: boolean;
    age: number;
    distance: number;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isPinned: boolean;
  isArchived: boolean;
  messages: ChatMessage[];
}

const PremiumChat: React.FC = () => {
  const theme = useTheme();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      person: {
        id: '1',
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        isOnline: true,
        lastSeen: 'vor 2 Minuten',
        verified: true,
        age: 28,
        distance: 5
      },
      lastMessage: 'Hey! Wie war dein Tag? 😊',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      isPinned: true,
      isArchived: false,
      messages: [
        {
          id: '1',
          senderId: '1',
          content: 'Hi! Schön, dass wir uns gematcht haben! 👋',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          type: 'text',
          isRead: true,
          isLiked: false
        },
        {
          id: '2',
          senderId: 'me',
          content: 'Hallo Sarah! Freut mich auch sehr! Wie geht es dir?',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          type: 'text',
          isRead: true,
          isLiked: false
        },
        {
          id: '3',
          senderId: '1',
          content: 'Hey! Wie war dein Tag? 😊',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'text',
          isRead: false,
          isLiked: false
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
        lastSeen: 'vor 1 Stunde',
        verified: true,
        age: 32,
        distance: 12
      },
      lastMessage: 'Lass uns mal was zusammen unternehmen!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
      messages: [
        {
          id: '1',
          senderId: '2',
          content: 'Hey! Du hattest recht, das Konzert war fantastisch! 🎵',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          type: 'text',
          isRead: true,
          isLiked: true
        },
        {
          id: '2',
          senderId: 'me',
          content: 'Freut mich, dass es dir gefallen hat! Welcher Song war dein Favorit?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
          type: 'text',
          isRead: true,
          isLiked: false
        },
        {
          id: '3',
          senderId: '2',
          content: 'Lass uns mal was zusammen unternehmen!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          type: 'text',
          isRead: true,
          isLiked: false
        }
      ]
    }
  ]);

  const currentChat = chats.find(chat => chat.id === selectedChat);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      content: newMessage,
      timestamp: new Date(),
      type: 'text',
      isRead: false,
      isLiked: false
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

  const handleLikeMessage = (messageId: string) => {
    setChats(prev => prev.map(chat => 
      chat.id === selectedChat 
        ? {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.id === messageId 
                ? { ...msg, isLiked: !msg.isLiked }
                : msg
            )
          }
        : chat
    ));
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

  const filteredChats = chats.filter(chat => 
    chat.person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      {/* Enhanced Chat List */}
      <Box sx={{ 
        width: 400, 
        borderRight: 1, 
        borderColor: 'divider', 
        bgcolor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Chat Header */}
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Nachrichten
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Suche">
                <IconButton onClick={() => setShowSearch(!showSearch)}>
                  <Search />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filter">
                <IconButton>
                  <FilterList />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
          
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <TextField
                fullWidth
                placeholder="Chats durchsuchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
              />
            </motion.div>
          )}
        </Box>
        
        {/* Chat List */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <List>
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ListItem
                  button
                  selected={selectedChat === chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.50',
                      '&:hover': { bgcolor: 'primary.100' }
                    },
                    position: 'relative'
                  }}
                >
                  {chat.isPinned && (
                    <Pin sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8, 
                      fontSize: 16, 
                      color: 'primary.main' 
                    }} />
                  )}
                  
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        chat.person.isOnline ? (
                          <Box sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            bgcolor: 'success.main', 
                            border: '2px solid white' 
                          }} />
                        ) : null
                      }
                    >
                      <Avatar src={chat.person.avatar} sx={{ width: 56, height: 56 }} />
                    </Badge>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {chat.person.name}
                        </Typography>
                        {chat.person.verified && (
                          <Verified sx={{ fontSize: 16, color: 'success.main' }} />
                        )}
                        {chat.unreadCount > 0 && (
                          <Chip
                            label={chat.unreadCount}
                            size="small"
                            color="primary"
                            sx={{ minWidth: 20, height: 20, fontSize: '0.75rem' }}
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
                            maxWidth: 250,
                            fontWeight: chat.unreadCount > 0 ? 600 : 400
                          }}
                        >
                          {chat.lastMessage}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {formatTime(chat.lastMessageTime)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            • {chat.person.distance} km
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <IconButton 
                      size="small"
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget);
                        setSelectedChat(chat.id);
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </Box>
      </Box>

      {/* Enhanced Chat Messages */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentChat ? (
          <>
            {/* Enhanced Chat Header */}
            <Box sx={{ 
              p: 3, 
              borderBottom: 1, 
              borderColor: 'divider', 
              bgcolor: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Avatar src={currentChat.person.avatar} sx={{ width: 48, height: 48 }} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6">{currentChat.person.name}</Typography>
                  {currentChat.person.verified && (
                    <Verified sx={{ fontSize: 20, color: 'success.main' }} />
                  )}
                  <Chip 
                    label={`${currentChat.person.age}`} 
                    size="small" 
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {currentChat.person.isOnline ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Online sx={{ fontSize: 16, color: 'success.main' }} />
                      <Typography variant="body2" color="success.main">
                        Online
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Offline sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        Zuletzt online {currentChat.person.lastSeen}
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    • {currentChat.person.distance} km entfernt
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Anrufen">
                  <IconButton>
                    <Phone />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Video-Call">
                  <IconButton>
                    <VideoCall />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Weitere Optionen">
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <MoreVert />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Enhanced Messages */}
            <Box sx={{ 
              flex: 1, 
              overflow: 'auto', 
              p: 2, 
              bgcolor: 'grey.50',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f0f0f0" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}>
              <AnimatePresence>
                {currentChat.messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: message.senderId === 'me' ? 'flex-end' : 'flex-start',
                        mb: 2
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Paper
                          sx={{
                            maxWidth: '70%',
                            bgcolor: message.senderId === 'me' ? 'primary.main' : 'white',
                            color: message.senderId === 'me' ? 'white' : 'text.primary',
                            borderRadius: 3,
                            p: 2,
                            position: 'relative',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            '&:hover': {
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }
                          }}
                        >
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            {message.content}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            mt: 1
                          }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: message.senderId === 'me' ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                                fontSize: '0.75rem'
                              }}
                            >
                              {formatTime(message.timestamp)}
                            </Typography>
                            
                            {message.senderId !== 'me' && (
                              <IconButton
                                size="small"
                                onClick={() => handleLikeMessage(message.id)}
                                sx={{ 
                                  color: message.isLiked ? 'error.main' : 'inherit',
                                  '&:hover': { color: 'error.main' }
                                }}
                              >
                                <Favorite sx={{ fontSize: 16 }} />
                              </IconButton>
                            )}
                          </Box>
                          
                          {message.isLiked && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              style={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                color: '#ff6b6b'
                              }}
                            >
                              <Favorite sx={{ fontSize: 20 }} />
                            </motion.div>
                          )}
                        </Paper>
                      </motion.div>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </Box>

            {/* Enhanced Message Input */}
            <Box sx={{ 
              p: 2, 
              borderTop: 1, 
              borderColor: 'divider', 
              bgcolor: 'white' 
            }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                <Tooltip title="Anhänge">
                  <IconButton onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}>
                    <AttachFile />
                  </IconButton>
                </Tooltip>
                
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: 'grey.50'
                    }
                  }}
                />
                
                <Tooltip title="Emoji">
                  <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <EmojiEmotions />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Sprachnachricht">
                  <IconButton 
                    onMouseDown={() => setIsRecording(true)}
                    onMouseUp={() => setIsRecording(false)}
                    sx={{ 
                      bgcolor: isRecording ? 'error.main' : 'transparent',
                      color: isRecording ? 'white' : 'inherit'
                    }}
                  >
                    {isRecording ? <MicOff /> : <Mic />}
                  </IconButton>
                </Tooltip>
                
                <PremiumButton
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="small"
                >
                  <Send />
                </PremiumButton>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.50'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Chat sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  Wähle einen Chat aus
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Beginne eine Unterhaltung mit deinen Matches
                </Typography>
              </Box>
            </motion.div>
          </Box>
        )}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Star sx={{ mr: 1 }} />
          Favorisieren
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Pin sx={{ mr: 1 }} />
          Anheften
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Archive sx={{ mr: 1 }} />
          Archivieren
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setShowReportDialog(true)}>
          <Report sx={{ mr: 1 }} />
          Melden
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          <Block sx={{ mr: 1 }} />
          Blockieren
        </MenuItem>
      </Menu>

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onClose={() => setShowReportDialog(false)}>
        <DialogTitle>Nutzer melden</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Warum möchtest du diesen Nutzer melden?
          </Typography>
          <Stack spacing={1}>
            <Button variant="outlined" fullWidth>Unangemessene Inhalte</Button>
            <Button variant="outlined" fullWidth>Spam</Button>
            <Button variant="outlined" fullWidth>Fake-Profil</Button>
            <Button variant="outlined" fullWidth>Belästigung</Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowReportDialog(false)}>Abbrechen</Button>
          <PremiumButton variant="contained" onClick={() => setShowReportDialog(false)}>
            Melden
          </PremiumButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PremiumChat;
