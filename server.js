  var express         = require('./packages/node_modules/express');
  var app             = express();
  var mongoConnection = require('./server-db.js');
  var insertData   = require('./model/InsertData.js');
  var bodyParser = require('body-parser');
  
  app.use(express.static(__dirname));
  app.use(bodyParser.json());
  
  mongoConnection.connectToServer(function (err) {
    var db = mongoConnection.getDb();

    app.post('/insertData', function (req, res) {
      
      insertData.insertData(db, req, res);
    });
  });
  
  app.get('/', function (req, res) {
  	 res.sendFile(__dirname+"\\index.html");
  });
  app.get('/', function (req, res) {
    res.sendFile(__dirname+"\\index2.html");
  });


 //  // getting list of tables and sending response to client
 //  app.get('/getTables', function (req, res) {
 //       listOfTablesInDB.getTablesInfo(connection,req, res);
 //
 //  });
 //
 // //getting columsn and rows of selected table                  
 //  app.get('/getColumnNameAndRowsOfTable', function (req, res) {
 //    connection.changeUser({database:req.query.dbName});
 //      tableData.getColumnsAndRowsOfTable(connection,req,res);
 //  });
  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

  });