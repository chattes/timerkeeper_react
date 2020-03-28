import { observable, autorun } from "mobx";

export const TaskStore = observable({
  projectName: "",
  taskName: "",
  timeSpent: 0,
  timerInterval: null
});

export const SettingsStore = observable({
  notifyAfter: 60
});
// autorun(() => console.log("Auto RUN:::", RootStore.projectName));

// export default TaskStore;
