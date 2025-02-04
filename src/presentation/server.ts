import express from 'express' ;  
import path from 'path';

export interface Options {
    port: number,
    publicPath: string
} 

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
 
    constructor(options: Options) {
        const { port, publicPath } = options;

        this.port = port;
        this.publicPath = publicPath;
    }

    async start() {
        // Public folder
        this.app.use(express.static( this.publicPath ));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `./../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })
        
        this.app.listen(this.port, () => {                                         
            console.log(`Server up in port ${this.port}`);
        })

    }
}