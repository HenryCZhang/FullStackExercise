const express= require('express');
const app = express();
const config = require('./config');
const Task = require('./models/task');
const Note = require('./models/note');
const cors = require('cors');

app.use(cors());//allow Angular to access the node js
app.use(express.json())

config.authenticate().then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log(err);
})

//Task Table
app.get('/task',(req,res)=>{
    Task.findAll().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.post('/task',(req,res)=>{
    Task.create(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

//Update task status by ID
app.patch('/task/:id',(req,res)=>{
    let id = req.params.id;
    Task.findByPk(id).then((result)=>{
        console.log(result);
        //update last_name
        result.status = req.body.status; //not sure!!!
        //save the upsate to the DB
        result.save().then(()=>{
            res.status(200).send('status update successful!');
        }).catch((err)=>{
            res.status(400).send(err);
        })

    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.delete('/task/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    //Find the task by id
    Task.findByPk(id).then((result)=>{
        //Delete record from DB
        result.destroy().then(()=>{
            // res.redirect('/task'); 
            res.status(200).send('delete successful!');
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//find all the tasks done - Achievement Page
app.get('/task/filter',(req,res)=>{
    let data={
        where:{
            status:req.query.status
        }
    }
    Task.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})


//Note Table
app.get('/note',(req,res)=>{
    Note.findAll().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.post('/note',(req,res)=>{
    Note.create(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.delete('/note/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    //Find the task by id
    Note.findByPk(id).then((result)=>{
        //Delete record from DB
        result.destroy().then(()=>{
            // res.redirect('/task'); 
            res.status(200).send('delete successful!');
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.listen(1000,()=>{
    console.log('server listening on port 1000');
})