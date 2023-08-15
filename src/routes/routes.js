import express from "express";
import doTransactionRequest from "../server/services/crDeliverySoapService.js";
import { getAuthToken } from "../server/utils.js";
import dotEnv from 'dotenv'

// Home page route.
let token = "";
const deliveryRoutes = express.Router();
dotEnv.config();
//Get Token Auth
deliveryRoutes.post("/", async (req, res) => {
  try {
    const { body } = req;
    const response = await getAuthToken(body);
    res.set({
      "Content-type": "application/json",
    });
    console.log(response);
    res.send(response);
    token = response;
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
/*
  ccrCodProvincia This method returns the class ccrRespuestaProvincia. This transaction generates the list of provinces returning the province code and province name.
*/
deliveryRoutes.get("/provinces", async function (req, res) {
  try {
    const provincesResult = await doTransactionRequest(token, {}, "ccrCodProvincia");
    res.send(provincesResult.ccrCodProvinciaResult.Provincias.ccrItemGeografico);
    console.log(
      "provincesResult",
      provincesResult.ccrCodProvinciaResult.Provincias.ccrItemGeografico
    );
  } catch (err) {
    console.error(
      "error when comunicating with the transaction request method",
      err
    );
  }
});

/*
  ccrCodCanton This method receives the code of the province and returns the class ccrRespuestaCanton. This transaction generates the list of cantons by province, returning canton code and canton name
*/
deliveryRoutes.get("/cantons/:provinceCode", async function (req, res) {
  try {
    const cantonResult = await doTransactionRequest(
      token,
      { CodProvincia: req.params.provinceCode },
      "ccrCodCanton"
    );
    res.send(cantonResult.ccrCodCantonResult.Cantones.ccrItemGeografico);
    console.log("cantonResult", cantonResult.ccrCodCantonResult.Cantones.ccrItemGeografico);
  } catch (err) {
    console.error(
      "error when comunicating with the transaction request method",
      err
    );
  }
});

/*
  ccrCodDistrito This method returns the class ccrRespuestaDistrict. This transaction generates the district list based on the canton code and province code, returning the district code and district name
*/
deliveryRoutes.get(
  "/districts/:CodProvincia/:CodCanton",
  async function (req, res) {
    try {
      const districtResult = await doTransactionRequest(token, req.params, "ccrCodDistrito");
      res.send(districtResult.ccrCodDistritoResult.Distritos.ccrItemGeografico)
      console.log(
        "districtResult",
        districtResult.ccrCodDistritoResult.Distritos.ccrItemGeografico
      );
    } catch (err) {
      console.error(
        "error when comunicating with the transaction request method",
        err
      );
    }
  }
);

/*
  ccrCodBarrio This method receives the province code, canton code, district code, and returns the ccrResponseBarrios class. This transaction generates the list of neighborhoods according to province, canton and district
*/
deliveryRoutes.get(
  "/neighbors/:CodProvincia/:CodCanton/:CodDistrito",
  async function (req, res) {
    try {
      const neighborResult = await doTransactionRequest(token, req.params, "ccrCodBarrio");
      res.send(neighborResult.ccrCodBarrioResult.Barrios.ccrBarrio)
      console.log("neighborResult", neighborResult.ccrCodBarrioResult.Barrios);
    } catch (err) {
      console.error(
        "error when comunicating with the transaction request method",
        err
      );
    }
  }
);

/*
  ccrCodPostal This method receives the province, canton and district code, returns the class ccrResponseCodePostal. This transaction generates zip code.
*/
deliveryRoutes.get(
  "/zipcodes/:CodProvincia/:CodCanton/:CodDistrito",
  async function (req, res) {
    try {
      const zipcodeResult = await doTransactionRequest(token, req.params, "ccrCodPostal");
      res.send([zipcodeResult.ccrCodPostalResult.CodPostal])
      console.log("zipcodeResult", zipcodeResult.ccrCodPostalResult.CodPostal);
    } catch (err) {
      console.error(
        "error when comunicating with the transaction request method",
        err
      );
    }
  }
);

/* 
  This method receives the class ccrReqTarifa, and returns the class ccrRespuestaTarifa. This transaction consult the rate information for sending a package according to the origin and destination of the shipment.
*/
deliveryRoutes.get(
  "/bill/:ProvinciaDestino/:CantonDestino",
  async function (req, res) {
    try {
      let billParams = { 
        ProvinciaOrigen: '1', 
        CantonOrigen: '02', 
        ProvinciaDestino: req.params.ProvinciaDestino, 
        CantonDestino: req.params.CantonDestino, 
        Servicio: process.env.DELIVERY_SERVICE_SERVICE_ID, 
        Peso: 2.2 
      }
      const bill = await doTransactionRequest(token, billParams, "ccrTarifa");
      res.send(bill.ccrTarifaResult);
      console.log("bill", bill);
    } catch (err) {
      console.error(
        "error when comunicating with the transaction request method",
        err
      );
    }
  }
);

deliveryRoutes.get("/generateGuide", 
  async function(req, res){
    try{
      const generateGuide = await doTransactionRequest(token, {}, "ccrGenerarGuia");
      res.send([generateGuide.ccrGenerarGuiaResult.NumeroEnvio]);
      console.log("generateGuide", generateGuide);
    }catch(err){
      console.error(err)
    }
  }
);

deliveryRoutes.get('deliveryRegister/:generatedGuide', async function(req, res){
  try{
    const deliveryRegister = await doTransactionRequest(token, req.params.generatedGuide, "ccrRegistroEnvio");
    res.send(deliveryRegister);
    console.log("deliveryRegister", deliveryRegister);
  }catch(err){
    console.error(err);
  }
});

deliveryRoutes.get('mobileTracking/:generatedGuide', async function(req, res){
  try{
    const mobileTracking = await doTransactionRequest(token, req.params.generatedGuide, "ccrRegistroEnvio");
    res.send(mobileTracking);
    console.log("mobileTracking", mobileTracking);
  }catch(err){
    console.error(err);
  }
});
export default deliveryRoutes;
