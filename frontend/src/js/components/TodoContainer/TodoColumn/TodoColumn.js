import Component from '../../../core/Component';
import TodoColumnHeader from './TodoColumnHeader';
import TodoList from './TodoList';
import { mouseUp, moveAt, onMouseMove } from '../../../events/todoDragEvent';

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
		let handleMouseMove = null;
		let todoCard = null;

		this.addEvent('mousedown', '.column', (e) => {
			todoCard = e.target.closest('li');

			if (!todoCard) {
				return;
			}

			const ghost = todoCard.cloneNode(true);
			todoCard.classList.add('dragging');

			handleMouseMove = onMouseMove(ghost);

			ghost.style.position = 'absolute';
			ghost.style.zIndex = 1000;
			ghost.style.width = window.getComputedStyle(todoCard).width;
			ghost.style.zIndex = window.getComputedStyle(todoCard).height;

			document.body.appendChild(ghost);

			moveAt(ghost, e.pageX, e.pageY);

			document.addEventListener('mousemove', handleMouseMove);

			document.addEventListener(
				'mouseup',
				(e) => {
					todoCard.classList.remove('dragging');
					document.removeEventListener('mousemove', handleMouseMove);

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
