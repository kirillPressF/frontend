import {Button, Heading, Input, Text} from "@chakra-ui/react"
import { useState } from "react";
export const WaitingRoom=({joinChat})=>{
const [userName, setUserName] = useState();
const [chatName, setChatName] = useState();

    const onSubmit = (e) =>{
        e.PreventDefault();
        joinChat(userName, chatName);
    }
    return(
        <form onSubmit={onSubmit}>
            <Heading>
                Online Chat
            </Heading>
            <div className="mb-4">
                <Text fontSize={"sm"}>User name</Text>
                <Input name="userName" placeholder="Enter your name"
                onChange={(e)=>setUserName(e.target.value)}/>
            </div>
            <div className="mb-4">
                <Text fontSize={"sm"}>Chat name</Text>
                <Input name="chatName" placeholder="Enter chat name"
                onChange={(e)=>setChatName(e.target.value)}/>
            </div>
            <Button type="submit" colorScheme="blue">Join up</Button>
        </form>
    );
}