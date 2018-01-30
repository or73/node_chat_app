const path      = require('path');
const express   = require('express');

const publicPath    = path.join(__dirname, '../public');
const app       = express();
const LOCAL_PORT     = 3000;
const __PORT    = process.env.PORT || LOCAL_PORT;


console.log(`publicPath: ${ publicPath }`);

app.use(express.static(publicPath));

app.listen(__PORT,
			() => {
				console.log(`Server is UP and RUNNING on PORT: ${ __PORT }`)
			});

