import { action } from "mobx";
import { TaskStore } from "../Store/GlobalStore";
// const { ipcRenderer } = window.require("electron");
export const updateProjectName = action(({ name }) => {
  TaskStore.projectName = name;
});
export const updateTaskName = action(({ name }) => {
  TaskStore.taskName = name;
});

export const updateRate = action(({ hourly_rate }) => {
  TaskStore.hourly_rate = hourly_rate;
});

export const updateCurrency = action(({ currency }) => {
  TaskStore.currency = currency;
});

export const startTimer = action(() => {
  TaskStore.timerInterval = setInterval(() => TaskStore.timeSpent++, 1000);
});

export const stopTimer = action(() => {
  // ipcRenderer.send("record-time", {
  //   projectName: TaskStore.projectName,
  //   taskName: TaskStore.taskName,
  //   timeSpent: TaskStore.timeSpent
  // });
  if (TaskStore.timerInterval) {
    clearInterval(TaskStore.timerInterval);
  }
  TaskStore.timerInterval = null;
  TaskStore.timeSpent = 0;
  TaskStore.projectName = "";
  TaskStore.taskName = "";
});
