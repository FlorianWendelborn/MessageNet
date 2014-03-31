var db = require('./main.js');
var dbData = db.get();
dbData.test = true;
db.set(dbData);
db.save();