import { createContext } from "vm";

export const settings= () =>{
    const settings = createContext({
        debugMode : true
    });
}