import React from "react";
import NoteContext from "./notecontext.js";
import { useState } from "react";
const NoteState = (props) => {
  const [userInfo, setuserInfo] = useState("");
  return (
    <NoteContext.Provider value={{ userInfo, setuserInfo }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
