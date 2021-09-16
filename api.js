const mongoose = require('mongoose')
const Visitor = require('./Visitor')
const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router();
const path = require('path');
const port = process.env.PORT || 3000;




mongoose.connect('mongodb+srv://Seymur:v_je2MAPLbX.*!D@cluster0.accbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

let database = mongoose.connection
database.once('open', (err, resp) => {
    console.log('connected to DB')
})

app.listen(port, () => {
    console.log('listening to port 3000')
})

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.get('/visitors', (request, response) => {
    Visitor.find({}, (err, res) => {
        if(err) {
            response.send(err)
        }
        else {
        response.send(res)
    }
    })
})

router.post('/addVisitor', (req, res) => {

 Visitor.create({id: req.body.id ,name:req.body.name}, (err, result) => {
     if(err) {
         console.log(err)
     }
     else {
         console.log(result)
         res.send(result)
     }
 } )
})
router.delete('/delete', (req, res) => {
 Visitor.deleteOne({name:req.body.name}, (err,result) => {
    if(err) {
        console.log(err)
    }
    else {
       console.log(result)
       res.send(result)
    }
 })
 
})
router.put('/change', (req, res) => {
 Visitor.findOneAndUpdate({name:req.body.name}, {name:req.body.newName}, (err,result) => {
    if(err) {
        console.log(err)
    }
    else {
       console.log(result)
       res.send(result)
    }
 })
 
})

app.use(router);