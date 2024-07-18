require('dotenv').config();  
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require('path');
const ScreenCost = require('./models/schemathree');  
const connectDB = require('./mongoconn');  

 
connectDB();

// Function to parse XLSX and upload data to MongoDB
const parseAndUploadXLSX = (filePath) => {
    // Read the XLSX file
    const workbook = XLSX.readFile(filePath);

    // Assuming the data is in the first sheet
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const data = [];

    // Skip the header row and process data rows
    for (let i = 1; i < jsonData.length; i++) {
        let row = jsonData[i];
        let cinemaName = row[0] ? row[0].toString().trim() : null;
        let screenID = row[1] ? parseFloat(row[1]) : null;
        let seatingCapacity = row[2] ? parseFloat(row[2]) : null;
        let cost = row[3] ? parseFloat(row[3]) : null;

        // Skip rows where required fields are missing or invalid
        if (cinemaName && !isNaN(screenID) && !isNaN(seatingCapacity)) {
            data.push({
                cinemaName,
                screenID,
                seatingCapacity,
                cost
            });
        }
    }

    // Upload data to MongoDB
    ScreenCost.insertMany(data)
        .then(() => {
            console.log('Data uploaded successfully');
            mongoose.connection.close();
        })
        .catch((error) => {
            console.error('Error uploading data: ', error);
            mongoose.connection.close();
        });
};

 
const filePath = 'C:\\Users\\91824\\Downloads\\excel.csv';
parseAndUploadXLSX(filePath);
