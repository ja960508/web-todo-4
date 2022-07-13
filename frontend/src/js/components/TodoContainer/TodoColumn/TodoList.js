import Component from '../../../core/component';
import TodoCard from './TodoCard';

class TodoList extends Component {
	constructor(...data) {
		super(...data);
	}

	setChildren() {
		const { todos } = this.props;

		todos.forEach((todo) => new TodoCard('li', this.$target, { todo }));
	}
}

export default TodoList;
