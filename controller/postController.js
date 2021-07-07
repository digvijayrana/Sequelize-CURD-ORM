const models = require('../models')
const Validater = require('fastest-validator');

function save(req,res){
    const post = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        mobile:req.body.mobile,
        gender:req.body.gender,
        date:req.body.date,
        dateOfJoing:req.body.dateOfJoining,
        address:req.body.address,
        permanentAddress:req.body.permanent,
        designation:req.body.designation,
        photo:req.file.files,
        status:req.body.status
    }

    const schema = {
        photo:{type:file,optional:false},
        name:{type:"string",optional:false,max:"100"},
        email:{type:"string",optional:false,max:"500"},
        mobile:{type:"number",optional:false},
        date:{type:"string",optional:false,max:"100"},
        dateOfJoing:{type:"string",optional:false,max:"100"},
        address:{type:"string",optional:false,max:"100"},
        permanentAddress:{type:"string",optional:false,max:"100"},
        designation:{type:"string",optional:false,max:"100"},
    
}
const v = new Validater();
const validationResponse = v.validate(post,schema);
if(validationResponse!==true){
    return res.status(400).json({
        message:"validation failed",
        errors:validationResponse
    })
}

    models.User.create(post).then(result =>{
        res.status(201).json({
            message:"Post created successfully",
            post:result
        })

    }).catch(err=>{
        res.status(500).json({
            message:"something wrong",
            error:err
        })
    })
}

function show(req,res){
    const id = req.body.id;
    console.log(id)
    models.User.findByPk(id).then(result =>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                message:" Id not found"
            })
        }
           
    }).catch(error =>{
                    res.status(500).json({
                        message:error
                    })
    })
}

function index(req,res){

    models.User.findAll().then(result =>{
            res.status(200).json(result)
    }).catch(error =>{
                    res.status(500).json({
                        message:error
                    })
    })
}

function update(req,res){
    const {id }= req.body

    const updatedPost={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
        mobile:req.body.mobile,
        gender:req.body.gender,
        date:req.body.date,
        dateOfJoing:req.body.dateOfJoining,
        address:req.body.address,
        permanentAddress:req.body.permanent,
        designation:req.body.designation,
        photo:req.body.photo,
        status:req.body.status
    }


const v = new Validater();
const validationResponse = v.validate(post,schema);
if(validationResponse!==true){
    return res.status(400).json({
        message:"validation failed",
        errors:validationResponse
    })
}

   
    models.User.update(updatedPost,{where:{id:id} })
    .then(result =>{
        res.status(200).json({
        message:"Update Successfully",
        post: result
        })
    })
    .catch(error =>{
        res.status(500).json({
            message:error
        })
    })

}

function destroy(req,res){
    const id = req.body.id;
    models.User.destroy({where:{id:id}})
    .then(
        result =>{
            res.status(200).json({
            message:"Delete Successfully",
            post: result
            })
        }
    )
    .catch(error =>{
        res.status(500).json({
            message:error
        })
    })
}
module.exports = {
    save:save,
    show:show,
    index:index,
    destory:destroy,
    update:update
}