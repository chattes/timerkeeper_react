const fs = require("fs");
const path = require("path");
const DIR_PATH = "~/Public/timekeeper/data/";

const create_dir = async () => {
  try {
    await fs.promises.mkdir(DIR_PATH, { recursive: true });
  } catch (error) {
    console.log("Error Creating Directory", error);
  }
};

const save_data = async (timer_data) => {
  await create_dir();
  fs.writeFile(path.join(DIR_PATH, "time.json"), timer_data, {}, (err) => {
    if (err) console.log("Error writing files", err);
    console.log("Hurray wrote file");
  });
};

const read_data = (timer_data) => {};

const modify_data = (timer_data) => {};

module.exports = {
  save: save_data,
  read: read_data,
  modify: modify_data,
};
