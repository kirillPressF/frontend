import {HubConnectionBuilder} from "@microsoft/signalr"
import { WaitingRoom } from "./components/WaitingRoom";
function App() {
  const joinChat = async (userName, chatRoom)=>{
    var connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5259/chat")
    .withAutomaticReconnect()
    .build();
    try{
      await connection.start();
      await connection.invoke("JoinChat", {userName, chatRoom})
    }
    catch(error){
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex item-center justify-center bg-gray-100">
      <WaitingRoom joinChat={joinChat}/>
    </div> 
  );
}

export default App;
