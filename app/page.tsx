"use client";

import Header from "./Header";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  // Custom Type -----------------------------------------------
  type Todo = {
    text: string;
    id: number;
  };

  // Variables -------------------------------------------------
  const [todo, setToDo] = useState(""); // Controlled input for the todo text
  const [elements, setElements] = useState<Todo[]>([]); // Start with an empty array for todos

  // Effects ---------------------------------------------------
  // Load todos from localStorage on initial load
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    console.log("Todods: ", savedTodos);

    if (savedTodos) {
      setElements(JSON.parse(savedTodos)); // Parse the stored string and set it in elements state
    }

    //console.log("Retrieved todos: ", savedTodos);
  }, []); // Empty dependency array ensures this runs only on initial render

  // Save todos to localStorage whenever elements change
  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem("todos", JSON.stringify(elements)); // Store elements in localStorage
      //console.log("Saving todos: ", elements);
    }
  }, [elements]); // Run effect when elements state changes

  // Functions --------------------------------------------------

  function updateToDo(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setToDo(e.target.value);
  }

  function addToDo() {
    if (todo.trim()) {
      // Ensure we don't add empty todos
      setElements([...elements, { text: todo, id: elements.length }]); // Add new todo with unique id
      setToDo(""); // Clear the input after adding
    }
  }

  function clearToDo() {
    // Clear Local Storage
    localStorage.removeItem("todos");
    // Update elements state
    setElements([]);
  }


  // Return ----------------------------------------------------

  return (
    <div id="home">
      <Header />

      <div className="flex flex-col border m-4 p-6 items-center ">
        <textarea
          value={todo}
          onChange={updateToDo}
          className="border border-white resize-none bg-black h-24 w-4/5 mt-2 mr-auto ml-auto text-white placeholder:text-neutral-400"
          placeholder="Add Your Todo"
        />

        <button
          className="border border-white p-5 m-10 w-10/12 hover:bg-white hover:text-black transition-colors duration-500"
          onClick={addToDo}
        >
          Add ToDo
        </button>

        <div className="flex items-center justify-evenly flex-wrap gap-y-0 gap-x-0 w-full">
          {elements.map((element) => (
            <div
              className="border border-white p-10 m-10 hover:bg-white hover:text-black transition-colors duration-300 flex-grow"
              key={element.id} // Use unique id
            >
              <Link href={`/todo/${element.id}?text=${element.text}`}>
                {element.text}
              </Link>{" "}
              {/* Display the todo text */}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="border border-white p-4 hover:text-black hover:bg-white transition-colors duration-1000"
          onClick={clearToDo}
        >
          Clear Todos
        </button>
      </div>
    </div>
  );
}
