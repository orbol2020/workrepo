require('dotenv').config();
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const path = require('path');
const Theatrical = require('./models/schematwo');   
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
        let state = row[0] ? row[0].toString().trim() : null;
        let city = row[1] ? row[1].toString().trim() : null;
        let mall = row[2] ? row[2].toString().trim() : null;
        let mallArea = row[3] ? row[3].toString().trim() : null;
        let pincode = row[4] ? row[4].toString().trim() : null;
        let image = row[5] ? row[5].toString().trim() : null;

        // Skip rows where required fields are missing
        if (state && city && mall && mallArea && pincode && image) {
            data.push({
                state,
                city,
                mall,
                mallArea,
                pincode,
                image
            });
        }
    }

    // Upload data to MongoDB
    Theatrical.insertMany(data)
        .then(() => {
            console.log('Data uploaded successfully');
            mongoose.connection.close();
        })
        .catch((error) => {
            console.error('Error uploading data: ', error);
            mongoose.connection.close();
        });
};

const filePath = 'C:\\Users\\91824\\Downloads\\excel2.csv';   
parseAndUploadXLSX(filePath);
