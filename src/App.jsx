import { useState,useCallback,useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const passwordRef=useRef()
  const [password, setPassword] = useState("");
  const [length, setLength]=useState(6);
  const [numberAllowed, setNumberAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);

  const generatePassword = useCallback(()=>{
    let pass= ""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXabcdefghijklmnoqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if (charAllowed) str +="!#@$%^&*()-+"

    for(let i=1; i<length; i++){
     const char= Math.floor(Math.random()*str.length+1)
     pass+=str.charAt(char)
    }
    
    setPassword(pass)
  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])

  const copyPass = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-200">
      <h1 className="text-4xl text-black text-center my-3">
        Password Generator
      </h1>
      <div className="flex rounded-lg overflow-hidden shadow mb-4">
        <input
          className="w-full px-2 py-2"
          type="text"
          value={password}
          placeholder="password"
          ref={passwordRef}
          readOnly
        />
        <button onClick={copyPass} className="bg-blue-700 text-white px-3 py-0.5 shrink-0">
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            name=""
            id=""
            min={6}
            max={40}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
