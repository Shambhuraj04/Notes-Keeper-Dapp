import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Zoom from "@mui/material/Zoom";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [inputTexts, setInputTexts] = useState({ title: "", content: "" });
  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputTexts((prevValue) => ({ ...prevValue, [name]: value }));
  }

  function expand() {
    setIsExpanded(true);
  }

  return (
    <div className="textarea">
      <form>
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            value={inputTexts.title}
            onChange={handleChange}
          />
        )}

        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 4 : 1}
          value={inputTexts.content}
          onChange={handleChange}
          onClick={expand}
        />
        {isExpanded && (
          <Zoom in={isExpanded ? true : false}>
            <button
              onClick={() => {
                props.onAdd(inputTexts);
                setInputTexts({ title: "", content: "" });
                setIsExpanded(false);
              }}
            >
              <AddIcon />
            </button>
          </Zoom>
        )}
      </form>
    </div>
  );
}

export default CreateArea;
