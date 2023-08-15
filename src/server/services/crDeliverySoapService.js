import soap from "soap";

const url = "http://amistad.correos.go.cr:84/wsAppCorreos.wsAppCorreos.svc?singleWsdl";

//here we create the soap client per request
const createSoapClient = (token, method, args) => {
  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) {
        console.error("Error while creating a SOAP client", err);
        reject(err);
        return;
      }
      
      client.setSecurity(new soap.BearerSecurity(token));

      client[method](args, (err, result) => {
        if (err) {
          console.error("Error calling SOAP method:", err);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  });
};

const doTransactionRequest = async (token, args, crDeliverySoapMethod) => {
  try {
    const result = await createSoapClient(token, crDeliverySoapMethod, args);
    return result;
  } catch (err) {
    console.error("Error in getCanton:", err);
    throw err;
  }
}
export default doTransactionRequest;
