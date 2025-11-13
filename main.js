import { HOST } from './src/settings/config.js'
import { app } from './src/app.js';

const main = () => {
    try {
        app.listen(app.get('port'), () => {
            console.log(`🚀 Servidor corriendo en http://${HOST}:${app.get('port')}`);
            console.log(`http://${HOST}:${app.get('port')}/home`);
        });        
    } catch (error) {
        console.log(`Error en ejecutar el servidor: ${error}`)
    }
};

main();