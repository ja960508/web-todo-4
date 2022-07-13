import Component from '../../../core/component';

class TodoColumnHeader extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		return `
		<h3>${this.props.title}</h3>
		<span class="count">${this.props.count}</span>
		<button class='todo-add-btn'>+</button>
		<button class='column-remove-btn'>X</button>
	`;
	}

	setEvent() {
		this.addEvent('click', '.todo-add-btn', () =>
			this.props.showTodoAddForm(this.props.title)
		);
	}
}

export default TodoColumnHeader;
