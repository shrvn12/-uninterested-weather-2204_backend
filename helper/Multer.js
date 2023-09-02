const multer=require("multer");
const path=require("path");
const fs=require("fs");
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const configPath=path.join(__dirname,"..");
        const ConfigFolder=path.join(configPath,"uploads");
        if(!fs.existsSync(ConfigFolder)){
            fs.mkdirSync(ConfigFolder);
        }
        cb(null,ConfigFolder)
    },
    filename:function(req,file,cb){
        const UniqueUrl=Date.now()+"-"+file.originalname
       const ans= cb(null,UniqueUrl);
       console.log(UniqueUrl)
       return UniqueUrl
       console.log(ans)
    }
});

const upload=multer({storage});

module.exports={
    upload
}