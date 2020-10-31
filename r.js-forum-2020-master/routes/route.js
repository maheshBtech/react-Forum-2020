const express = require("express");
const router = express.Router();
const user = require("../database/modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../database/middleware/auth");
const ques = require("../database/modules/ques");
const Evnt = require('../database/modules/events');
const postt = require('../database/modules/posts');
const postevent = require('../database/modules/postevents')
//to update the question

const multer = require('multer');
const upload = multer();
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline)

router.post('/uploadposts',upload.single('pic'),async(req,res) =>
{
  try{
    const { file ,body:{desc}} = req;
    if(!file) return res.status(400).send({"msg":"select image"})
    // console.log(file.detectedFileExtension)
    // if(file.detectedFileExtension !=".jpg" ) return res.status(401).send({"msg":"invalid type.."})
    if(file.detectedFileExtension === ".mp4" )
    {
      const filename = Date.now() + '-' + file.originalName;
    await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../public/uploads/${filename}`)) 
    const newEvent = await new postevent({
      videopath:`/uploads/${filename}`,
      desc:desc
    })
    const rel = await newEvent.save();
    if(!rel) return res.status(400).send({"msg":"event not saved in database"});
    return res.send({newEvent})

    }
    else{

      const filename = Date.now() + '-' + file.originalName;
      await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../public/uploads/${filename}`)) 
      const newEvent = await new postevent({
        path:`/uploads/${filename}`,
        desc:desc
      })
      const rel = await newEvent.save();
      if(!rel) return res.status(400).send({"msg":"event not saved in database"});
      return res.send({newEvent})
    }
   


  }
  catch(err)
  {
    console.log(err)

  }
})

router.patch('/updateeventcomment',async(req,res,next) =>
{
  try{
    const id = req.body.id;
    const updates = req.body;
    const op = {new:true}
    // console.log(id,updates,op)
    const rel = await postevent.findByIdAndUpdate(id,updates,op)
    if(rel)
    {
      res.send(rel)
    }
  }
  catch(err)
  {
    console.log(err.message)
  }
})

router.get('/fetcheventpost',async(req,res) =>
{
  try{
    const rel = await postevent.find({}).sort({_id:-1})
    if(!rel)return res.status(401).send({"msg":"unable to fetch"})
    return res.send(rel)

  }
  catch(err)
  {
    return req.status(500).send(err)
  }
})

router.post('/uploadprofile',upload.single('pic'),async(req,res) =>
{
  try{
    

    const { file ,body:{id}} = req;
    if(!file) return res.status(400).send({"msg":"select image"})
    if(file.detectedFileExtension !=".jpg" ) return res.status(401).send({"msg":"invalid type.."})
    const filename = Date.now() + '-' + file.originalName;
    const rel = await user.updateOne({_id:req.body.id},{$set:{profilepic:filename}})
    await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../public/uploads/${filename}`))
     return res.send({
      "path":`/uploads/${filename}`
    })


  }
  catch(err)
  {
    console.log(err)
  }
})

router.post("/saveQues", async (req, res) => {
  try {
    const newQues = await new ques(req.body);
    const q = newQues.save();
    if (q) {
      res.send(newQues);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/saveEvent',async(req,res) =>
{
  try{
    const evnt  = await new Evnt(req.body);
    const e = evnt.save()
    if(e)
    {
      res.send(evnt)
    }

  }
  catch(err)
  {
    console.log(err)
  }

})





router.patch('/updateAns',async(req,res,next) =>
{
  try{
    const id = req.body.id;
    const updates = req.body;
    const op = {new:true}
    // console.log(id,updates,op)
    const rel = await ques.findByIdAndUpdate(id,updates,op)
    if(rel)
    {
      res.send(rel)
    }
  }
  catch(err)
  {
    console.log(erroe.message)
  }
})



router.post("/save", async (req, res) => {
  try {
    let { username, email, password,college } = req.body;

    // validate

    if (!email || !password || !username || !college)
      return res.status(400).json({ msg: "Please fill all the labels." });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await user.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    //   const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new user({
      username,
      email,
      password: passwordHash,
      college
    });
    const savedUser = await newUser.save();
    // res.json(savedUser);
    if(savedUser)
    {
      res.send("your data is saved")
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Please fill all the labels." });

    const userr = await user.findOne({ email: email });
    if (!userr)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, userr.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password." });

    const key = "akfnaernfergnrenvrngvoerignrgnv";

    const token = jwt.sign({ id: userr._id }, key, { expiresIn: "1h" });

    res.json({
      token,
      user: {
        id: userr._id,
        username: userr.username,
        college:userr.college,
        profilepic:`/uploads/${userr.profilepic}`

      },
    });
  
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/TokenIsValid", async (req, res) => {
  try {
    const token = req.header("auth-token");
    if (!token) return res.json(false);

    const key = "akfnaernfergnrenvrngvoerignrgnv";
    const verified = jwt.verify(token, key, { expiresIn: 60 * 60 });
    if (!verified) return res.json(false);

    const userr = await user.findById(verified.id);
    if (!userr) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const userr = await user.findById(req.user);
  res.json({
    displayName: userr.username,
    id: userr._id,
  });
});

router.get("/getAllQues", (req, res) => {
  ques
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/getAllActiveQues", (req, res) => {
  ques
    .find({})
    .sort({ _id: -1 })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/fetchPeople", (req, res) => {
  user
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/fetchChat", (req, res) => {
  user
    .find({}).limit(10)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/getEvents", (req, res) => {
  Evnt
    .find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/savepost',async(req,res) =>
{
  try{
    const newPost =  new postt((req.body))
    // console.log(newPost)
    const rel = await newPost.save()
    if(!rel)
    {
      return res.status(403).send({
        "msg":"error in saving"
      })
    }
    
      return res.send(newPost)
    
  }
  catch(err)
  {
    res.status(500).send(err)
    console.log(err)
  }
})

router.get('/fetchposts',async(req,res)=>
{
  try{
    const fetchpost = await postt.find({}).sort({_id:-1})
    if(!fetchpost)return res.status(402).send({"msg":"error while fetching"}) 
     return res.send(fetchpost)
  }
  catch(err)
  {
    res.status(500).send(err)

  }
})



module.exports = router;
