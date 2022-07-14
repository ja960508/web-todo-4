import Component from '../../core/Component';
import TodoLog from './TodoLog';
import { logData } from '../../../../mock/mock';

class TodoLogContainer extends Component {
	constructor(...data) {
		super(...data);
	}

	setup() {
		new Promise((resolve) => resolve(logData)).then((res) => {
			this.setState({ logData: res });
		});
	}

	template() {
		return `<header>
      <button class="log-close-btn"></button>
			</header>
			<ul class="log-list"></ul>
			`;
	}

	setChildren() {
		this.clearChildren();

		console.log(this.state.logData);

		this.state.logData &&
			this.state.logData.forEach(
				(item) =>
					new TodoLog('li', this.$target.querySelector('.log-list'), {
						logData: item,
					})
			);
	}

	setEvent() {
		this.addEvent('click', '.log-close-btn', () =>
			this.$target.classList.remove('visible')
		);
	}
}

export default TodoLogContainer;
