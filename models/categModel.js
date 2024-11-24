let mongoose=require('mongoose')

let CategorieSchema=new mongoose.Schema({
    nomCategorie:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('categorie',CategorieSchema)