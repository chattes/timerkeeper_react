const fse = require("fs-extra");
const path = require("path");
const HOME_DIR = require("os").homedir();

const save_data = async (data) => {
  let data_to_save = [];
  try {
    data_to_save = await read_data();
  } catch (error) {
    console.log("Cannot read data");
  }
  console.log("DATA TO SAVE", data_to_save);
  data_to_save = [...data_to_save, data];
  fse.outputJson(
    path.join(HOME_DIR, "timekeeper", "time.json"),
    data_to_save,
    (err) => {
      if (err) {
        throw err;
      }
      console.log("File Written Succesfully!!");
    }
  );
};

const read_data = async () => {
  return fse
    .readJson(path.join(HOME_DIR, "timekeeper", "time.json"))
    .then((timer_data) => {
      console.log("data read...", timer_data);
      return timer_data;
    })
    .catch((error) => {
      console.log("Unable to read data", error);
      throw error;
    });
};

module.exports = {
  save: save_data,
  read: read_data,
};
