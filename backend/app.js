const axios = require("axios");
const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
const port = 4000;
app.use(cors(corsOptions));
app.get("/antelopes", async (req, res) => {
  const response = await fetchData();
  res.json(response);
});

async function fetchData() {
  try {
    const response = await axios.get(
      "https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json"
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
