require('dotenv').config();
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { dbConnect } = require('./utils/db.utils');
const { errorHandler, asyncRouteHandler } = require('./utils/route.utils');

// include routes here
const authRoutes = require('./routes/auth.route');
const itemRoutes = require('./routes/item.route');
const adminRoutes = require('./routes/admin.route');
const userRoutes = require('./routes/user.route');

const app = express();

app.use(cors({ maxAge: 3600 }));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
	})
);

//Routes
app.use('/auth', authRoutes);
app.use('/browse-items', itemRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

dbConnect()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log('http://localhost:7000/');
		});
	})
	.catch((err) => {
		console.log(err);
		console.log('DB ERROR');
	});
