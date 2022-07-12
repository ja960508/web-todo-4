(function () {
	const $menu = document.querySelector('.header .menu');
	const $container = document.querySelector('.todo-container');
	const $log = document.querySelector('.todo-log');

	$menu.addEventListener('click', () => {
		$log.style.visibility = 'visible';
	});
})();
