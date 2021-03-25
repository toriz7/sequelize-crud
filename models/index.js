var Sequelize= require('sequelize');
var path = require('path');
var fs=require('fs');
var dotenv=require('dotenv');

dotenv.config(); //LOAD CONFIG. prcoess.env 사용위함

const sequelize = new Sequelize( process.env.DATABASE,
 process.env.DB_USER, process.env.DB_PASSWORD,{
     host: process.env.DB_HOST,
     dialect: 'mysql',
     timezone: '+09:00', //한국 시간 셋팅
     operatorsAliases: Sequelize.Op,
     pool: {
         max: 5,
         min: 0,
         idle: 10000
     }
 });
    
    /*
    디렉토리 내 파일을 읽어서, index.js 제외한 나머지 파일을 참조해서 테이블을 만든다
    */
    let db=[];
    fs.readdirSync(__dirname)
    .filter(file =>{
        return file.indexOf('.js')&& file !=='index.js'
    
    })
    .forEach(file=>{
        var model = sequelize.import(path.join(__dirname,
            file));
            db[model.name]=model;

    });
    /*
    속성들
    */
    Object.keys(db).forEach(modelName=>{
        if("associate" in db[modelName]){
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize=Sequelize;
    module.exports = db;