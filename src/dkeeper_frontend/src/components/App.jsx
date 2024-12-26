import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper_backend } from "../../../declarations/dkeeper_backend/index";
function App() {
  const [notes, setNotes] = useState([]);
  function addItem(inputTexts) {
    setNotes((prevNotes) => {
      dkeeper_backend.createNote(inputTexts.title,inputTexts.content);
      return [ inputTexts,...prevNotes];
    });
   
  }

  useEffect(()=>{
    console.log("Triggered");
    fetchData();
  },[]);

  async function fetchData() {
    const notesArray = await dkeeper_backend.readNotes();
    setNotes(notesArray);
  }

  function deleteItem(id) {
    dkeeper_backend.removeNote(id);
    setNotes((prevValue) => {
      return prevValue.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addItem} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteItem}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
