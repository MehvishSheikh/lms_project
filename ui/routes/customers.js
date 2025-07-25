
// const router = require('express').Router();
// let Customer = require('../models/customer.model');

// router.get('/', async (req, res) => {
//     try{
//         const customers = await Customer.find()
//         //.limit(5);
//         res.json(customers)
//     }catch(err){
//         res.send(err)
//     }
// });

// router.get('/:id', async (req, res) => {
//     try{
//         const customer = await Customer.findById(req.params.id)
//         res.json(customer)        
//     }catch(err){
//         res.send(err)
//     }

// });

// router.put('/:id', async (req, res) => {
//     try{
//         const customer = await Customer.findById(req.params.id);
//         customer.id = req.body.id;
//         customer.first_name = req.body.first_name;
//         customer.last_name = req.body.last_name;
//         customer.gender = req.body.gender;
//         customer.age = req.body.age;
//         const c1 = await customer.save();
//         res.json(c1)
//     }catch(err){
//         res.send(err)
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try{
//         const customer = await Customer.findByIdAndDelete(req.params.id)
//         const c1 = await customer.delete()
//         res.json(c1)
//     }catch(err){
//         res.send(err)
//     }
// });

// router.post('/', async (req, res) => {
//     const newCustomer = new Customer({
//         id: req.body.id,
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         gender: req.body.gender,
//         age: req.body.age
//     });
//     try{
//         const c1 = newCustomer.save();
//         res.send(c1);
//     }catch(err){
//         res.send('Error')
//     }
// });

// module.exports = router;


const router = require('express').Router();
const Customer = require('../models/customer.model');

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.json(customer);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        customer.user_id = req.body.user_id;
        customer.first_name = req.body.first_name;
        customer.last_name = req.body.last_name;
        customer.email_user = req.body.email_user;
        customer.phone_no = req.body.phone_no;
        customer.user_role = req.body.user_role;
        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/:id', async (req, res) => {

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
        res.json(deletedCustomer);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const newCustomer = new Customer({

        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_user: req.body.email_user,
        phone_no: req.body.phone_no,
        user_role: req.body.user_role
    });
    try {
        const savedCustomer = await newCustomer.save();
        res.json(savedCustomer);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
