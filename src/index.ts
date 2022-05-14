import express from 'express';
import { Request, Response } from 'express';
import { load } from 'ts-dotenv';
import { MdConverter } from './converter';
import { envSchema } from './models';
import { createCustomTemplate } from './templating';

let path = require('path');

export const root = __dirname;

const env = load(envSchema)


const app = express();
const port = env.PORT;

const sourcePath = env.DATA_PATH;
const renderedPath = env.RENDER_PATH;

const converter = new MdConverter(sourcePath, renderedPath);
createCustomTemplate(env);

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get("/:dok", async (req: Request, res: Response) => {
  const dok = req.params.dok;
  console.log("dok", dok);
  console.log(converter.index);
  const file = path.join(__dirname, "..", converter.index[dok]);
  console.info(`Loading file ${file}`);
  res.sendFile(file);
})

app.listen(port, function () {
  console.log(`Server is listening on port ${port}`)
});