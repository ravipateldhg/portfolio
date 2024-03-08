const app = require('.');

app.listen(process.env.PORT | 8080, function () {
	console.info(`Listening on port ${process.env.PORT | 8080}!`);
});
