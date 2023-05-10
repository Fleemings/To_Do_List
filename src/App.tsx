import React, { useState } from 'react';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import AppStyle from './App.module.css';
import FormTask from './Components/Form/FormTask';
import FormList from './Components/Form/FormList';

// Interface
import { ITask } from './Interfaces/ITask';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      })
    );
  };
  return (
    <div className={AppStyle.main}>
      <Header />
      <FormTask
        btnText='Create Task'
        taskList={taskList}
        setTaskList={setTaskList}
      />
      <FormList taskList={taskList} handleDelete={deleteTask} />
      <Footer />
    </div>
  );
}

export default App;
