import Component from '../../core/component';
import processedData from '../../../../mock/mock';
import TodoColumn from './TodoColumn/TodoColumn';

class TodoContainer extends Component {
	constructor(...data) {
		super(...data);
	}

	setup() {
		const data = new Promise((resolve) => resolve(processedData)).then(
			(res) => {
				this.setState({ columnsData: res });
			}
		);
	}

	setChildren() {
		this.clearChildren();

		this.state.columnsData &&
			Object.keys(this.state.columnsData).forEach(
				(key) =>
					new TodoColumn('div', this.$target, {
						class: ['column'],
						columnData: this.state.columnsData[key],
					})
			);
	}
}

export default TodoContainer;
