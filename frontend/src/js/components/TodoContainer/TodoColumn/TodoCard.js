import Component from '../../../core/component';

class TodoCard extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		const { title, content } = this.props.todo;
		return `
    <header>
      <h4>${title}</h4>
      <button class="card-close-btn">X</button>
    </header>
    <p class="card-content">${content}</p>
    <p class="card-author">author by web</p>
	`;
	}
}

export default TodoCard;
