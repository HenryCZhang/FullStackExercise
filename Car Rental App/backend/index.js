const express = require('express');
const app = express();
const config = require('./config');
const Car = require('./models/car');
const Order = require('./models/order');
const Lessor = require('./models/lessor');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//FK Cascade
Car.belongsTo(Lessor, {
    foreignKey: 'lessor_id'
});

Lessor.hasMany(Car, {
    foreignKey: 'lessor_id'
});

Order.belongsTo(Car, {
    foreignKey: 'car_id'
});

Car.hasMany(Order, {
    foreignKey: 'car_id'
});



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

app.post('/register', function(req, res){

    let plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        
        let user_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash
        };

        Lessor.create(user_data).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send(err);
        });

    });    
});

app.post('/login', function(req, res){

    let email = req.body.email;
    let password = req.body.password;
    let user_data = {
        where: {email} // {email: email}
    }

    //Find a user that corresponds to the email
    Lessor.findOne(user_data).then((result) => {

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
    Car.findAll().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

//tab1 - diaplay cars that are not rented
app.get('/car',(req,res)=>{
    let data={
        where:{
            rented: false 
        }
    }
    Car.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})
//find cars belonging to the current user 
app.get('/car_lessor/:id',(req,res)=>{
    let lessor_id = parseInt(req.params.id);
    let data={
        where:{
            lessor_id: lessor_id 
        },
        include: Order //business tab: display client info
    }
    Car.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

//find the car in an order
app.get('/car_order/:id',(req,res)=>{
    let car_id = parseInt(req.params.id);
    let data={
        where:{
            id: car_id
        },
        include: Lessor
    }
    Car.findAll(data).then((result)=>{
        console.log(result);
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.post('/car',(req,res)=>{
    Car.create(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

//Update car rented value by car ID
app.patch('/car/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    Car.findByPk(id).then((result)=>{
        console.log(result);
        result.rented = req.body.rented;
        //save the upsate to the DB
        result.save().then(()=>{
            res.status(200).send('car rented update successful!');
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

app.delete('/delete_car/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    Car.findByPk(id).then((result)=>{
        result.destroy().then(()=>{
            res.status(200).send('delete successful!');
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//find cars available - based on dates
app.get('/car/filter',(req,res)=>{
    let data={
        where:{
            //availibility condition
        }
    }
    Car.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

 //----------------------Lessors Table
app.get('/lessor',(req,res)=>{
    Lessor.findAll().then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})


//----------------------Orders Table

//find orders belonging to the current user based on the client_email
app.get('/order_user/:client_email',(req,res)=>{
    let data={
        where:{
            client_email: req.params.client_email
        },
        include: {
            model: Car,
            include: {
                model: Lessor
            }
        }
    }
    Order.findAll(data).then((result)=>{
        console.log(result);
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

app.post('/order',(req,res)=>{
    Order.create(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})
