import React, { useState } from "react";

const Handleform = () => {
  const [names, setNames] = useState<string[]>([]);
  const [inputName, setInputName] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputName) {
      setNames([...names, inputName]);
      setInputName("");
    }
  };

  return (
    <div>
      <h1>Name List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          placeholder="Enter a name"
          value={inputName}
          onChange={(e) => handleNameChange(e)}
        />
        <button type="submit">Add Name</button>
      </form>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Handleform;
