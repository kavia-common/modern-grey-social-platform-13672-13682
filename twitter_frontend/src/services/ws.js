const WS_URL = process.env.REACT_APP_WS_URL || '';

/**
 * PUBLIC_INTERFACE
 * useFeedSocket - React hook-like function to subscribe to feed updates.
 * This returns an object with connect and disconnect so caller controls lifecycle.
 * On message, it calls the provided callback with parsed JSON.
 */
export function useFeedSocket(onMessage) {
  let socket;

  function connect() {
    if (!WS_URL) return;
    try {
      socket = new WebSocket(WS_URL);
      socket.onopen = () => {};
      socket.onmessage = (evt) => {
        try {
          const data = JSON.parse(evt.data);
          if (onMessage) onMessage(data);
        } catch {
          // ignore parse errors
        }
      };
      socket.onerror = () => {};
      socket.onclose = () => {};
    } catch {
      // ignore
    }
  }

  function disconnect() {
    try {
      if (socket && socket.readyState === 1) socket.close();
    } catch {
      // ignore
    }
  }

  return { connect, disconnect };
}
