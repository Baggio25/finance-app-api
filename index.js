import 'dotenv/config.js';

import { app } from './src/app.js';

app.listen(process.env.SERVER_PORT, () =>
    console.log(
        `******** Listening on port ${process.env.SERVER_PORT}  ********`,
    ),
);
