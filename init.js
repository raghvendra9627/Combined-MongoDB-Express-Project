const mongoose = require("mongoose");
const Chat = require("./Model/chat.js");

main()
  .then((res) => console.log("Connection Successful"))
  .catch((err) => console.error(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatingDB");
}

let allChats = [
    {
        from:"Rajesh",
        to:"Vineet",
        msg:"Comming up",
        created_At: new Date()
    },
    {
        from:"Rahul",
        to:"Neelesh",
        msg:"Going up",
        created_At: new Date()
    },
    {
        from:"Raghvendra",
        to:"Jatin",
        msg:"Working On Project",
        created_At: new Date()
    },
    {
        from:"Deepak",
        to:"Mukund",
        msg:"Soja Jake Saale",
        created_At: new Date()
    },
]

Chat.insertMany(allChats).then(res => console.log("successful")).catch(err=>console.error(err));