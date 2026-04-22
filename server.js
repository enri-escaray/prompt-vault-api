const express = require('express');
const app = express();
const promptRoutes = require("./routes/promptRoutes");
app.use(express.json()) // poder recibir informacion JSON
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/prompts", promptRoutes);

app.listen(port, () => {
  console.log(`Bóveda de Prompts Activa en el puerto ${port}`);
});