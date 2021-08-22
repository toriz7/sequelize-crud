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
         min: 3,
         idle: 10000
     }
 });
    
/*
디렉토리 내 파일을 읽어서, index.js 제외한 나머지 파일을 참조해서 테이블을 만든다
*/
let db=[];
fs.readdirSync(__dirname)  //동기화를 위한 Sync
    .filter(file =>{
        return file.indexOf('.js')&& file !=='index.js' // index.js 를 제외한 js 파일 중  
    })
    .forEach(file =>{
        var model = require(path.join(__dirname,
            file))(sequelize, Sequelize.DataTypes);
            db[model.name]=model;
        /* ES6 에서는 에러 발생
        var model = sequelize.import(path.join(__dirname,
            file));
            db[model.name]=model;
        */

    });
/*
foreign key 관련 속성들 처리 위한 부분
*/
Object.keys(db).forEach(modelName=>{
    if("associate" in db[modelName]){
        db[modelName].associate(db);
        }
    });

db.sequelize = sequelize;
db.Sequelize=Sequelize;
module.exports = db;