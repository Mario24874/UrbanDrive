import React, { useState } from 'react';

const Messages = ({ messages, newMessage, setNewMessage, handleSendMessage }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await handleSendMessage(newMessage);
      setNewMessage('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 bg-opacity-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Messages</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-4 space-y-2">
        {messages.map((message) => (
          <li key={message.id} className="text-gray-300">
            {message.message}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <input
            type="text"
            className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
            placeholder="New Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Messages;