let express=require("express")
let cors=require("cors")
let cookieParser=require("cookie-parser")
let bodyParser=require("body-parser")
let bcrypt=require("bcrypt")

//importation Model Admin
const adminModel=require('./models/AdminModel')

let app=express()
require("dotenv").config()
let mongoose=require('mongoose')
app.use(express.json())
app.use(cors({
origin:process.env.url_front,
credentials: true

}
))

app.use(cookieParser())
app.use(bodyParser.json())


//create admin if not exist
const createAdmin=async()=>{ 
    let findAdmin=await adminModel.findOne();
    if(!findAdmin){
        let passe="admin@123@";
        let passwordHash=await bcrypt.hash(passe,10);
        await adminModel.create({
            nom:"admin",
            email:"admin@gmail.com",
            password: passwordHash,
        });
    }
};

//importation router
let userRouter=require('./routes/user.Routers')
let catgRouter=require('./routes/categorie.Routers')
const adminRouter= require('./routes/Admin.Routers')

app.get(`/`,async(req,res)=>(
res.send("welco me to my app")
))

app.use('/api',userRouter)
app.use('/api',catgRouter)
app.use('/api',adminRouter)

let Port=process?.env?.port||3200

//connect to mongoose
mongoose.set('strictQuery', true)
mongoose.connect(process?.env?.mongo_url,
    {
        useNewUrlParser:true,
        useUniFiedTopology:true
    },
    
    (error)=>{
    let db=mongoose.connection;
    if(error){
        db.on("error",console.log.bind(console),"MongoDb error connection")
    } else{
        console.log("connect to MongoDb")
    }
})

app.listen(Port,async()=>(
    createAdmin(),
    console.log("serveur running on port", Port)

))

