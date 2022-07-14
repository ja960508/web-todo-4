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
		let handleMouseMove = null;
		let todoCard = null;

		this.addEvent('mousedown', '.column', (e) => {
			if (e.detail !== 1) return;

			todoCard = e.target.closest('.todo-card');

			if (!todoCard || e.target.tagName === 'BUTTON') {
				return;
			}

			handleMouseMove = onMouseMove(todoCard);

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
