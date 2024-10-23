"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function TodoDetail() {
  const router = useRouter();

  // text passed as query parameter
  const searchParams = useSearchParams();

  // id passed in path
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const numericId = parseInt(id, 10);
  const text = searchParams.get("text");

  function removeToDo() {
    const oldStorage = localStorage.getItem("todos");

    if (oldStorage) {
      let todos = JSON.parse(oldStorage);

      // grab all todos except he one to be deleted (the current id)
      todos = todos.filter((todo: any) => todo.id !== numericId);

      // Save the updated list back to localStorage
      localStorage.setItem("todos", JSON.stringify(todos));
      // Optionally, navigate back to the main list or give feedback to the user
      router.push("/"); // Redirect back to the home page
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-32">
      <h1 className="m-10 border border-white p-5">{text}</h1>
      <button
        onClick={() => router.push("/")}
        className="border border-white p-5"
      >
        Go Back
      </button>

      <button onClick={removeToDo} className="border border-white p-5">
        Remove ToDo
      </button>
    </div>
  );
}
