// Importing WebSocket package
const WebSocket = require('ws');

// Set up the WebSocket connection to AISStream
const socket = new WebSocket('wss://stream.aisstream.io/v0/stream');

// Your API key and subscription parameters for AIS stream
const subscriptionMessage = {
  APIKey: 'd19b998ef294b9e5e4889c8df050742eddf303bc', // Your API Key
  BoundingBoxes: [
    [
      [-34.013399, 18.410718],
      [-33.895056, 18.452209],
    ],
  ], // Example bounding box (Cape Town)
  FiltersShipMMSI: [], // Can be left empty or filled with specific ship MMSI numbers
  FilterMessageTypes: ['PositionReport'], // We want PositionReport types
};

// Handle WebSocket connection opening
socket.on('open', function open() {
  console.log('WebSocket connection opened.');
  socket.send(JSON.stringify(subscriptionMessage));
  console.log('Subscription message sent:', subscriptionMessage);
});

// Handle incoming WebSocket messages
socket.on('message', function message(data) {
  console.log('Message from AIS stream received:', data);
});

// Handle WebSocket errors
socket.on('error', function error(err) {
  console.error('WebSocket error:', err);
});

// Handle WebSocket closing
socket.on('close', function close(code, reason) {
  console.log(`WebSocket closed with code: ${code}, reason: ${reason}`);
});
