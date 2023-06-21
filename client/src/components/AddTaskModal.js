import React from "react";
import { IoIosClose } from "react-icons/io";
const AddTaskModal = (props) => {
  const { setAddModalOpen, handleInputChange, addTask } = props;
  return (
    <div className="add-modal">
      <div className="add-modal-card">
        <IoIosClose
          className="cancel-icon modal-flex-item"
          onClick={() => {
            setAddModalOpen(false);
          }}
        ></IoIosClose>
        <h1>Add Task</h1>

        <form className="form-flex">
          <label>Title:</label>
          <input
            required
            className="task-input"
            placeholder="title"
            name="title"
            onChange={handleInputChange}
          ></input>
          <label>Description:</label>

          <input
            required
            className="task-input"
            placeholder="description"
            name="description"
            onChange={handleInputChange}
          ></input>
          <label>Due Date:</label>

          <input
            required
            className="task-input"
            type="date"
            name="date"
            onChange={handleInputChange}
          ></input>
          <label>Status</label>

          <select
            className="task-input"
            name="status"
            onChange={handleInputChange}
          >
            <option value="incomplete">Incomplete</option>
            <option value="in progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          <button
            className="add-button"
            onClick={(e) => {
              addTask(e);
              setAddModalOpen(false);
            }}
          >
            Add Task
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
