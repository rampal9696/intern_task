import express from "express";
import MongoConnection from "./dbConnection/conn.js";
import UserModel from "./modals/userSchema.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, repeat_password } = req.body;
    if (password === repeat_password) {
      const data = await UserModel.findOne({ email: email });
      if (data) {
        return res
          .status(200)
          .send({ status: 200, message: "Email already exists" });
      }
      const user = new UserModel({
        fullName,
        email,
        password,
      });

      await user.save();
      return res.status(200).send({
        status: 200,
        data: user,
        message: "User Registered successfully",
      });
    }

    return res
      .status(200)
      .send({ status: 200, message: "Password not matching" });
  } catch (err) {
    return res.status(400).send({ status: 400, message: err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      if (password === user.password) {
        await user.save();
        return res.status(200).send({ data: user, status: 200 });
      } else {
        return res
          .status(400)
          .send({ status: 400, message: "Password not matching" });
      }
    }
    return res.status(400).send({ status: 400, message: "Email not macthing" });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body }
    );
    if (user) {
      return res
        .status(200)
        .send({ status: 200, message: "User updated successfully" });
    }
    return res.status(201).send({ message: "User not found" });
  } catch (err) {
    return res.status(401).send({ message: "Error" });
  }
});
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id });
    if (user) {
      return res.status(200).send({ status: 200, data: user });
    }
    return res.status(201).send({ status: 400, message: "User not found" });
  } catch (err) {
    return res.status(401).send({ message: "Error" });
  }
});

app.use((req, res, next) => {
  return res.status(404).send({ Message: "Page Not Found" });
});
app.listen(3001, async () => {
  await MongoConnection();
  console.log("Server is running successfully");
});
