const express = require('express');
const router = express.Router();
require('dotenv').config();
const { GoogleAuth } = require('google-auth-library');
const jwt = require('jsonwebtoken');
// const { credentials, apiUrl } = require('../config/google-wallet-config'); Might get rid of google-wallet.js file later

const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;
const classId = `${issuerId}.MyVitto`
const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';
const credentials = require('../../oauth-login-1708845996414-99ff33610f90.json');

const httpClient = new GoogleAuth({
  credentials: credentials,
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
});

async function createPassClass(req, res) {
  let genericClass = {
    'id': `${classId}`,
  };

  let response;
  try {
    // Check if the class exists already
    response = await httpClient.request({
      url: `${baseUrl}/genericClass/${classId}`,
      method: 'GET'
    });

    console.log('Class already exists:', response.data);

    // Update class if needed
    const patchResponse = await httpClient.request({
      url: `${baseUrl}/genericClass/${classId}`,
      method: 'PATCH',
      data: genericClass,
    });

    console.log('Class updated successfully:', patchResponse.data);

  } catch (err) {
    if (err.response && err.response.status === 404) {
      // Class does not exist
      // Create it now
      response = await httpClient.request({
        url: `${baseUrl}/genericClass`,
        method: 'POST',
        data: genericClass
      });

      console.log('Class insert response');
      console.log(response);
    } else {
      // Something else went wrong
      console.log(err);
      res.send('Something went wrong...check the console logs!');
    }
  }
}

async function createPassObject(req, res) {
  // TODO: Create a new Generic pass for the user
  const objectSuffix = `${req.body.email.replace(/[^\w.-]/g, '_')}`; // calculate random suffixes so that user can create different cards
  const objectId = `${issuerId}.${objectSuffix}`;
  const name = `${req.body.username}`;
  
  let genericObject = {
    'id': `${objectId}`,
    'classId': classId,
    'genericType': 'GENERIC_TYPE_UNSPECIFIED',
    'hexBackgroundColor': '#4285f4',
    'logo': {
      'sourceUri': {
        'uri': 'https://storage.googleapis.com/wallet-lab-tools-codelab-artifacts-public/pass_google_logo.jpg'
      }
    },
    'cardTitle': {
      'defaultValue': {
        'language': 'en',
        'value': 'MyVittoCard'
      }
    },
    'header': {
      'defaultValue': {
        'language': 'en',
        'value': `${name}`
      }
    },
    'heroImage': {
      'sourceUri': {
        'uri': 'https://m.media-amazon.com/images/I/7163OmwlZhL.jpg'
      }
    },
  };

  // check if object exists, if so then update
  var response;
  try {
    // Check if the object exists already
    response = await httpClient.request({
      url: `${baseUrl}/genericObject/${objectId}`,
      method: 'GET'
    });

    if (response && response.status === 200) {
      console.log('Object already exists');

      const patchResponse = await httpClient.request({
        url: `${baseUrl}/genericObject/${objectId}`,
        method: 'PATCH',
        data: genericObject,
      });

      console.log(patchResponse);
    }
    else {
      console.log("Object does not exist");
    }

    // integrate token here
    const claims = {
      iss: credentials.client_email,
      aud: 'google',
      origins: [],
      typ: 'savetowallet',
      payload: {
        genericObjects: [
          genericObject
        ]
      }
    };

    const token = await jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' });
    const saveUrl = await `https://pay.google.com/gp/v/save/${token}`;
    // TODO: add to google wallet button
    // res.send(`<a href='${saveUrl}'><img src='wallet-button.png'></a>`);

    res.send(saveUrl);
  } catch (err) {
    // Something else went wrong
    console.log(err);
    res.send('Something went wrong...check the console logs!');
  }
}

router.post('/generategooglecard', async (req, res) => {
  try {
    await createPassClass(req, res);
    await createPassObject(req, res);
  } catch (error) {
    console.error('Error creating pass:', error);
    res.status(500).json({ error: 'Failed to create pass' });
  }
});

module.exports = router;