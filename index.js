const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./Model/chat.js");
const methodOverride = require("method-override");

const port = 8080;
main()
  .then((res) => console.log("Connection Successful"))
  .catch((err) => console.error(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatingDB");
}

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//All Chats Route

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("chats.ejs", { chats });
});

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Post Route(Create new Chats)
app.post("/chats", async (req, res) => {
  let { from, msg, to } = req.body;
  const user = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_At: new Date(),
  });
  await user
    .save()
    .then((res) => console.log("successful submission"))
    .catch((err) => console.log(err));
  res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

app.put("/chats/:id", async (req,res)=>{
  let {id} = req.params;
  let chat = await Chat.findByIdAndUpdate(id, req.body);
  res.redirect(`/chats`);
});

app.delete( "/chats/:id" ,async (req,res)=> {
  let {id}=req.params;
  await Chat.deleteOne({_id : id});
  res.redirect('/chats');
});

app.listen(port, () => {
  console.log("listening to the port : 8080");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
