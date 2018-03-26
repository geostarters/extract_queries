var fs = require('fs');
var csv = require("fast-csv");

const pathLogs="//icgc.local/dades/geostart/logs/";
var args  = process.argv;
if (args[2]){
    fromCSVtoSQL(args[2]);
}
else{
    fs.readdirSync('csv').forEach(file => {
        fromCSVtoSQL(file.replace(".csv",""));
    });
}


function fromCSVtoSQL(nomFitxer){
    var csv_entrada = pathLogs +"csv/"+nomFitxer+".csv";
    var fileout =  pathLogs +"sql/"+nomFitxer+".sql";
    var fileoutD =  pathLogs +"sql/"+nomFitxer+"_delete.sql";
    var stream = fs.createReadStream(csv_entrada);
    var dataArr = [];
    var dataArrD = [];
    var output = fs.createWriteStream(fileout);
    var outputD = fs.createWriteStream(fileoutD);


    csv.fromStream(stream, {headers : false, delimiter: ','})
    .on("data", function(data){
        if (data[7]=="INSERT" || data[7]=="UPDATE" || data[7]=="DELETE") {
            if (data[13].indexOf("viola la llave")==-1 && (data[13].indexOf("insert")>-1 || data[13].indexOf("update")>-1 )) {
                dataArr.push(data); // Add a row
            }
            else if ( data[13].indexOf("viola la llave")==-1 && data[13].indexOf("delete")>-1){
                dataArrD.push(data);
            }
        }
    })
    .on('end', function(){
        writeArrayToFile(dataArr,output); //inserts i updates
        writeArrayToFile(dataArrD,outputD); //deletes
    }
    );
}
function writeArrayToFile(dataArr,output){
    for (let key in dataArr) {
        var data1 = dataArr[key][13];
        data1 = data1.replace("ejecutar <unnamed>:","");
        var data2 = dataArr[key][14];
        data2 = data2.replace("parámetros: ","");
        data2 = data2.split(", $").join("; $");
        var splitData2 = data2.split(";");
        for (let key2 in splitData2) {
            var value = splitData2[key2];
            var splitValue = value.split("=");
            var clau = splitValue[0].split(" ").join("");
            data1 = data1.replace(clau,splitValue[1]);       
          }
         output.write(data1);
         output.write(";");
         output.write("\n");
        }
        output.end();
}