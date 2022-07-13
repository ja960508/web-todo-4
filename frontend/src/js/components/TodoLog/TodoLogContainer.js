import Component from '../../core/component';
import TodoLog from './TodoLog';
import { logData } from '../../../../mock/mock';

class TodoLogContainer extends Component {
	constructor(...data) {
		super(...data);
	}

	setup() {
		const data = new Promise((resolve) => resolve(logData)).then((res) => {
			this.setState({ logData: res });
		});
	}

	template() {
		return `<header>
      <button>X</button>
    </header>`;
	}

	setChildren() {
		this.clearChildren();

		console.log(this.state.logData);

		this.state.logData &&
			this.state.logData.forEach(
				(item) =>
					new TodoLog('li', this.$target, {
						logData: item,
					})
			);
	}

	setEvent() {
		this.addEvent('click', 'header button', () =>
			this.$target.classList.remove('visible')
		);
	}
}

export default TodoLogContainer;
