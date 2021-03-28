module.exports = (sequelize,DataTypes)=>{
    const Products = sequelize.define('Products', //사용할 데이터베이스 이름
    {
        id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
        name:{type:DataTypes.STRING},
        price:{type:DataTypes.INTEGER},
        description :{type:DataTypes.TEXT}
    });
    return Products;
}