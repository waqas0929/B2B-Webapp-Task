import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";
import "dotenv/config.js";
import { connectDB } from "./db/config.js";
import syncDb from "./db/init.js";
import allRoutes from "./routes/allRoutes.js";

const __dirname = path
  .dirname(new URL(import.meta.url).pathname)
  .replace(/^\/([A-Z]:\/)/, '$1');

const sslDirectory = path.join(__dirname, "ssl");

const keyPath = path.join(sslDirectory, "server.key");
const certPath = path.join(sslDirectory, "server.crt");

console.log('sslDirectory:', sslDirectory);
console.log('Key Path:', keyPath);
console.log('Cert Path:', certPath);

// Check if SSL files exist
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error("SSL key or certificate file not found.");
  process.exit(1);
}

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  crt: fs.readFileSync(certPath),
};

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(allRoutes);

connectDB();
syncDb();

const httpsServer = https.createServer(httpsOptions, app);
const httpsPort = 443;
httpsServer.listen(httpsPort, () => {
  console.log(`HTTPS Server running on https://localhost:${httpsPort}`);
});

const httpPost = 3001;
app.listen(httpPost, () => {
  console.log("Server started");
  console.log(`HTTPS Server running on https://localhost:${httpsPort}`);
});
