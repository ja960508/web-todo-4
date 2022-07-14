import Component from '../../../core/Component';
import TodoColumnHeader from './TodoColumnHeader';
import TodoList from './TodoList';

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
}

export default TodoColumn;
