var models = require('../../models');
exports.get_products = ( _ , res) => {
    // res.render( 'admin/products.html' , 
    //     { message : "hello" } // message 란 변수를 템플릿으로 내보낸다.
    // );
    models.Products.findAll({
    }).then((products)=>{
        res.render('admin/products.html',{products : products})
    });
}

exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}

exports.post_products_write = ( req , res ) => {
    //res.send(req.body);
    // 키필드 값이 form 으로 정해져서 들어오므로 카를 다시 설정할 필요가 없다. 아래처럼 더 간단하게 가능하다.
    // models.Products.create({
    //     name:req.body.name,
    //     prcie:req.body.price,
    //     description:req.body.description
    // }).then( ()=>{
    //     res.redirect('admin/products');
    // });
    
    models.Products.create(req.body).then( ()=>{
        res.redirect('/admin/products/');  //html 이 아니라 디렉토리임에 주의
    });
}

exports.get_products_detail = (req,res) =>{
    //req.pameter.id
    models.Products.findByPk((req.params.id)).then( (product) => {
        //console.log(product);
        res.render('admin/detail.html', {product}); //key value 가 같으므로 하나로 생략 ㅎㅎ
    });
};