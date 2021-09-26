const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');

//Geting all
router.get('/',verifyToken, (req,res)=>{
    res.send('Hello word')
})
//Geting one
router.get('/:id', (req,res)=>{
    res.send(req.params)
})
//creating one
router.post('/', (req,res)=>{

})
//update one
router.patch('/', (req,res)=>{

})
router.delete('/:id', (req,res)=>{

})
module.exports = router