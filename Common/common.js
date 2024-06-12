const mongoose = require('mongoose')
const Url = "mongodb+srv://yogeshdbe:mongodb2@cluster0.apdphhr.mongodb.net/?retryWrites=true&w=majority&appName=cluster0"
// const Url = "mongodb+srv://srirampeter45:srirampeter45@sriram45.0bfryh6.mongodb.net/?retryWrites=true&w=majority&appName=Sriram45"

const connect=()=>{
    mongoose.connect(Url,{
        dbName:"jobportal"
    })

    .then(()=>{
        console.log("mongoose connect......");
    })
    .catch((error)=>{
        console.log("mongoose connect:",error.message);
    })
}

module.exports = connect;