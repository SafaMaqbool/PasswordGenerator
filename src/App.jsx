import { useState, useCallback, useRef, useEffect } from "react";

function App() {
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("");

  const copyPasswordToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      passwordRef.current?.select();
    }
  };

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-7 py-3 my-8 bg-slate-200">
        <h1 className="text-4xl text-black text-center my-3">
          Password Generator
        </h1>
        <PasswordDisplay
          password={password}
          copyPasswordToClipboard={copyPasswordToClipboard}
          passwordRef={passwordRef}
        />
        <PasswordOptions setPassword={setPassword} />
      </div>
    </main>
  );
}

const PasswordDisplay = ({
  password,
  copyPasswordToClipboard,
  passwordRef,
}) => (
  <div className="flex rounded-lg overflow-hidden shadow mb-4">
    <input
      className="w-full px-2 py-2"
      type="text"
      value={password}
      placeholder="Generated password"
      ref={passwordRef}
      readOnly
    />
    <button
      onClick={copyPasswordToClipboard}
      className="bg-blue-700 text-white px-3 py-0.5 shrink-0"
    >
      Copy
    </button>
  </div>
);

const CheckboxWithLabel = ({ id, label, checked, onChange }) => (
  <div className="flex items-center gap-x-2">
    <input id={id} type="checkbox" checked={checked} onChange={onChange} />
    <label htmlFor={id} className="select-none">
      {label}
    </label>
  </div>
);

const PasswordOptions = ({ setPassword }) => {
  const [passwordLength, setPasswordLength] = useState(6);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

  const generatePassword = useCallback(() => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSpecialChars) characters += "!#@$%^&*()-+";

    const pass = Array.from({ length: passwordLength }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");

    setPassword(pass);
  }, [passwordLength, includeNumbers, includeSpecialChars, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [passwordLength, includeNumbers, includeSpecialChars, generatePassword]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <label htmlFor="length" className="select-none">
          Length: {passwordLength}
        </label>
        <input
          id="length"
          type="range"
          min={6}
          max={40}
          value={passwordLength}
          className="cursor-pointer"
          onChange={(e) => setPasswordLength(Number(e.target.value))}
        />
      </div>
      <CheckboxWithLabel
        id="numbers"
        label="Include Numbers"
        checked={includeNumbers}
        onChange={() => setIncludeNumbers((prev) => !prev)}
      />
      <CheckboxWithLabel
        id="specialChars"
        label="Include Special Characters"
        checked={includeSpecialChars}
        onChange={() => setIncludeSpecialChars((prev) => !prev)}
      />
    </div>
  );
};

export default App;
