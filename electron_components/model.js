const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const HOME_DIR = require("os").homedir();
const DIR_PATH = path.join(HOME_DIR, "timekeeper");

const create_dir = async () => {
  try {
    await fse.ensureDir(DIR_PATH);
    console.log("Directory has been Created");
  } catch (error) {
    console.log("Error Creating Directory", error);
  }
};

const save_data = async (timer_data) => {
  fse.outputJson(
    path.join(HOME_DIR, "timekeeper", "time.json"),
    timer_data,
    (err) => {
      if (err) {
        throw err;
      }
      console.log("File Written Succesfully!!");
    }
  );
};

const read_data = (timer_data) => {};

const modify_data = (timer_data) => {};

module.exports = {
  save: save_data,
  read: read_data,
  modify: modify_data,
};
