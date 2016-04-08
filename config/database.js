var mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.set('debug', true);
	
	mongoose.connect(uri, { server: { poolSize: 15 } });

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Conectado em ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Disconectado em ' + uri);
	});

	mongoose.connection.on('error', function(err) {
		console.log('Verifique se o servidor está ativo!!!\n>mongod');
		console.log('Mongoose! Erro na conexão: ' + err);
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose! Desconectado pelo término da aplicação');
			process.exit(0);
		});
	});
};