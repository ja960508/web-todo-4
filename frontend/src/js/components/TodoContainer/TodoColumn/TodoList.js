import Component from '../../../core/Component';
import TodoCard from './TodoCard';

class TodoList extends Component {
	constructor(...data) {
		super(...data);
	}

	setChildren() {
		const { todos } = this.props;

		todos.forEach(
			(todo) => new TodoCard('li', this.$target, { class: ['todo-card'], todo })
		);
	}
}

export default TodoList;
