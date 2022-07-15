import Component from '../../../core/Component';
import TodoColumnHeader from './TodoColumnHeader';
import TodoList from './TodoList';
import { mouseUp, onMouseMove } from '../../../events/todoDragEvent';
import {
	calcPositionDiff,
	pullUpBelowCards,
	restoreBelowCards,
} from '../../../events/temp';

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
			todos: todos.sort((a, b) => a.index - b.index),
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
						const prevColumnId = todoCard.closest('.column').dataset.columnId;
						const currentTodoId = todoCard.dataset.todoId;

						const [DIV, UL] = pullUpBelowCards(todoCard);

						document.body.style.pointerEvents = 'none';

						const [xDiff, yDiff] = calcPositionDiff(ghost, subTarget);

						ghost.style.transform = `translate(${xDiff * -1}px, ${
							yDiff * -1
						}px)`;

						setTimeout(() => {
							let index;
							let nextTodoList;
							restoreBelowCards(DIV, UL);

							document.body.removeAttribute('style');

							[index, nextTodoList] = mouseUp(e, prevColumnId);

							nextTodoList.childNodes.forEach((node) => {
								if (index < node.dataset.index) {
									node.dataset.index = Number(node.dataset.index) + 1;
								}

								if (node.dataset.index === index) {
									index -= 1;

									return;
								}

								if (index < node.dataset.index) {
									node.dataset.index = String(Number(node.dataset.index) + 1);
								}
							});

							this.props.onDragEnd(
								todoCard.dataset.todoId,
								prevColumnId,
								nextTodoList.closest('.column').dataset.columnId
							);

							todoCard.parentNode.removeChild(todoCard);
						}, 500);

						return;
					}

					if (!mouseUp(e)[0]) {
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
