import 'dotenv/config.js';

import { app } from './src/app.js';

const PORT = process.env.SERVER_PORT || 39103;

app.listen(PORT, () =>
    console.log(`******** Listening on port ${PORT}  ********`),
);
