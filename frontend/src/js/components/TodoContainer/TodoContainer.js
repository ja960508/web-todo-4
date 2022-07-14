import Component from '../../core/component';
import processedData from '../../../../mock/mock';
import TodoColumn from './TodoColumn/TodoColumn';
import TodoAddForm from './TodoAddForm';
import TodoCard from './TodoColumn/TodoCard';

class TodoContainer extends Component {
	constructor(...data) {
		super(...data);
		this.columns = {};
		this.addForm = null;
		this.prevCard = null;
	}

	setup() {
		const data = new Promise((resolve) => resolve(processedData)).then(
			(res) => {
				const columnData = {};
				Object.keys(res).forEach((key) => (columnData[key] = { ...res[key] }));
				this.setState({ columnData });
			}
		);
	}

	setChildren() {
		this.clearChildren();
		this.columns = {};

		if (!this.state.columnData) {
			return;
		}

		for (const key in this.state.columnData) {
			this.columns[key] = new TodoColumn('div', this.$target, {
				class: ['column'],
				dataset: {
					columnKey: key,
				},
				columnData: this.state.columnData[key],
			});
		}
	}

	removeAddForm($newAddForm) {
		this.addForm?.$target.parentNode.removeChild(this.addForm?.$target);
		this.addForm = $newAddForm;
	}

	createAddForm({ $parent, props = {}, $beforeElement }) {
		const classList = [...(props.class || []), 'todo-add-form'];
		return new TodoAddForm(
			'li',
			$parent,
			{ ...props, class: classList },
			$beforeElement
		);
	}

	createTodoCard({ $parent, props = {}, $beforeElement }) {
		const classList = [...(props.class || []), 'todo-card'];
		return new TodoCard(
			'li',
			$parent,
			{ ...props, class: classList },
			$beforeElement
		);
	}

	handleTodoCard = {
		editStart: this.createAddForm,
		addStart: this.createAddForm,
		confirmEditTodo: this.createTodoCard,
		confirmAddTodo: this.createTodoCard,
	};
}

export default TodoContainer;
