import Header from './components/Header';
import TodoContainer from './components/TodoContainer/TodoContainer';
import TodoLogContainer from './components/TodoLog/TodoLogContainer';

class App {
	constructor($target) {
		this.$target = $target;
		this.$todoLogContainer = null;

		this.setup();
	}

	setup() {
		new Header('header', this.$target, {
			class: ['header', 'hi'],
			onClick: () => {
				this.$todoLogContainer.$target.classList.add('visible');
			},
		});

		new TodoContainer('div', this.$target, {
			class: ['todo-container'],
		});

		this.$todoLogContainer = new TodoLogContainer('aside', this.$target, {
			class: ['todo-log-container'],
		});
	}
}
