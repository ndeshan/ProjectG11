from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Any, Dict
import json

router = APIRouter()

class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast_text(self, message: str):
        to_remove = []
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except Exception:
                to_remove.append(connection)
        for conn in to_remove:
            self.disconnect(conn)

    async def broadcast_json(self, data: Dict[str, Any]):
        await self.broadcast_text(json.dumps(data, default=str))

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep the connection alive; optionally handle inbound control messages
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)

async def broadcast_event(event_type: str, payload: Dict[str, Any]):
    """Broadcast a structured event to all connected clients."""
    await manager.broadcast_json({
        "type": event_type,
        "data": payload,
    })
