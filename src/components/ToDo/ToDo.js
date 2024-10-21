import React, { useEffect, useState } from "react";
import "./ToDo.css";
export default function ToDo() {
  const [works, setWorks] = useState(() => {
    const savedWorks = localStorage.getItem("works");
    return savedWorks ? JSON.parse(savedWorks) : [];
  });
  const [work, setWork] = useState("");
  useEffect(() => {
    localStorage.setItem("works", JSON.stringify(works));
  }, [works]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (work.trim() === "") return;
    const newWorks = {
      id: Date.now(),
      name: work,
      isCompleted: false,
    };
    setWorks([...works, newWorks]);
    setWork("");
  };
  const handleDelete = (workToDel) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${workToDel.name}" ?`
    );
    if (confirmDelete) {
      setWorks([...works].filter((work) => workToDel.id !== work.id));
    }
  };
  const handleComplete = (workToHandle) => {
    setWorks(
      works.map((work) => {
        if (work.id === workToHandle.id) {
          return { ...work, isCompleted: !work.isCompleted };
        }
        return work;
      })
    );
  };
  const handleDragStart = (e, work) => {
    e.dataTransfer.setData("workID", work.id);
  };
  const handleDrop = (e, workToDropOn) => {
    e.preventDefault();
    const workID = e.dataTransfer.getData("workID");
    const workDropID = workToDropOn.id;
    const index1=works.findIndex((work)=>work.id===workDropID);
    const index2=works.findIndex((work)=>work.id===Number(workID));
    const newWorks=[...works];
    let temp=newWorks[index1];
    newWorks[index1]=newWorks[index2];
    newWorks[index2]=temp;
    setWorks(newWorks);    
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="ToDoApp">
        <h2>To Do App</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="work">Add What To Do</label>
          <input
            type="text"
            id="work"
            name="work"
            value={work}
            onChange={(e) => setWork(e.target.value)}
          ></input>
          <input type="submit" value="ADD"></input>
        </form>
        <div>
          {works.map((work, i) => (
            <div
              key={work.id}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, work)}
              onDragOver={handleDragOver}
              onDrop={(e)=>handleDrop(e,work)}
            >
              {work.isCompleted ? (
                <>
                  <p>
                    <s>{work.name}</s>
                  </p>
                  <button onClick={() => handleDelete(work)}>Delete</button>
                  <button onClick={() => handleComplete(work)}>Undo</button>
                </>
              ) : (
                <>
                  <p>{work.name}</p>
                  <button onClick={() => handleDelete(work)}>Delete</button>
                  <button onClick={() => handleComplete(work)}>Complete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
