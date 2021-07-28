const express = require('express');
const app = express();
const config = require('./config');
const Cars = require('./models/cars');
const Orders = require('./models/orders');
const Lessors = require('./models/lessors');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());//allow Angular to access the node js
app.use(express.json())//middleware

config.authenticate().then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log(err);
})

app.listen(8000,()=>{
    console.log('listening on port 8000');
})

//Lessors Table
app.post('/register', function(req, res){

    let plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        
        let user_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash
        };

        Lessors.create(user_data).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send(err);
        });

    });    
});

//Orders Table
app.post('/place-order', function(req, res){
    // pass in the current logged in user data   
});

app.post('/login', function(req, res){

    let email = req.body.email;
    let password = req.body.password;
    let user_data = {
        where: {email} // {email: email}
    }

    //Find a user that corresponds to the email
    Lessors.findOne(user_data).then((result) => {

        if(result){
            console.log(result);
            bcrypt.compare(password, result.password, function(err, output) {
                console.log(output);
                if(output){
                    res.status(200).send(result);
                }else{
                    res.status(400).send('Incorrect password.');
                }
            });            
        }
        else{
            res.status(404).send('User does not exist.');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
        
});

 //----------------------Cars Table
app.get('/car',(req,res)=>{
    Cars.findAll().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.get('/car/:id',(req,res)=>{
    let lessor_id = parseInt(req.params.id);
    let data={
        where:{
            lessor_id: lessor_id //not sure!
        }
    }
    Cars.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

// app.patch('/task/:id',(req,res)=>{
//     let id = parseInt(req.params.id);
//     Task.findByPk(id).then((result)=>{
//         console.log(result);
//         result.status = req.body.status;
//         //save the upsate to the DB
//         result.save().then(()=>{
//             res.status(200).send('status update successful!');
//         }).catch((err)=>{
//             res.status(400).send(err);
//         })
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
// })

app.post('/car',(req,res)=>{
    Cars.create(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

//Update car info by ID 
// app.patch('/task/:id',(req,res)=>{
//     let id = parseInt(req.params.id);
//     Cars.findByPk(id).then((result)=>{
//         console.log(result);
//         result.status = req.body.status;
//         //save the update to the DB
//         result.save().then(()=>{
//             res.status(200).send('status update successful!');
//         }).catch((err)=>{
//             res.status(400).send(err);
//         })
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
// })

app.delete('/car/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    //Find the car by id
    Cars.findByPk(id).then((result)=>{
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

//find cars available
app.get('/car/filter',(req,res)=>{
    let data={
        where:{
            //availibility condition
        }
    }
    Cars.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

 //----------------------Lessors Table
app.get('/lessor',(req,res)=>{
    Lessors.findAll().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})
