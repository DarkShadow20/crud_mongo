const express = require("express");
const mongoose = require("mongoose")
const User = require("./schema");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://kunal8011:Upes2024@cluster0.7enskgz.mongodb.net/users_app").then(()=>{
    console.log("Database connected successfully")
}).catch(err=>{
    console.log("Could not connect to database",err)
    process.exit();
})


//Create
app.post("/",async function(req,res){
    const name = req.body.name
    const username  = req.body.email
    const password = req.body.password
    const user = new User({
        name:name,
        email: username,
        password: password
    })    
    await user.save();
    res.json({
        msg:"user created successfully"
    })
})

//Update
app.put("/update/:id",async function(req,res){
    await User.findByIdAndUpdate(req.params.id,req.body,{ useFindAndModify:false }).then(data=>{
        if(!data){
            res.status(404).send({
                msg:"User not found"
            })
        }else{
            res.status(201).send({
                msg:"User updated successfully"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
})

//Read
app.get("/",async function(req,res){
    const allUsers = await User.find();
    res.status(201).send(allUsers)
})

//Delete
app.delete("/delete/:id", async function(req,res){
    await User.findByIdAndDelete(req.params.id).then(data=>{
        if(!data){
            res.status(404).send({
                msg:"User not found"
            })
        }else{
            res.status(201).send({
                msg:"user deleted successfully"
            })
        }
    }).catch(err=>{
        res.status(500).send({
            msg:err.message
        })
    })
})

app.listen(3000);