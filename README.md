
# DKeeper: A Decentralized Note-Taking App with React and Motoko

**DKeeper** is a decentralized note-taking application that leverages the **Internet Computer (IC)** blockchain to securely store and manage your notes. Built using **React** for the frontend and **Motoko** for the backend, this app combines the power of blockchain technology with the convenience of modern web development to deliver a seamless note-taking experience.

### Features
- **Decentralized Notes Storage**: Notes are stored on the **Internet Computer** blockchain, ensuring secure and permanent storage.
- **Create, Read, and Delete Notes**: Easily create new notes, view existing ones, and remove them when necessary.
- **Real-Time Updates**: Automatically updates the UI to reflect changes in the notes without refreshing the page.
- **React Frontend**: Modern and responsive UI using React, providing a smooth user experience.
- **Motoko Backend**: The backend is built using Motoko, a language designed for the Internet Computer, allowing for stable and scalable note storage.

---
To learn more before you start working with dkeeper, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Backend Structure](#backend-structure)
- [Frontend Structure](#frontend-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

---

## Installation

### 1. Clone the Repository
To get started, first clone the repository to your local machine:
```bash
git clone https://github.com/Shambhuraj04/Notes-keeper-Dapp.git
cd dkeeper
```

### 2. Install Backend Dependencies
The backend is built using **Motoko** and **DFX** (the Internet Computer SDK). To set it up, run the following commands:
```bash
dfx config --identity default
dfx start  # Starts the replica, running in the background
dfx deploy # Deploys your canisters to the replica and generates your candid interface
```

This will start the **Internet Computer local replica** and deploy the backend to your local environment.
Also using CandidUI your base application will be available at `http://localhost:8000?canisterId={asset_canister_id}` for testing backend code.

### 3. Install Frontend Dependencies
The frontend uses **React**. To set it up, run:
```bash

npm install
npm start
```
This will start the React development server, and you can access the app at `http://localhost:8080`.
The command starts a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.

---

## Usage

Once everything is set up, follow these steps to use the app:

1. Open the app in your browser (`http://localhost:3000`).
2. Use the **Create Area** to add new notes. Notes will be stored on the blockchain and displayed in the app.
3. View the list of all your notes in the main section.
4. Delete notes by clicking the **Delete** button next to each note.

Since the app uses the Internet Computer blockchain, your notes will persist across different devices and sessions, provided you're interacting with the same canister.

---

## Backend Structure

The backend is a simple **Motoko actor** that provides three main functions:

1. **createNote**: Adds a new note with a title and content to the list.
2. **readNotes**: Retrieves all stored notes as an array.
3. **removeNote**: Deletes a note by its index (ID).

Here’s a quick look at the backend code:

```motoko
import List "mo:base/List";
import Debug "mo:base/Debug";

actor Dkeeper {
  public type Note = { title: Text; content: Text };
  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {
    let newNote : Note = { title = titleText; content = contentText };
    notes := List.push(newNote, notes);
    Debug.print(debug_show (notes));
  };

  public query func readNotes() : async [Note] {
    return List.toArray(notes);
  };

  public func removeNote(id: Nat) {
    var listFront = List.take(notes, id);
    var listBack = List.drop(notes, id + 1);
    notes := List.append(listFront, listBack);
  };
};
```

The actor stores notes in a stable variable, allowing the notes to persist across canister upgrades.

---

## Frontend Structure

The frontend is built using **React**. It handles the UI for creating, viewing, and deleting notes. It communicates with the backend through the **DFX SDK**.

Here’s a quick look at the core frontend components:

- **App.js**: The main component that manages state and UI logic.
- **Note.js**: Represents a single note in the list.
- **CreateArea.js**: A component for adding new notes.
- **Header.js**: Displays the app's title or header.
- **Footer.js**: Displays footer information.

The React app uses the `dkeeper_backend` object (generated by DFX) to call the backend functions and update the UI accordingly.

### Example Code for Fetching Notes:
```js
useEffect(() => {
  console.log("Triggered");
  fetchData();
}, []);

async function fetchData() {
  const notesArray = await dkeeper_backend.readNotes();
  setNotes(notesArray);
}
```

### Example Code for Deleting Notes:
```js
function deleteItem(id) {
  dkeeper_backend.removeNote(id);
  setNotes((prevValue) => {
    return prevValue.filter((item, index) => {
      return index !== id;
    });
  });
}
```

---

## Contributing

We welcome contributions to **DKeeper**! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Run tests (if applicable).
5. Submit a pull request.

Please ensure your code adheres to the project's coding style and includes tests where possible.

---


## Acknowledgements

- [React](https://reactjs.org/) for building the frontend.
- [Motoko](https://motoko-lang.org/) for creating a secure and scalable environment for the backend.
- [Internet Computer](https://dfinity.org/) for enabling decentralized applications with a distributed, fast, and secure blockchain.
  
---
### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`NODE_ENV` to `production` if you are using Webpack
- use your own preferred method to replace `process.env.NODE_ENV` in the autogenerated declarations
- Write your own `createActor` constructor
