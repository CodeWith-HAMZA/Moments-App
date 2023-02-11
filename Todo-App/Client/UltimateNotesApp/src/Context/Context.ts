import React from "react"
import { ContextObj } from "../Interfaces/ContextObj";

const Context = React.createContext<ContextObj | null>(null);
export default Context;

 // Change 