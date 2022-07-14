import Component from '../../../core/Component';

class TodoColumnHeader extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		return `
		<div>
			<h3>${this.props.title}</h3>
			<span class="count">${this.props.count}</span>
		</div>
		<div>
			<button class='todo-add-btn'></button>
			<button class='column-remove-btn'</button>
		</div>
	`;
	}
}

export default TodoColumnHeader;
