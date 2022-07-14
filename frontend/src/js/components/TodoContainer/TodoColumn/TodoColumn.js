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
