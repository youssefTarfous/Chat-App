import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import mainRouter from "./routes/main.routes";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./config/Passport";
import "./config/db";
dotenv.config();

const app = express();

app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, 
        secure: process.env.NODE_ENV === "production",
        httpOnly: true, 
      },
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  methods:["GET","POST","DELETE","PATCH","PUT"],
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);
app.use("/", (req, res) => {
    res.send("Hello World!");
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
