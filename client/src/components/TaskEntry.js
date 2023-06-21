import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import EditTaskModal from "./EditTaskModal";

const TaskEntry = (props) => {
  // props: {
  //     "entry_id": 10,
  //     "title": "c",
  //     "description": "c",
  //     "status": "Completed",
  //     "date": "2023-06-01T04:00:00.000Z",
  //     "user_id": 1
  // }

  //var props
  const { entry_id, title, description, status, date, user_id } = props.task;
  //function props
  const { deleteEntryById } = props;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const {tasks, setTasks} = props

  return (
    <tr>
      <td>{title}</td>
      <td>{description}</td>
      <td className="statusColumn"><span className={status == 'complete' ? "pill complete" : status == 'incomplete' ? "pill incomplete" : "pill inprogress"}>{status}</span></td>
      <td>{date.substring(0, date.indexOf("T"))}</td>
      <td>
        <button
          className="table-button"
          onClick={() => {
            deleteEntryById(entry_id);
          }}
        >
          <AiFillDelete />
        </button>
      </td>
      <td>
        <button
          className="table-button"
          onClick={() => {
            setEditModalOpen(true);
          }}
        >
          <MdOutlineEdit />
        </button>
      </td>

      {isEditModalOpen == true ? (
        <EditTaskModal setEditModalOpen={setEditModalOpen} task={props.task} tasks={tasks} setTasks={setTasks}></EditTaskModal>
      ) : (
        <></>
      )}
    </tr>
  );
};

export default TaskEntry;
