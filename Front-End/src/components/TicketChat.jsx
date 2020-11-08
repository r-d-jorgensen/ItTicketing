import React, { useEffect, useRef, useState } from 'react';

const WS_URL = process.env.TICKET_WEBSOCKET_URL;

function TicketChat() {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);
  const inputEl = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    ws.current.onopen = () => { console.log('ws opened'); };
    ws.current.onclose = () => { console.log('ws closed'); };
    ws.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setMessages((val) => [...val, msg]);
    };

    return () => { ws.current.close(); };
  }, []);

  const sendMessage = () => {
    const msg = JSON.stringify(inputEl.current.value);
    ws.current.send(msg);
  };

  return (
    <div>
      <ul>
        {messages.map(({ id, msg }) => <li key={id.toString()}>{msg}</li>)}
      </ul>

      <input ref={inputEl} type="text" placeholder="Message" />
      <button type="button" onClick={sendMessage}>Send</button>
    </div>
  );
}

export { TicketChat as default };
