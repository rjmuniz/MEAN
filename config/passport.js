var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID: '7a21439d64d3e11ea8cf',
		clientSecret: '6090151342870f315739665e76919ba581f69ce0',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done) {
		Usuario.findOrCreate(
			{ "login": profile.username },
			{ "nome": profile.username, "displayName": profile.displayName },
			function(erro, usuario) {
				if (erro) {
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			}
		);
	}));

	/*
	Chamado apenas UMA vez e recebe o usuário do nosso banco disponibilizado pelo calnack da estratégia de autenticacao.
	Realizará a serialização apenas do ObjectId do usuário da Sesssão
	*/
	passport.serializeUser(function(usuario, done) {
		done(null, usuario.id);
	});
	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
			.then(function(usuario) {
				done(null, usuario);
			});
	});
};