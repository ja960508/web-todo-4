import Component from '../../../core/component';

class TodoColumnHeader extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		return `
		<h3>${this.props.title}</h3>
		<span class="count">${this.props.count}</span>
		<button>+</button>
		<button>X</button>
	`;
	}
}

export default TodoColumnHeader;
