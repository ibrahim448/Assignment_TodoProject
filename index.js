const app = require("./app");
require("dotenv").config();
const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`app is run http://localhost:${PORT}`)
});