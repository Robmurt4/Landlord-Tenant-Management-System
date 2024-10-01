//LANDLORD TENANT MANAGEMENT SYSTEM BY ROBERT MURTAGH

//This is the backend of the programand is ran with node.js

var mysql = require('mysql');

//Connect to the SQL Database:
var con = mysql.createConnection({
  host: "localhost",
  user: "Robert",
  password: "dFgE(gB3Jx01GVpx",
  database: "database"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });

// import bodyParser from 'body-parser' //Used to read request body
//Set up Express
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.use(bodyParser.json());

//RETRIEVE SECTIONS OF CRUD:

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dashboard.html')); //Display HTML
})
app.get('/dashboard.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/dashboard.css')); //Display CSS
})
//Return data for tenants
app.get('/api/tenants', (req, res) => {
    con.connect(function(err) {
        con.query("SELECT s1.*, s2.* FROM `tenant_info`"+
                  " AS s1, `home_address`"+
                  " AS s2 WHERE s1.`Email Address` = s2.`Owner's Email`;"
        , function (err, result, fields) {
        data = JSON.stringify(result);
        res.json(result);     
      });
    });
}
)
//Return data for landlords
app.get('/api/landlords', (req, res) => {
    con.connect(function(err) {
        con.query("SELECT s1.*, s2.* FROM `landlord_info`"+
                  " AS s1, `home_address`"+
                  " AS s2 WHERE s1.`Email Address` = s2.`Owner's Email`;"
        , function (err, result, fields) {
      
        data = JSON.stringify(result);
        res.json(result);     
      });
    });
}
)
//Return data for contracts
app.get('/api/contracts', (req, res) => {
    con.connect(function(err) {
        con.query("SELECT *  FROM `tenant-landlord_contracts`"
        , function (err, result, fields) {
      
        data = JSON.stringify(result);
        res.json(result);     
      });
    });
}
)




