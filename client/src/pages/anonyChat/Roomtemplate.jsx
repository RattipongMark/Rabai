import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAnony from '../../hooks/anonyChat/useAnony';
import useChat from '../../hooks/anonyChat/useChat';
import useRoom from '../../hooks/anonyChat/useRoom';
import io from 'socket.io-client';

const RoomTemplate = () => {
  const { roomName } = useParams();

  const {
    loading,
    fetchError,
    fakeName,
    userCount,
    message,
    setMessage,
    sending,
    error,
    messages,
    handleSendMessage
  } = useRoom();

  return (
    <div className="room-template max-w-3xl mx-auto my-6 p-4 border rounded-lg shadow-lg">
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : fetchError ? (
        <div className="text-center text-red-600">{fetchError.message}</div>
      ) : (
        <div className="fake-name text-center">
          <h1 className="text-2xl font-semibold">Welcome to {roomName} {userCount.count}</h1>
          <h3 className="text-xl text-gray-700">Welcome, {fakeName}!</h3>
        </div>
      )}

      <div className="room-content mt-6">
        <div className="message-list space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`message-item ${msg.userName === fakeName ? 'flex justify-end' : 'flex justify-start'}`}>
              <div className={`message-content p-4 rounded-lg ${msg.userName === fakeName ? 'bg-orange-500 text-white' : 'bg-white text-black'}`}>
                <strong>{msg.userName}: </strong>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="message-form flex flex-col space-y-4">
          <textarea
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="3"
          />
          <div className="flex justify-between items-center">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              onClick={handleSendMessage}
              disabled={sending}
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTemplate;



  