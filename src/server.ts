import app from "./app";
import * as https from 'https';
import * as fs from 'fs';
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/../.env.server' });
const PORT = process.env.PORT;


// const httpsOptions = {
//     key: fs.readFileSync('./config/key.pem'),
//     cert: fs.readFileSync('./config/cert.pem')
// }

// https.createServer(httpsOptions, app).listen(PORT, () => {
//     console.log('Express server listening on port ' + PORT);
// })

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});