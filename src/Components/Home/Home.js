import React, { Component, useState, useCallback } from "react";
import { observer, inject, MobXProviderContext } from "mobx-react";
import {
  updateProjectName,
  updateTaskName,
  startTimer,
  stopTimer
} from "../../Actions/ProjectActions";
import Clock from "../Clock/Clock";
import "./Home.scss";

const changeProjectName = el => {
  updateProjectName({ name: el.target.value });
};

const changeTaskName = el => {
  updateTaskName({ name: el.target.value });
};
const useStores = () => {
  return React.useContext(MobXProviderContext);
};
// Legacy way is inject
// MobXProviderContext gives access to the stores using React Context
const Home = observer(() => {
  const { taskStore } = useStores();
  const [buttonState, setButtonState] = useState(false);
  const toggleTimer = useCallback(() => {
    setButtonState(buttonState => !buttonState);
    if (!buttonState) startTimer();
    if (buttonState) stopTimer();
  }, [buttonState]);
  return (
    <article className="project-container">
      <section className="project-input-holder">
        <input
          type="text"
          value={taskStore.projectName}
          onChange={changeProjectName}
        />
        <input
          type="text"
          value={taskStore.taskName}
          onChange={changeTaskName}
        />
      </section>
      <section>
        <button onClick={toggleTimer}>{buttonState ? "Stop" : "Start"}</button>
      </section>
      <section>
        <Clock />
      </section>
    </article>
  );
});

export default Home;
