import React from "react";
import "./textInput.css";
import { Header } from "../../stories/Header";

interface ITextInput {
  size: string;
}

type User = {
  name: string;
};

export const TextInput = ({ size }: ITextInput) => {
  const [user, setUser] = React.useState<User>();
  return (
    <>
      <Header
        user={user}
        onLogin={() => {
          setUser({ name: "John" });
        }}
        onLogout={() => {
          setUser(undefined);
        }}
        onCreateAccount={() => {
          setUser({ name: "John Doe" });
        }}
      />
      <div className="stories-container">
        <label htmlFor="story">Stories</label>
        <input type="text" id="story" name="story" />
      </div>
    </>
  );
};
