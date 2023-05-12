import React from "react";
import "./textInput.css";

interface ITextInput {
  size: string;
}

export const TextInput = ({ size }: ITextInput) => {
  return (
    <>
      <div className="stories-container">
        <label htmlFor="story">Stories</label>
        <input type="text" id="story" name="story" />
      </div>
    </>
  );
};
