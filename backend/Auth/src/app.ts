import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

import { Application } from 'express';
import { requestLoggerMiddleware } from './middleware/request.logger.middleware';

import IndexRoutes from './routes/index.route';
import AuthRoutes from './routes/auth.route';

export class App {
    private app: Application;

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middleware();
        this.routes();
    }

    public async listen() {
        await this.app.listen(this.app.get('port'));
        console.info(`Server on port ${this.app.get(`port`)}`);
    }

    private settings() {
        this.app.set('port', process.env.PORT || this.port || 3000);
    }

    private middleware() {
        this.app.use(cors({ origin: 'http://127.0.0.1:3030' }));
        this.app.use(helmet());
        this.app.use(bodyparser.json());
        this.app.use(requestLoggerMiddleware);
    }

    private routes() {
        this.app.use(IndexRoutes);
        this.app.use('/auth', AuthRoutes);
    }
}
