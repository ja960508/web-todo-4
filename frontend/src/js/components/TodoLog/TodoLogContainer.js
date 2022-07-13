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
				(key) =>
					new TodoLog('li', this.$target, {
						logData: this.state.logData[key],
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
