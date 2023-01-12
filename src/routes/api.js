const express = require("express");
const { createProfile, userLogin, selectProfile, updateUser } = require("../controllers/profileController");
const { createTodo, selectTodo, updateTodo, updateStatus, removeTodo, selectTodoStatus, selectTodoByDate } = require("../controllers/todoListController");

const authVerifyMiddleware = require("../middlewares/authverifyMiddleware");
const router = express.Router();


router.post("/createProfile", createProfile);
router.post("/userLogin", userLogin);
router.get("/selectProfile", authVerifyMiddleware,selectProfile);
router.post("/updateUser", authVerifyMiddleware,updateUser);

//TodoList
router.post("/createTodo", authVerifyMiddleware, createTodo);
router.get("/selectTodo", authVerifyMiddleware, selectTodo);
router.post("/updateTodo", authVerifyMiddleware, updateTodo);
router.post("/updateStatus", authVerifyMiddleware, updateStatus);
router.post("/removeTodo", authVerifyMiddleware, removeTodo);
router.post("/selectTodoStatus", authVerifyMiddleware, selectTodoStatus);
router.post("/selectTodoByDate", authVerifyMiddleware, selectTodoByDate);

module.exports = router;