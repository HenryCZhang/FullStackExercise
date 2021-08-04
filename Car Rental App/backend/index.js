const express = require('express');
const app = express();
const config = require('./config');
const Car = require('./models/car');
const Order = require('./models/order');
const Lessor = require('./models/lessor');
const Contact = require('./models/contact');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltRounds = 10;


app.use(cors());//allow Angular to access the node js
app.use(express.json())//middleware
app.use('/images', express.static('uploads')); //making the uploads folder publicly accessible

//FK Cascade
Lessor.hasMany(Car, {
    foreignKey: 'lessor_id'
});
Car.belongsTo(Lessor, {
    foreignKey: 'lessor_id'
});


Contact.hasMany(Lessor, {
    foreignKey: 'contact_id'
});
Lessor.belongsTo(Contact, {
    foreignKey: 'contact_id'
});

Car.hasMany(Order, {
    foreignKey: 'car_id'
});
Order.belongsTo(Car, {
    foreignKey: 'car_id'
});

config.authenticate().then(()=>{
    console.log('database connected');
}).catch((err)=>{
    console.log(err);
})

//Configuring our upload folder and upload filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

app.listen(8000,()=>{
    console.log('listening on port 8000');
})

app.post('/register',multer({storage}).single('lessor_picture'), function(req, res){

    let plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        
        let user_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            lessor_picture: req.file ? req.file.filename : null
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
app.get('/car_available',(req,res)=>{
    let data={
        where:{
            rented: false 
        },
        include: Lessor
    }
    Car.findAll(data).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
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

//Tab3: find cars belonging to the current user 
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

app.post('/car',multer({storage}).single('car_picture'),(req,res)=>{
    let car_data = {
        lessor_id:req.body.lessor_id,
        seats:req.body.seats,
        type:req.body.type,
        make:req.body.make,
        model:req.body.model,
        model_year:req.body.model_year,
        start_date:req.body.start_date,
        end_date:req.body.end_date,
        country:req.body.country,
        city:req.body.city,
        return_location:req.body.return_location,
        car_picture: req.file ? req.file.filename : null
    };
    Car.create(car_data).then((result)=>{
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
        //save the update to the DB
        result.save().then(()=>{
            res.status(200).send(['car rented update successful!']);
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
            res.status(200).send(['delete successful!']);
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
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

//Update phone number by lessor ID
app.patch('/lessor_phone_number/:id',multer({storage}).single('phone_number'),(req,res)=>{
    let id = parseInt(req.params.id);
    Lessor.findByPk(id).then((result)=>{
        console.log(result);
        result.phone_number = req.body.phone_number;
        // result.phone_number = req.file ? req.file.filename : null ; //doesn't change DB value
        //save the update to the DB
        result.save().then(()=>{
            res.status(200).send(['lessor phone number update successful!']);
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//Update the lessor_picture in Lessor Table for editProfile page
app.patch('/lessor_picture/:id',multer({storage}).single('profile_picture'),(req,res)=>{
    let id = parseInt(req.params.id);
    Lessor.findByPk(id).then((result)=>{
        result.lessor_picture = req.file ? req.file.filename : null ;
        //save the update to the DB
        result.save().then(()=>{
            res.status(200).send(['lessor_picture update successful!']);
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
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

app.delete('/delete_order/:id',(req,res)=>{
    let id = parseInt(req.params.id);
    Order.findByPk(id).then((result)=>{
        result.destroy().then(()=>{
            res.status(200).send(['delete successful!']);
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//----------------------Contacts Table

//find contacts belonging to the current user based on the user email
app.get('/contact_user/:lessor_email',(req,res)=>{
    let data={
        where:{
            lessor_email: req.params.lessor_email
        },
        include: Lessor
    }
    Contact.findAll(data).then((result)=>{
        console.log(result);
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})


app.post('/contact',(req,res)=>{
   Contact.create(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    })
})

//Update the lessor_email value in contact table
app.patch('/contact/:id',(req,res)=>{
    let contact_id = parseInt(req.params.id);
    Contact.findByPk(contact_id).then((result)=>{
        console.log(result);
        result.lessor_email = req.body.lessor_email;
        //save the update to the DB
        result.save().then(()=>{
            res.status(200).send(['contact lessor_email update successful!']);
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})

//Update the contact_picture value in contact table when adding a contact in tab2
app.patch('/contact_picture/:id',(req,res)=>{
    let contact_id = parseInt(req.params.id);
    Contact.findByPk(contact_id).then((result)=>{
        console.log(result);
        result.contact_picture = req.body.contact_picture;
        //save the update to the DB
        result.save().then(()=>{
            res.status(200).send(['contact contact_picture update successful!']);
        }).catch((err)=>{
            res.status(400).send(err);
        })
    }).catch((err)=>{
        res.status(400).send(err);
    })
})