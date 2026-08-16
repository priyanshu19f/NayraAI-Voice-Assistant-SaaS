import express from "express";
import { isAuth } from "../Middlewares/isAuth.js";
import upload from "../Middlewares/multer.js";
import {
    genCurrentUser,
    saveAssistant,
    uploadCustomLogo,
    removeCustomLogo,
} from "../Controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current-user", isAuth, genCurrentUser);
userRouter.post("/save-assistant", isAuth, saveAssistant);
userRouter.post(
    "/upload-logo",
    isAuth,
    upload.single("logo"),
    uploadCustomLogo,
);
userRouter.post("/remove-logo", isAuth, removeCustomLogo);

export default userRouter;
