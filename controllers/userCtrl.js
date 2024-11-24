let user=require('../models/UserModel')
let bcrypt=require('bcrypt')

const userCtrl={
//     add:async(req,res)=>{
//     try {
//             let{a,b}=req.body
//           let resultat=a+b
//         if (!a) return res.status(302).json({msg:"a est obligatoire"})
//            if (!b) return res.status(302).json({msg:"b est obligatoire"})

//          res.json({result:a+b})
//        } catch (error) {
//             return res.send(500).json({msg:error.message})
//             //return res.status(500).json({msg:error.message})
//       //  }
//  //   },    //, pour déclarer une nouvelle fonction

//   //  Division:async(req,res)=>{
//    //     try {
//             let{a,b}=req.body
//           let resultat=a/b
//  //         if (!a) return res.status(302).json({msg:"a est obligatoire"})
//          //       if (b===0) return res.status(302).json({msg:"b !==0"})   
//                     //===mm type que 0 nombre w égale 0

//   //         res.json({result:a/b})
//      //   } catch (error) {
//            return res.send(500).json({msg:error.message})
//            return res.status(500).json({msg:error.message})
//         }
//     },
//     Mul:async(req,res)=>{
//         try {
//         let{a,b}=req.body
//            let resultat=a/b
//           if (!a) return res.status(302).json({msg:"a est obligatoire"})
//            if (!b) return res.status(302).json({msg:"b est obligatoire"})  
                 

//          res.json({result:a*b})
//         } catch (error) {
//          return res.send(500).json({msg:error.message})
//             //return res.status(500).json({msg:error.message})
//         }
//     }
// }

inscrit:async(req,res)=>{
    try {
        let {nom,prenom,email,password}=req.body
            //recherche user par email
        let findUser=await user.findOne({email})
            //verifier si user existe
        if(findUser) return res.status(302).json({msg:"email déja existe"})
            //verifier champ nom obligatoire
        if(!nom) return res.status(302).json({msg:"nom est obligatoire"})
            //verifier champ prenom obligatoire
        if(!prenom) return res.status(302).json({msg:"nom est obligatoire"})

            //cripter mot de passe
        let passwordHash=await bcrypt.hash(password,10)

            //creation new objet user "affichage"
        let newUser=new user({nom,prenom,email,password:passwordHash})

        //enregistre user dans BDD
        await newUser.save()
        res.json({
            resultat:newUser
        })
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
allUser:async(req,res)=>{
    try{
        let findUser=await user.find()
        res.json({result:findUser})
    } catch (error){
        return res.status(500).json({msg:error.message})
    }
},
getUserById:async(req,res)=>{
    try {
        let {id}=req.params
        let findUser=await user.findById({_id:id})
        res.json({resultet:findUser})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
// 2éme méthode recherche id dans body
getUserId:async(req,res)=>{
    try {
        let {id}=req.body
        let findUser=await user.findById({_id:id})
        res.json({resultet:findUser})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
supprimUser:async(req,res)=>{
    try {
        let {id}=req.params
        let findUser=await user.findByIdAndDelete({_id:id})
        res.json({resultet:findUser,msg:"user deleted"})
    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
updateUser:async(req,res)=>{
    try {
        let {id,nom,prenom,email}=req.body
        let findUser=await user.findByIdAndUpdate({_id:id},{nom,prenom,email})
        res.json({resultat:findUser,msg:"user updated"})

    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
},
updatePassword:async(req,res)=>{
    try {
        let {id,password,nvPassword,confirmPassword}=req.body
      
        let findUser=await user.findById({_id:id})
     
        let comparPassword=await bcrypt.compare(password,findUser.password)
        if(!comparPassword) return res.status(302).json({msg:"mot de passe incorrect"})
            if(nvPassword!==confirmPassword) return res.status(302).json({msg:"nvpassword et confirmpassword différents"})
        let passwordHash=await bcrypt.hash(nvPassword,10)
      await user.findByIdAndUpdate({_id:id},{password:passwordHash})
        res.json({msg:"password updated"})

    } catch (error) {
        return res.status(500).json({msg:error.message})
    }
}
}


module.exports=userCtrl