import React, { useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppStyle from './App.module.css';
import FormTask from './Components/Form/FormTask';
import FormList from './Components/Form/FormList';
import Modals from './Components/Modal/Modals';

// Interface
import { ITask } from './Interfaces/ITask';

function App() {
  const [show, setShow] = React.useState<boolean>(false);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(
    null
  );

  const storage = (): ITask[] => {
    // get items from the storage
    let tasks = localStorage.getItem('taskList');
    if (tasks) {
      try {
        // confirm if the value is a valid string, if yes, it will convert it in an array
        const parsedTasks = JSON.parse(tasks) as ITask[];
        return Array.isArray(parsedTasks) ? parsedTasks : [];
      } catch (error) {
        console.log('Failed to parse tasks from stotage', error);
      }
    } else {
      return [];
    }
    return [];
  };

  const storageTasks = storage();

  const [taskList, setTaskList] = useState<ITask[]>(storageTasks);

  const HandleDeleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const handleShowModal = (display: boolean) => {
    setShow(display);
  };

  const handleEdit = (task: ITask): void => {
    handleShowModal(true);
    setTaskToUpdate(task);
  };

  const handleUpdateTask = (
    id: number,
    title: string,
    difficulty: number
  ) => {
    const updateTask: ITask = { id, title, difficulty };

    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task;
    });
    setTaskList(updatedItems);
    handleShowModal(false);
  };

  React.useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  React.useEffect(() => {
    const storedTasks = localStorage.getItem('taskList');

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      if (parsedTasks > 10) {
        const newTasks = parsedTasks.slice(parsedTasks.length - 10);
        localStorage.setItem('taskList', JSON.stringify(newTasks));
      } else {
        setTaskList!(parsedTasks);
      }
    }
  }, []);

  return (
    <>
      <Modals
        show={show}
        handleShowModal={handleShowModal}
        children={
          <FormTask
            btnText='Edit Task'
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={handleUpdateTask}
          />
        }
      />
      <div className={AppStyle.main}>
        <Header />
        <FormTask
          btnText='Create Task'
          taskList={taskList}
          setTaskList={setTaskList}
        />
        <FormList
          taskList={taskList}
          handleDelete={HandleDeleteTask}
          handleEdit={handleEdit}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
