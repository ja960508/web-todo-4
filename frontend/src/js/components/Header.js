import Component from '../core/Component';

class Header extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		return `<h1>TO-DO LIST</h1>
    <button class="menu">메뉴</button>`;
	}

	setEvent() {
		this.addEvent('click', '.menu', this.props.onClick);
	}
}

export default Header;
