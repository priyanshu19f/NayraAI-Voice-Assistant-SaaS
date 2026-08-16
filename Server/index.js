import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/ConnectDB.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Routes/user.route.js";
import assistantRouter from "./Routes/assistant.route.js";
import billingRouter from "./Routes/billing.route.js";
dotenv.config();

const app = express();

const privateCors = cors({
    origin: ["https://nayraai.onrender.com"],
    credentials: true,
});

const publicCors = cors({ origin: "*" });

// app.use(
//     cors({
//         origin: "http://localhost:5173",
//         credentials: true,
//     }),
// );
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", privateCors, authRouter);
app.use("/api/user", privateCors, userRouter);
app.use("/api/billing", privateCors, billingRouter);
app.use("/api/assistant", publicCors, assistantRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
    connectDB();
});
