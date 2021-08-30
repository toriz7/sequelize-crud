const aa = new Promise((resolve, reject) =>{
    resolve(console.log("promise execute!"));

});

aa.then( ()=>{
    console.log("promise exe complete!");
})
