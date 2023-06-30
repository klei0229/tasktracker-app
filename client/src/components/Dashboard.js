import React, { useEffect, useState } from "react";
import TaskEntry from "./TaskEntry";
import AddTaskModal from "./AddTaskModal";
import SortArrowContainer from "./SortArrowContainer";
import { fetchURL } from "./data";
const Dashboard = (props) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [sortingMode, setSortingMode] = useState("none");

  const { currentUser, setCurrentUser, name } = props;
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    status: "incomplete",
    date: "2000-10-10",
  });
  //useEffects
  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [currentUser]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    console.log(sortingMode);
    let sortedTasks = [...tasks];
    //title sort
    if (sortingMode === "title-asc") {
      console.log("title-asc");

      sortedTasks = sortedTasks.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      console.log(sortedTasks);
      setTasks(sortedTasks);
      return;
    } else if (sortingMode === "title-dec") {
      sortedTasks = sortedTasks.sort((a, b) => {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      });
      console.log(sortedTasks);
      setTasks(sortedTasks);
      return;
    }

    //status sort
    if (sortingMode === "status-asc") {
      console.log("date asc");
      sortedTasks = sortedTasks.sort((a, b) => {
        if (a.status < b.status) {
          return -1;
        }
        if (a.status > b.status) {
          return 1;
        }
        return 0;
      });
      console.log(sortedTasks);
      setTasks(sortedTasks);
      return;
    } else if (sortingMode === "status-dec") {
      sortedTasks = sortedTasks.sort((a, b) => {
        if (a.status < b.status) {
          return 1;
        }
        if (a.status > b.status) {
          return -1;
        }
        return 0;
      });
      console.log(sortedTasks);
      setTasks(sortedTasks);
      return;
    }

    //date sort
    if (sortingMode === "date-asc") {
      console.log("date asc");
      sortedTasks = sortedTasks.sort((a, b) => {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
          return 1;
        }
        return 0;
      });
      console.log(sortedTasks);
      setTasks(sortedTasks);
      return;
    } else if (sortingMode === "date-dec") {
      sortedTasks = sortedTasks.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });
      console.log(sortedTasks);
      setTasks(sortedTasks);
      return;
    }
  }, [sortingMode]);
  //functions

  //sorting modes, none, title-asc, title-dec, date-asc, date-dec, date-asc, date-dec
  const handleSort = (nextMode) => {
    if (nextMode == "title" && sortingMode !== "title-asc") {
      setSortingMode("title-asc");
    } else if (nextMode == "title" && sortingMode == "title-asc") {
      setSortingMode("title-dec");
    }

    if (nextMode == "status" && sortingMode !== "status-asc") {
      setSortingMode("status-asc");
    } else if (nextMode == "status" && sortingMode == "status-asc") {
      setSortingMode("status-dec");
    }
    if (nextMode == "date" && sortingMode !== "date-asc") {
      setSortingMode("date-asc");
    } else if (nextMode == "date" && sortingMode == "date-asc") {
      setSortingMode("date-dec");
    }
  };

  const deleteEntryById = async (entry_id) => {
    try {
      console.log("delete pressed");
      console.log(tasks);
      const response = await fetch(`${fetchURL}/api/tasks/${entry_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      // const tasks = await response.json();
      // console.log(tasks);
      const updatedTasks = tasks.filter((task) => {
        return task.entry_id !== entry_id;
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.log("error");
      alert(error);
    }
  };
  const fetchData = async () => {
    const response = await fetch(`${fetchURL}/api/tasks/${currentUser}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const tasks = await response.json();
    console.log(tasks);
    setTasks(tasks);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token")
    localStorage.removeItem("name")

  };
  const addTask = async (e) => {
    e.preventDefault();
    if(input.title.length == 0){
      alert('Title cannot be empty');
      return;
    }


    console.log(JSON.stringify(input));
    try {
      const body = {
        title: input.title,
        description: input.description,
        status: input.status,
        date: input.date,
      };
      const response = await fetch(
        `${fetchURL}/api/tasks/${currentUser}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const responseJSON = await response.json();
      console.log(responseJSON);

      //append new task entry to client
      const responseObj = responseJSON.rows[0];
      console.log(responseObj);
      const taskToAppend = {
        entry_id: responseObj.entry_id,
        title: responseObj.title,
        description: responseObj.description,
        status: responseObj.status,
        date: responseObj.date,
      };
      const updatedTasks = [...tasks, taskToAppend];
      setTasks(updatedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const updatedInput = { ...input };
    updatedInput[e.target.name] = e.target.value;
    setInput(updatedInput);
  };
  return (
    <div>
      {/* display the tasks */}

        <h2>
          Hi {name}! You Have ({tasks.length}) Tasks.
        </h2>
      {/* table */}
      <table>
        <tr>
          <th
            className="sortable"
            onClick={() => {
              handleSort("title");
            }}
          >
            <SortArrowContainer
              name="Title"
              up="title-asc"
              down="title-dec"
              sortingMode={sortingMode}
            ></SortArrowContainer>
          </th>
          <th>Description</th>
          <th
            className="sortable"
            onClick={() => {
              handleSort("status");
            }}
          >
            <SortArrowContainer
              name="Status"
              up="status-asc"
              down="status-dec"
              sortingMode={sortingMode}
            ></SortArrowContainer>
          </th>
          <th
            className="sortable"
            onClick={() => {
              handleSort("date");
            }}
          >
            <SortArrowContainer
              name="Date"
              up="date-asc"
              down="date-dec"
              sortingMode={sortingMode}
            ></SortArrowContainer>
          </th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        {tasks.map((task) => {
          return (
            <TaskEntry
              deleteEntryById={deleteEntryById}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            ></TaskEntry>
          );
        })}
      </table>

      <button
        className="dashboard-button"
        onClick={() => {
          setAddModalOpen(true);
        }}
      >
        Add New Task
      </button>

      {isAddModalOpen == true ? (
        <AddTaskModal
          addTask={addTask}
          handleInputChange={handleInputChange}
          setAddModalOpen={setAddModalOpen}
        ></AddTaskModal>
      ) : (
        <></>
      )}
      <button className="dashboard-button" onClick={logout}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
