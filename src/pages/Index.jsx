import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  IconButton,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';

const Chatbot = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');

      // TODO: Send message to server and get response
      // Placeholder for backend integration
      // setMessages(messages => [...messages, { text: "AI response", sender: 'bot' }]);
    }
  };

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="popover"
    >
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p="4"
          spacing="4"
          minW="300px"
          maxW="sm"
          maxH="400px"
          overflowY="auto"
        >
          <HStack justifyContent="space-between" w="full">
            <Text fontWeight="bold">Chat with us!</Text>
            <IconButton
              aria-label="Close chat"
              icon={<FaTimes />}
              size="sm"
              onClick={onClose}
            />
          </HStack>
          <VStack spacing="3" alignItems="flex-start" w="full" overflowY="auto">
            {messages.map((msg, index) => (
              <Box
                key={index}
                alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                bg={msg.sender === 'user' ? 'blue.100' : 'gray.100'}
                borderRadius="md"
                p="2"
              >
                <Text fontSize="sm">{msg.text}</Text>
              </Box>
            ))}
          </VStack>
          <HStack as="form" onSubmit={e => e.preventDefault()} w="full">
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton
              aria-label="Send message"
              icon={<FaPaperPlane />}
              onClick={handleSendMessage}
            />
          </HStack>
        </VStack>
      </Collapse>
      <Button
        leftIcon={<FaRobot />}
        colorScheme="teal"
        variant="solid"
        size="lg"
        shadow="md"
        onClick={onToggle}
        borderRadius="full"
      >
        Chat
      </Button>
    </Box>
  );
};

const Index = () => {
  return (
    <Box w="100%" h="100vh">
      {/* Other page elements can be added here */}
      <Chatbot />
    </Box>
  );
};

export default Index;
This code provides a simple UI for a chatbot that can be toggled open and closed. When the user sends a message, it is added to the chat history. There's a placeholder for where you'd integrate with a backend service to get responses.

As for the backend with Express, I can only provide a pseudo-code outline as comments since I'm not able to provide actual separate files:

// src/server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    
    // TODO: Integrate with OpenAI API to get a response
    // const response = "AI response"; // Placeholder for actual AI response
    // socket.emit('chat message', response);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
