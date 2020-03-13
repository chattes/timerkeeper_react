import { observable } from "mobx";

const project = observable({
  projectName: "",
  taskName: "",
  timeSpent: 0
});

export default project;
