let categorie=require('../models/categModel')


let categorieCtrl={
    ajoutcatg:async(req,res)=>{
        try {
            let {nomCategorie,type}=req.body
            
                if(!nomCategorie) return res.status(302).json({msg:"nomCategorie est obligatoire"})
                if(!type) return res.status(302).json({msg:"type est obligatoire"})
                let newCategorie=new categorie({nomCategorie,type})
            await newCategorie.save()
            res.json({newCategorie})

        } catch (error) {
            
        }
    },
    getcategorieById:async(req,res)=>{
        try {
            let {id}=req.params
            let findcategorie=await categorie.findById({_id:id})
            res.json({resultat:findcategorie})
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    getAllcat:async(req,res)=>{
        try{
            let findcategorie=await categorie.find()
            res.json({result:findcategorie})
        } catch (error){
            return res.status(500).json({msg:error.message})
        }
},
getcategorieByNom:async(req,res)=>{
    try {
        let {nomCategorie}=req.body
        let findcategorie=await categorie.findOne({nomCategorie})
        res.json({resultat:findcategorie})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
getcategorieByType:async(req,res)=>{
    try {
        let {type}=req.body
            let findtype=await categorie.find({type})
        res.json({resultat:findtype})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
updatenomCategorie:async(req,res)=>{
    try {
        let {type}=req.body
        let findtype=await categorie.updateMany({type:type},{nomCategorie:"parfum"})
        res.json({resultat:findtype,msg:"categorie updated"})

    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
supprimtype:async(req,res)=>{
    try {
        let {type}=req.body
        let findtype=await categorie.deleteMany({type})
        res.json({resultet:findtype,msg:"type supprimer"})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
}
module.exports=categorieCtrl

