import { HOST, PORT } from './src/settings/config.js'
import { app } from './src/app.js';

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
});