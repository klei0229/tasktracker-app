import React, { useState } from "react";
import { IoIosClose } from "react-icons/io";

const EditTaskModal = (props) => {
  const { setEditModalOpen } = props;
  const { tasks, setTasks } = props;
  const { entry_id, title, description, status, date, user_id } = props.task;

  const [input, setInput] = useState({
    title: title,
    description: description,
    status: status,
    date: date,
  });

  const handleInputChange = (e) => {
    const updatedInput = { ...input };
    updatedInput[e.target.name] = e.target.value;
    setInput(updatedInput);
  };

  const editTaskById = async (entry_id) => {
    if(input.title.length == 0){
        alert("Title cannot be empty");
        return;
    }
    const response = await fetch(`http://localhost:3000/tasks/${entry_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const resJSON = await response.json();
    console.log(resJSON);
    const editedEntry = resJSON.rows[0];
    console.log(editedEntry);

    console.log(tasks);
    const updatedTasks = tasks.map((task) => {
      if (task.entry_id === entry_id) {
        return editedEntry;
      } else {
        return task;
      }
    });
    console.log(updatedTasks);
    setTasks(updatedTasks);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEditModalOpen(false);
    editTaskById(entry_id);
  };

  return (
    <div className="add-modal">
      <div className="add-modal-card">
        <IoIosClose
          className="cancel-icon modal-flex-item"
          onClick={() => {
            setEditModalOpen(false);
          }}
        ></IoIosClose>
        <h1>Edit Task</h1>

        <form className="form-flex">
          <label>Title:</label>
          <input
            required
            className="task-input"
            placeholder="title"
            name="title"
            value={input.title}
            onChange={handleInputChange}
          ></input>
          <label>Description:</label>

          <input
            required
            className="task-input"
            placeholder="description"
            name="description"
            value={input.description}
            onChange={handleInputChange}
          ></input>
          <label>Due Date:</label>

          <input
            required
            className="task-input"
            type="date"
            name="date"
            value={input.date.substring(0, date.indexOf("T"))}
            onChange={handleInputChange}
          ></input>
          <label>Status</label>

          <select
            className="task-input"
            name="status"
            value={input.status}
            onChange={handleInputChange}
          >
            <option value="incomplete">Incomplete</option>
            <option value="in Progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          <button className="add-button" onClick={handleEdit}>
            Submit Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
