// converting csv data to json
import * as fs from 'fs'
import path from 'path'

const CSVToJSON = (data, delimiter=",") => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter)
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\n')
        .map((v) => {
            const values = v.split(delimiter);
            return titles.reduce(
                (obj, title, index) => ((obj[title.trim()] = values[index].trim()), obj),
            {}

        );
    });
}


// usage
const currentDir = __dirname;

// do one level above (back to 'src')
const srcDir = path.resolve(currentDir, '..');

//change to 'config' folder
const testdataDir = path.resolve(srcDir, 'data');
const csvFilePath =  `${testdataDir}`;
export const convertCsvFileToJsonFile = (csvFileName, jsonFileName, delimiter= ',') => {
    try{
        //read the csv file
        const csvData = fs.readFileSync(`${testdataDir}\\${csvFileName}`, 'utf8');

        //conver csv to json
        const jsonData = CSVToJSON(csvData, delimiter);
        // write json file
        fs.writeFileSync(`${testdataDir}\\${jsonFileName}`, JSON.stringify(jsonData, null, 2));
        
        console.log(`conversion completed. json data written to: ${testdataDir}\\${jsonFileName}`);
    }
    catch(err){
        console.log('Error converting csv to json: ' + err.message);

    }
}