//POST for Tenents
app.post('/api/tenants', (req, res) => {
    var userData = req.body;
    console.log(userData);

    con.connect(function(err) {

        var sql = "INSERT INTO `tenant_info` (`Title`, `First Name(s)`, `Surname`, `Phone Number`, `Email Address`) VALUES ('"+userData.title+"', '"+userData.firstname+"', '"+userData.surname+"', '"+userData.mobile+"', '"+userData.email+"');"
        //var sql = "INSERT INTO `tenant_info`(`Title`, `First Name(s)`, `Surname`, `Phone Number`, `Email Address`) VALUES ('"+userData.title+"','[value-2]','[value-3]','[value-4]','[value-5]')"
        con.query(sql, function (err, result) {
            if (err) {
                console.error('Error inserting user into the database: ' + err.stack);
                return res.status(500).json({ error: 'Failed to insert user' });
            }
          // if (err) throw err;
          console.log("1 record inserted");
        //res.json({ message: 'User inserted successfully' });
        });
    });
    con.connect(function(err) {
                    
        var sql = "INSERT INTO `home_address`(`Owner's Email`, `Address Line 1`, `Address Line 2`, `Town`, `County/City`, `Eircode`) VALUES ('"+userData.email+"','"+userData.address1+"','"+userData.address2+"','"+userData.town+"','"+userData.city+"','"+userData.eircode+"');"
        con.query(sql, function (err, result) {
            console.log("1 record inserted");
            if (err) {
            console.error('Error inserting user into the database: ' + err.stack);
            return res.status(500).json({ error: 'Failed to insert user' });
        }
        // if (err) throw err;
        console.log("1 record inserted");
        res.json({ message: 'User inserted successfully' });
        });
    });
      
});
//Post for Landlords:
app.post('/api/landlords', (req, res) => {
    var userData = req.body;
    console.log(userData);
    con.connect(function(err) {

        var sql = "INSERT INTO `landlord_info`(`Title`, `First Name(s)`, `Surname`, `Phone Number`,"+ 
        "`Email Address`, `Date of Birth`, `Permission to  rent properties from the council`,"+
        "`Permission for tenants to contact the landlord  via email`) "+
        "VALUES ('"+userData.title+"', '"+userData.firstname+"', '"+userData.surname+"', '"+userData.mobile+"', '"+userData.email+"','"+userData.dob+"','"+userData.rentPerm+"','"+userData.emailPerm+"');"

        con.query(sql, function (err, result) {
            if (err) {
                console.error('Error inserting user into the database: ' + err.stack);
                return res.status(500).json({ error: 'Failed to insert user' });
            }
          // if (err) throw err;
          console.log("1 record inserted");
          //res.json({ message: 'User inserted successfully' });
        });
      });
      con.connect(function(err) {
                    
        var sql = "INSERT INTO `home_address`(`Owner's Email`, `Address Line 1`, `Address Line 2`, `Town`, `County/City`, `Eircode`) VALUES ('"+userData.email+"','"+userData.address1+"','"+userData.address2+"','"+userData.town+"','"+userData.city+"','"+userData.eircode+"');"
        con.query(sql, function (err, result) {
            console.log("1 record inserted");
            if (err) {
            console.error('Error inserting user into the database: ' + err.stack);
            return res.status(500).json({ error: 'Failed to insert user' });
        }
        // if (err) throw err;
        console.log("1 record inserted");
        res.json({ message: 'User inserted successfully' });
        });
    });
});
//Post for contracts:
app.post('/api/contracts', (req, res) => {
    var userData = req.body;
    console.log(userData);
    //Conect to SQL:
    con.connect(function(err) {

        var sql = "INSERT INTO `tenant-landlord_contracts`"+
        "(`Contract Date`, `Property Address`, `Tenant(s)`, "+
        "`Landlord`, `Fee (Monthly)`, `Property  Door Number`, `Contract Length`,"+ 
        "`Property  Type`) VALUES ('"+userData.cdate+"','"+userData.pAddress+"','"+userData.tenants+"','"+userData.landlord+"',"+
        "'"+userData.fee+"','"+userData.propertyNo+",','"+userData.contractLength+"','"+userData.propertyType+"')"

        con.query(sql, function (err, result) {
            if (err) {
                console.error('Error inserting user into the database: ' + err.stack);
                return res.status(500).json({ error: 'Failed to insert user' });
            }
          // if (err) throw err;
          console.log("1 record inserted");
          res.json({ message: 'User inserted successfully' });
        });
      });
});
//DELETE FOR TENENTS
app.delete('/api/tenants', 
    (req, res) => { 
        console.log("delete");
        var userData = req.body;
        //res.send("DELETE Request Called") 
        console.log(userData.email);
        con.connect(function(err) {

            var sql = "DELETE s1.*, s2.* FROM `tenant_info` AS s1, `home_address` AS s2 WHERE s1.`Email Address` = s2.`Owner's Email` AND s1.`Email Address` = '"+userData.email+"';"
  
            con.query(sql, function (err, result) {
  
              console.log("Number of records deleted: " + result.affectedRows);
  
              res.json({ message: 'User delted successfully' });
            });
          });
}) 
//DELETE REQUEST FOR LANDLORD
app.delete('/api/landlords', 
    (req, res) => { 
        console.log("delete");
        var userData = req.body;
        //res.send("DELETE Request Called") 
        console.log(userData.email);
        con.connect(function(err) {

            var sql = "DELETE s1.*, s2.* FROM `landlord_info` AS s1, `home_address` AS s2 WHERE s1.`Email Address` = s2.`Owner's Email` AND s1.`Email Address` = '"+userData.email+"';"
  
            con.query(sql, function (err, result) {
  
              console.log("Number of records deleted: " + result.affectedRows);
  
              res.json({ message: 'User deleted successfully' });
            });
          });
}) 
app.delete('/api/contracts', 
    (req, res) => { 
        console.log("delete");
        var userData = req.body;
        //res.send("DELETE Request Called") 
        console.log(userData.email);
        con.connect(function(err) {

            var sql = "DELETE FROM `tenant-landlord_contracts` WHERE `Property Address` = '"+userData.email+"';"
  
            con.query(sql, function (err, result) {
  
              console.log("Number of records deleted: " + result.affectedRows);
  
              res.json({ message: 'Contract deleted successfully' });
            });
          });
}) 
//UPDATE FOR TENENTS
app.put('/api/tenants', 
    (req, res) => { 
        console.log("update");
        var userData = req.body;
        //res.send("DELETE Request Called") 
        console.log(userData);
        con.connect(function(err) {

            var sql = "UPDATE `tenant_info` s1, `home_address` s2"+ 
            " SET s1.`Title`='"+userData.title+"',s1.`Phone Number`='"+userData.mobile+"',"+
            " s2.`Address Line 1`='"+userData.address1+"',s2.`Address Line 2`='"+userData.address2+"',"+
            " s2.`Town`='"+userData.town+"', s2.`County/City`='"+userData.city+"', s2.`EIRCODE`='"+userData.eircode+"'"+
            " WHERE s1.`Email Address` = s2.`Owner's Email` AND s1.`Email Address` = '"+userData.email+"';"

            con.query(sql, function (err, result) {
              // if (err) throw err;
              if (err) {
                console.error('Error inserting user into the database: ' + err.stack);
                return res.status(500).json({ error: 'Failed to update user' });
            }
              console.log(result.affectedRows + " record(s) updated");


              res.json({ message: 'User updated successfully' });
            });
          });     
}) 
//UPDATE LANDLORD
app.put('/api/landlords', 
    (req, res) => { 
        console.log("update");
        var userData = req.body;
        //res.send("DELETE Request Called") 
        console.log(userData);
        con.connect(function(err) {

            var sql = "UPDATE `landlord_info` s1, `home_address` s2"+ 
            " SET s1.`Title`='"+userData.title+"',s1.`Phone Number`='"+userData.mobile+"',"+
            " s2.`Address Line 1`='"+userData.address1+"',s2.`Address Line 2`='"+userData.address2+"',"+
            " s2.`Town`='"+userData.town+"', s2.`County/City`='"+userData.city+"', s2.`EIRCODE`='"+userData.eircode+"'"+
            ",`Date of Birth`='"+userData.dob+"',"+
            "`Permission to  rent properties from the council`='"+userData.rentPerm+"',"+
            "`Permission to  rent properties from the council`='"+userData.emailPerm+"'"+
            " WHERE s1.`Email Address` = s2.`Owner's Email` AND s1.`Email Address` = '"+userData.email+"';"      

            con.query(sql, function (err, result) {
              // if (err) throw err;
              if (err) {
                console.error('Error inserting user into the database: ' + err.stack);
                return res.status(500).json({ error: 'Failed to update user' });
            }
              console.log(result.affectedRows + " record(s) updated");


              res.json({ message: 'User updated successfully' });
            });
          });     
}) 

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`)); 