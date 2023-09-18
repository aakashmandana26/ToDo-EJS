const express = require('express');
const bodyParser = require('body-parser');
// const dateObject = require(__dirname+'/dayAndDate.js');
const mongoose = require('mongoose');

// console.log(dateObject)

const app = express();
app.use(express.static("public"));  //to tell express to use everything thats in public folder 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemsSchema = {
  name : String
};

const Item = mongoose.model("Item", itemsSchema);






app.set('view engine' , 'ejs');
const itemsArray =[];


app.get('/', (req,res)=>{

  // dateFormat = dateObject.day;
  // dateFormat = dateObject.day();  //exporting it from local dayAndDate.js modle
  

  Item.find().then((data)=>{ 

    if(data.length ===0){
      const item1 = { name : "Study"}
      const item2 = { name : "Workout"}
      const item3 = { name : "Play"}
      itemsArray = [item1, item2, item3]
      console.log(itemsArray)

      Item.insertMany(itemsArray).
      then(console.log("Inserted items")).
      catch(function(error){
        console.log(error)
})
res.redirect('/');

    }
    else{
      res.render('list', {listTitle : "Today", newListItems : data});
    }
      
    })
  })

  


    


app.post('/', (req, res)=>{

  newItem = req.body.task;
  const postItem = new Item({ name : newItem});
  postItem.save()
  
  res.redirect('/');





  // newItem = req.body.task;

  // if(req.body.add === "Work List"){
  //   workItems.push(newItem);
  //   res.redirect('/work');
  // } else{
  //   items.push(newItem);
  //   res.redirect('/');

  // }
  // res.send("Post request recieved");
  
})

app.get('/work', (req,res)=>{
  res.render("list", {listTitle : "Work List", newListItems : workItems});
})

app.get('/about', (req,res)=>{
  res.render('about');
})



app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})