import {HubConnectionBuilder} from "@microsoft/signalr"
import { WaitingRoom } from "./components/WaitingRoom";
import { Chat } from "./components/Chat";
import { useState } from "react";
function App() {
  const [connection, setConnection] = useState(null);
  const [chatRoom, setChatRoom] = useState("");
  const [messages, setMesssages] = useState([]);

  const joinChat = async (userName, chatRoom)=>{
    var connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5259/chat")
    .withAutomaticReconnect()
    .build();

    connection.on("ReceiveMessage", (userName, message)=>{
      console.log(message);
      setMesssages((messages)=>[...messages, {userName, message}]);
    });

    try{
      await connection.start();
      await connection.invoke("JoinChat", {userName, chatRoom});
      console.log(connection);
      
      setConnection(connection);
      setChatRoom(chatRoom);
    }
    catch(error){
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex item-center justify-center bg-gray-100">
      {connection?
      <Chat messages={messages} chatRoom={chatRoom}/>:
      <WaitingRoom joinChat={joinChat}/>}
    </div> 
  );
}

export default App;
