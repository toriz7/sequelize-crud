const momonet= require('moment');

module.exports = (sequelize,DataTypes)=>{
    const Products = sequelize.define('Products', //사용할 데이터베이스 이름
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
        name:{type:DataTypes.STRING},
        price:{type:DataTypes.INTEGER},
        description :{type:DataTypes.TEXT}
    });
    // 작동 안됨
    Products.prototype.dateFormat = (date) => {
        return moment(date).format('YYYY년 MM월 DD일');
        //moment(date).format('YYYY년 MM월 DD일'); 처럼 return 삭제도 가능. => 함수에서
    }

    return Products;
}