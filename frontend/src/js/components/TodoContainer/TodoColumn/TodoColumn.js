import Component from '../../../core/Component';
import TodoColumnHeader from './TodoColumnHeader';
import TodoList from './TodoList';
import { mouseUp, onMouseMove } from '../../../events/todoDragEvent';

class TodoColumn extends Component {
	constructor(...data) {
		super(...data);
	}

	setChildren() {
		const { title, todos } = this.props.columnData;

		new TodoColumnHeader('header', this.$target, {
			title,
			count: todos.length,
			showTodoAddForm: this.props.showTodoAddForm,
		});
		new TodoList('ul', this.$target, {
			class: ['todo-list'],
			todos: todos,
		});
	}

	setEvent() {
		this.addEvent('mouseover', '.card-close-btn', (e) => {
			const targetCard = e.target.closest('.todo-card');

			targetCard.classList.add('warning');
		});

		this.addEvent('mouseout', '.card-close-btn', (e) => {
			const targetCard = e.target.closest('.todo-card');

			targetCard.classList.remove('warning');
		});

		this.addEvent('mousedown', '.column', (e) => {
			if (e.detail !== 1) return;

			const todoCard = e.target.closest('.todo-card');

			if (!todoCard || e.target.tagName === 'BUTTON') {
				return;
			}

			const handleMouseMove = onMouseMove(todoCard);

			document.addEventListener('mousemove', handleMouseMove);

			document.addEventListener(
				'mouseup',
				(e) => {
					todoCard.classList.remove('afterimage');
					document.removeEventListener('mousemove', handleMouseMove);

					const ghost = document.querySelector('.ghost');
					const subTarget = document.querySelector('.subTarget');

					if (ghost && subTarget) {
						todoCard.classList.add('fade');

						document.body.style.pointerEvents = 'none';
						const xDiff =
							ghost.getBoundingClientRect().x -
							subTarget.getBoundingClientRect().x;
						const yDiff =
							ghost.getBoundingClientRect().y -
							subTarget.getBoundingClientRect().y;

						ghost.style.transform = `translate(${xDiff * -1}px, ${
							yDiff * -1
						}px)`;

						setTimeout(() => {
							document.body.removeAttribute('style');

							if (!mouseUp(e)) {
								return;
							}

							todoCard.parentNode.removeChild(todoCard);
						}, 500);

						return;
					}

					if (!mouseUp(e)) {
						return;
					}

					todoCard.parentNode.removeChild(todoCard);
				},
				{ once: true }
			);
		});
	}
}

export default TodoColumn;
