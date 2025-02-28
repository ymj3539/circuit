import express from 'express';
import createError from 'http-errors';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

const pathDirname = dirname(fileURLToPath(import.meta.url));

// view engine setup
app.set('views', path.join(pathDirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(pathDirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;
