import React from 'react';
import { useParams } from 'react-router-dom';

const RoomTemplate = () => {
  const { roomName } = useParams();

  return (
    <div className="room-template">
      <h1>Welcome to {roomName}</h1>
      {/* Room-specific content goes here */}
    </div>
  );
};

export default RoomTemplate;
