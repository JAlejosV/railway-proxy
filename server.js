const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const API_BASE = "http://161.132.37.13:8901";

app.all("*", async (req, res) => {
  try {
    const targetUrl =
      API_BASE +
      req.originalUrl;

    const response = await axios({
      method: req.method,
      url: targetUrl,
      data: req.body,
      headers: {
        "Content-Type": "application/json"
      }
    });

    res.status(response.status)
       .json(response.data);

  } catch (error) {

    if (error.response) {
      return res
        .status(error.response.status)
        .json(error.response.data);
    }

    res.status(500).json({
      message: error.message
    });
  }
});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Proxy iniciado en puerto ${PORT}`
  );
});