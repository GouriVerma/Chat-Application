import SocketContext from "../Context/SocketContext";
import { useContext } from "react";

const useSocket=()=>{
    return useContext(SocketContext);
}

export default useSocket;