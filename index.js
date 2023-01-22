// Variables
const xmljs = require("xml-js");
const parseString = require("xml2js").parseString;
const axios = require("axios");
const fs = require("fs");

// XML
const data =
  '<?xml version="1.0" encoding="utf-8"?>' +
  '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
  "<soap:Header>" +
  '<Credencial xmlns="http://coopanestgo.com.br/services/">' +
  "<tipoCooperado>2</tipoCooperado>" +
  "<login></login>" +
  "<senha></senha>" +
  "</Credencial>" +
  "</soap:Header>" +
  "<soap:Body>" +
  '<ConsultaRetornoGeral xmlns="http://coopanestgo.com.br/services/">' +
  "<dataHoraConsulta>2023-01-17</dataHoraConsulta>" +
  "</ConsultaRetornoGeral>" +
  "</soap:Body>" +
  "</soap:Envelope>";

// HEADER
const config = {
  headers: {
    "Content-Type": "text/xml; charset=utf-8",
    Accept: "application/xml",
    SOAPAction: "",
  },
};

// GET;
axios
  .post("", data, config)
  .then((response) => {
    parseString(data, (err, result) => {
      fs.writeFileSync(
        "output.xml",
        response.data.replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
        {
          compact: true,
          spaces: 4,
        }
      );
    });
    console.log("Gerado arquivo! output.xml");
  })
  .catch((err) => {
    console.log(err);
  });
