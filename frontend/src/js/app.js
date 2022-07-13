import Header from './components/Header';

class App {
	constructor($target) {
		this.$target = $target;

		this.setup();
	}

	setup() {
		new Header('header', this.$target, {
			class: ['header', 'hi'],
			onClick: () => {},
		});
	}
}
