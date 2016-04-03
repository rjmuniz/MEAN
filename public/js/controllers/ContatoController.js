angular.module('contatooh').controller('ContatoController',
	function ControllerController($scope, $routeParams, $resource) {
		var Contato = $resource('/contatos/:id');
		var contatoId = $routeParams.contatoId;
		if (contatoId) {
			Contato.get({ id: contatoId },
				function(contato) {
					$scope.contato = contato;
				}, function(erro) {
					$scope.mensagem = {
						texto: 'o contato não existe. Novo Contato.'
					};
					console.log(erro);
				});
		} else {
			$scope.contato = new Contato();
		}

		$scope.salva = function() {
			$scope.contato.$save()
				.then(function() {
					$scope.mensagem = { texto: 'Salvo com sucesso' };
					$scope.contato = new Contato();
				})
				.catch(function(erro) {
					$scope.mensagem = { texto: 'Não foi possivel salvar' };
				});
		};
	});