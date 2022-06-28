const { config } = require('dotenv');
const fs = require('fs/promises');

config();

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:2244';
const FILE_PATH = `${process.cwd()}/constants/backend-url.ts`;

async function prestart() {
  try {
    await fs.access(FILE_PATH);
    return process.exit(0);
  } catch (error) {
    if (error.code && error.code === 'ENOENT') {
      await fs.writeFile(
        FILE_PATH,
        `export default '${BACKEND_URL}';
`,
      );
      return process.exit(0);
    }
    throw new Error(error);
  }
}

prestart();
