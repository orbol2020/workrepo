const express = require('express');
const { db } = require('./firebase.js');
const app = express();
const port = 8383;
const cors = require('cors');
app.use(cors());

//EndPoint POST http://localhost:8383/register
//Body {
//   "BusinessName": "BCA Corporation",
//   "Location": "New York",
//   "Name": "John Doe",
//   "NatureOfBusiness": "Technology",
//   "PhNo": "123-456-7890"
// }

//EndPoint GET http://localhost:8383/check-details/${phoneNumber}


app.use(express.json());

app.post('/register', async (req, res) => {
    try {
        const { BusinessName, Location, Name, NatureOfBusiness, PhNo } = req.body;
        
        // Check if all required fields are provided
        if (!BusinessName || !Location || !Name || !NatureOfBusiness || !PhNo) {
            return res.status(400).send('All fields are required');
        }

        // Add the registration details to Firestore
        await db.collection('registration').add({
            details: {
                BusinessName: BusinessName,
                Location: Location,
                Name: Name,
                NatureOfBusiness: NatureOfBusiness,
                PhNo: PhNo
            }
        });

        res.status(200).send('Registration details added successfully');
    } catch (error) {
        console.error('Error adding registration details:', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/check-details/:phNo', async (req, res) => {
    try {
        const phNo = req.params.phNo;

        // Check if details exist in Firestore based on PhNo
        const snapshot = await db.collection('registration').where('details.PhNo', '==', phNo).get();
        if (snapshot.empty) {
            // No details found for the provided PhNo
            res.status(200).send('no');
        } else {
            // Details found for the provided PhNo
            res.status(200).send('yes');
        }
    } catch (error) {
        console.error('Error checking details:', error);
        res.status(500).send('Internal server error');
    }
});

 

app.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection('registration').get();
    const users = snapshot.docs.map(doc => doc.data());
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users', error);
    res.status(500).send('Error fetching users');
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
