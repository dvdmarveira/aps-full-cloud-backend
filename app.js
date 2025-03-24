const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Importa o middleware cors
const complaintsRoute = require("./routes/complaints");

dotenv.config();

const app = express();

app.use(cors()); // Ativa o CORS para todas as rotas

// Caso fosse limitar o acesso do CORS
// const corsOptions = {
//     origin: 'http://127.0.0.1:5500',
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

app.use(express.json());

// Verifica se está em produção ou desenvolvimento
const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI // Produção (MongoDB Atlas)
    : "mongodb://localhost:27017/app_demo"; // Desenvolvimento (MongoDB local)

// Conectar ao MongoDB com a URI correspondente
mongoose
  .connect(dbURI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use("/api/complaints", complaintsRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
