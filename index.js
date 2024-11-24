let express=require("express")
let cors=require("cors")
let cookieParser=require("cookie-parser")
let bodyParser=require("body-parser")
let app=express()
require("dotenv").config()
let mongoose=require('mongoose')
app.use(express.json())
app.use(cors({
origin:"*"
}
))
app.use(cookieParser())
app.use(bodyParser.json())

//importation router
let userRouter=require('./routes/user.Routers')
let catgRouter=require('./routes/categorie.Routers')


app.get(`/`,async(req,res)=>(
res.send("welco me to my app")
))

app.use('/api',userRouter)
app.use('/api',catgRouter)

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
    console.log("serveur running on port", Port)

))

