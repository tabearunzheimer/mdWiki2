import express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { MdConverter } from './converter';
import { startFileWatcher } from './services/observer';
import { WS } from './services/websocket';
import { createCustomTemplate } from './templating';

let path = require('path');

export const root = __dirname;

dotenv.config({path: path.join(__dirname, "..", "sample.env")});

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT;

const sourcePath = path.join(process.env.DATA_PATH);
const renderedPath = process.env.RENDER_PATH;

const ws = new WS(server);

const converter = new MdConverter(sourcePath, renderedPath, ws,  process.env.TITLE, process.env.LOGO, process.env.SERVER_IP);
createCustomTemplate(process.env);

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get("/:dok", async (req: Request, res: Response) => {
  const dok = req.params.dok;
  if (!converter.index[dok]) res.status(500).json("Couldn't find file")
  else {
    const file = converter.index[dok];
    console.info(`Loading file ${file}`);
    res.setHeader("page-value", dok);
    res.sendFile(file);
  }
})

server.listen(port, function () {
  console.log(`Server is listening on port ${port}`)
});


startFileWatcher(sourcePath, converter);