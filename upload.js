// //send form data to server
// var http=require('http')
// var formidable=require('formidable')
// var server=http.createServer((req,res)=>
// {
//     if(req.url=='./fileupload'){
//         var form=new formidable.IncomingForm()
//         form.parse(req,function(err,fields,files)
//         {
//             res.write('file uploded in temp folder')
//             res.end()
//         })
//     }
//     else
//     {
//         res.writeHead(200,{'content-Type':'text/html'})
//     res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
//     res.write('<input type= "file" name="fileupload"><br>')
   
//     res.write('<input type="submit">')
//     res.write('</form>')
//     }
//     

// })
// server.listen(9000,()=>
// {
//     console.log('server is running')
// })


var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer((req, res)=> {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/abc/' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded sucessfully!');
        res.end();
      });
 });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080,()=>
{
  console.log('server is running')
})