export function openRealtime(onEvent, onConnectionChange) {
  const url = (window.location.protocol === 'https:' ? 'wss://' : 'ws://') + window.location.hostname + ':8000/ws';
  let ws = null;
  let retry = 0;
  
  function connect() {
    ws = new WebSocket(url);
    
    ws.onopen = () => { 
      retry = 0;
      if (onConnectionChange) onConnectionChange(true);
    };
    
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data && onEvent) onEvent(data);
      } catch (_) {
        // ignore
      }
    };
    
    ws.onclose = () => {
      if (onConnectionChange) onConnectionChange(false);
      // exponential backoff reconnect
      const timeout = Math.min(30000, 1000 * Math.pow(2, retry++));
      setTimeout(connect, timeout);
    };
    
    ws.onerror = (error) => {
      if (onConnectionChange) onConnectionChange(false, error);
      try { ws.close(); } catch (_) {}
    };
  }
  
  connect();
  
  return () => { 
    try { 
      if (ws) {
        ws.close();
        if (onConnectionChange) onConnectionChange(false);
      }
    } catch (_) {} 
  };
}
