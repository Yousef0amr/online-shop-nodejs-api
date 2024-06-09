

import sequelize from './config/database_config.js'
import { configDotenv } from 'dotenv';
import express from 'express'
import mainRouter from './routes/index.js';
import morgan from 'morgan';
import authJwt from './middlewares/authJwt.js';
import globelError from './middlewares/errorMiddleware.js';
import ApiError from './utils/apiResponse.js';
import errorMessages from './utils/errorMessages.js';
import endpoints from './utils/endoints.js';







const init = async () => {
    configDotenv()

    const app = express()

    app.use((req, res, next) => {
        if (req.path === `${endpoints.PAYMENT}/webhook-checkout`) {
            express.json({
                verify: (req, res, buf) => {
                    req.rawBody = buf
                }
            })(req, res, next)
        } else {
            express.json()(req, res, next);
        }
    });

    if (process.env.NODE_ENV === 'dev') {
        app.use(morgan('dev'))
    }

    app.use(authJwt())

    app.use('/', mainRouter)

    app.all('*', (req, res, next) => {
        return next(new ApiError(errorMessages.notFound, 404))
    })

    app.use(globelError)

    await sequelize.authenticate();

    app.listen(process.env.PORT, () => {
        console.log('connecting to port => ' + process.env.PORT)
    })
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});



init();