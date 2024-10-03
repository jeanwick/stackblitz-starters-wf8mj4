const WebSocket = require('ws');

// Function to handle WebSocket connection
function connectAISStream() {
  const ws = new WebSocket('wss://stream.aisstream.io/v0/stream');

  // On WebSocket connection open
  ws.onopen = function () {
    console.log('WebSocket connection opened.');

    const subscriptionMessage = {
      APIKey: 'd19b998ef294b9e5e4889c8df050742eddf303bc',  // Replace with your AISStream API Key
      BoundingBoxes: [[[-34.013399, 18.410718], [-33.895056, 18.452209]]],  // Example bounding box for a port
      FiltersShipMMSI: [],  // Optional, filter by MMSI if needed
      FilterMessageTypes: ['PositionReport'],  // Message type filter
    };

    ws.send(JSON.stringify(subscriptionMessage));
    console.log('Subscription message sent:', subscriptionMessage);
  };

  // Handle incoming messages from the WebSocket
  ws.onmessage = function (event) {
    console.log('Message from AIS stream received:', event.data);

    // Add your logic here to process the received data.
    // Example: Store it in a database, print to console, or process it for other use cases.
  };

  // Handle WebSocket errors
  ws.onerror = function (error) {
    console.error('WebSocket error:', error);
  };

  // Handle WebSocket closure and reconnect on error
  ws.onclose = function (event) {
    console.log(`WebSocket connection closed with code: ${event.code}, reason: ${event.reason}`);
    if (event.code !== 1000) {  // If the closure is abnormal, attempt to reconnect
      console.log('Attempting to reconnect...');
      setTimeout(connectAISStream, 1000);  // Reconnect after 1 second
    }
  };
}

// Initiate the connection
connectAISStream();