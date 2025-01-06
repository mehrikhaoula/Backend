let Admin=require('../models/AdminModel')
let jwt=require('jsonwebtoken')
let bcrypt=require('bcrypt')

let AdminCtrl={
    login:async(req,res)=>{
         try {
            let{email,password}=req.body;
            let findAdmin=await Admin.findOne({email});
            if (!findAdmin)
                return res.status(302).json({message:"email incorrect"});
            let compare=await bcrypt.compare(password,findAdmin.password);
            if (!compare)
                return res.status(302).json({message:"mot de passe incorrect"});
            const tokenData={
                _id: findAdmin._id,
                email: findAdmin.email,
            };
            const token=await jwt.sign(tokenData,process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 60*60*2,
            });
            const tokenOption={
                httpOnly: true,
                secure: true,
            };
            res.cookie("token", token,tokenOption).status(200).json({
                message:"login success",
                data: token,
                success: true,
                error: false,
            });
         } catch (error) {
            res.status(500).json({
                message:error.message|| error,
                success: false,
                error: true,
            });    
         }
    },
    logout:async(req,res)=>{
        try {
            res.clearCookie("token")
            res.json({
                message:"logged out",
                error: false,
                susccess: true,
            });
        } catch (error) {
            res.json({
                message: error.message||error ,
                error: true,
                susccess: false,
            });
        }
    }
}
module.exports=AdminCtrl