import express from 'express';
import { Request, Response } from 'express';
import { load } from 'ts-dotenv';
import { MdConverter } from './converter';
import { envSchema } from './models';
import { startFileWatcher } from './services/observer';
import { WS } from './services/websocket';
import { createCustomTemplate } from './templating';

let path = require('path');

export const root = __dirname;


const env = load(envSchema, path.join(__dirname, "..", "sample.env"))

const app = express();
const server = require('http').createServer(app);
const port = env.PORT;

const sourcePath = env.DATA_PATH;
const renderedPath = env.RENDER_PATH;

const ws = new WS(server);

const converter = new MdConverter(sourcePath, renderedPath, ws, env.TITLE, env.LOGO, env.SERVER_IP);
createCustomTemplate(env);

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