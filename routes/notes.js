const express = require("express");

const router = express.Router();
const {
  handleAllData,
  handleNewData,
  handleDataByName,
  handleDeleteByName,
  handleUpdateData,
} = require("../controller/notes");

router.route("/").get(handleAllData).post(handleNewData);

router
  .route("/:name")
  .get(handleDataByName)
  .delete(handleDeleteByName)
  .put(handleUpdateData);

module.exports = router;
