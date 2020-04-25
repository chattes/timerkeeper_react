import React, { Component, useState, useCallback } from "react";
import { observer, inject, MobXProviderContext } from "mobx-react";
import {
  updateProjectName,
  updateTaskName,
  updateRate,
  updateCurrency,
  startTimer,
  stopTimer,
} from "../../Actions/ProjectActions";
import Clock from "../Clock/Clock";
import "./Home.scss";
import { currencyCodes } from "../../utils/utility";

const changeProjectName = (el) => {
  updateProjectName({ name: el.target.value });
};

const changeTaskName = (el) => {
  updateTaskName({ name: el.target.value });
};

const changeRate = (el) => {
  updateRate({ hourly_rate: el.target.value });
};

const changeCurrency = (el) => {
  updateCurrency({ currency: el.target.value });
};

const useStores = () => {
  return React.useContext(MobXProviderContext);
};
// Legacy way is inject
// MobXProviderContext gives access to the stores using React Context
const Home = observer(() => {
  const { taskStore } = useStores();
  const [buttonState, setButtonState] = useState(false);
  const [disabledState, setDisabledState] = useState(true);
  const toggleTimer = useCallback(() => {
    setButtonState((buttonState) => !buttonState);
    if (!buttonState) startTimer();
    if (buttonState) stopTimer();
  }, [buttonState]);

  const enableButton = useCallback(() => {
    if (taskStore.projectName !== "" && taskStore.taskName !== "") {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }
  });

  console.log(`DISABLED STATE: ${disabledState}`);
  return (
    <article className="project-container">
      <section className="project-input-holder">
        <form className="pure-form">
          <fieldset>
            <legend className="project-legend">Task Details</legend>
            <input
              className="project-input"
              type="text"
              placeholder="Project"
              onChange={changeProjectName}
              value={taskStore.projectName}
              onBlur={enableButton}
            />
            <input
              className="project-input"
              type="text"
              placeholder="Task"
              onChange={changeTaskName}
              value={taskStore.taskName}
              onBlur={enableButton}
            />
          </fieldset>
          <fieldset>
            <legend className="project-legend">Rate</legend>
            <input
              className="project-input"
              type="text"
              placeholder="Rate per Hour"
              onChange={changeRate}
              value={taskStore.hourly_rate}
            />
            <input
              id="currency"
              list="currencyList"
              className="project-input awesomplete"
              style={{ color: "black" }}
              type="text"
              placeholder="Currency"
              onChange={changeCurrency}
              value={taskStore.currency}
            />
            <CurrencyDataList id="currencyList" />
          </fieldset>
        </form>
      </section>
      <section className="button-container">
        <button
          className="pure-button  xtra-large-button"
          onClick={toggleTimer}
          disabled={disabledState}
        >
          {buttonState ? "Stop" : "Start"}
        </button>
      </section>
      <section className="clock-container">
        <Clock />
      </section>
    </article>
  );
});

const CurrencyDataList = ({ id }) => {
  let currencyList = [];
  for (let [key, value] of Object.entries(currencyCodes)) {
    let obj = {
      key: key,
      val: value.name,
    };
    currencyList.push(obj);
  }

  return (
    <datalist id={id}>
      {currencyList.map((curr) => (
        <option key={curr.key} data-value={curr.key}>
          {curr.val}
        </option>
      ))}
    </datalist>
  );
};

export default Home;
