angular.module('contatooh').controller('ContatosController',
	function($scope, $resource) {
		$scope.contatos = [];

		$scope.mensagem = { texto: '' };
		$scope.filtro = '';

		var Contato = $resource('/contatos/:id');

		function buscaContatos() {
			Contato.query(
				function(contatos) {
					$scope.contatos = contatos;
					$scope.mensagem = {};
				},
				function(erro) {
					$scope.mensagem = { texto: 'Não foi possível obter a lista de contatos' };
					console.log(erro);
				});
		}

		buscaContatos();

		$scope.remove = function(contato) {
			console.log(contato);
			Contato.delete({ id: contato._id },
				buscaContatos(),
				function(erro) {
					$scope.mensagem = { texto: 'Não foi possível remover o contato' };
					console.log(erro);
				});
		};

	});
