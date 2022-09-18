import react, { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

const Chat = () => {
  const [input, setInput] = useState("");

  const handleSubmitNewMessage = useCallback(() => {
    console.log("handle Send,,, ", input);
    socket.emit("message", { data: "input" });
  }, [input]);

  const handleNewMessage = useCallback((message) => {
    console.log("handleNewMessage,,, ", message);
  }, []);

  useEffect(() => {
    socket.on("message", ({ data }) => {
      handleNewMessage(data);
    });
  });

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(ev) => setInput(ev.target.value)}
      />
      <button onClick={handleSubmitNewMessage}>send</button>
    </div>
  );
};

export default Chat;
