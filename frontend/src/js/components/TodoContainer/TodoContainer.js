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

	confirmAddTodo($addFormSubmitBtn) {
		const $todoAddForm = $addFormSubmitBtn.closest('.todo-add-form');
		const todo = {
			title: $todoAddForm.querySelector('.add-form-title').value,
			content: $todoAddForm.querySelector('.add-form-content').value,
		};
		const $parent = $todoAddForm.parentNode;

		this.handleTodoCard['confirmAddTodo']({
			$parent,
			$beforeElement: $todoAddForm,
			props: { todo },
		});
		this.removePrevCard();
		this.removeAddForm();
	}

	editStart($beforeElement) {
		const props = {
			type: 'edit',
			title: $beforeElement.querySelector('h4').innerText,
			content: $beforeElement.querySelector('.card-content').innerText,
			dataset: {
				type: 'edit',
			},
		};
		const $parent = $beforeElement.parentNode;
		const $newAddForm = this.handleTodoCard['editStart']({
			$parent,
			$beforeElement,
			props,
		});
		this.removeAddForm($newAddForm);
		this.handlePrevCard($beforeElement);
	}

	removeAddForm($newAddForm) {
		this.addForm?.$target.parentNode.removeChild(this.addForm?.$target);
		this.addForm = $newAddForm;
	}

	handlePrevCard($newPrevCard) {
		if (this.prevCard) {
			this.prevCard.style.display = 'list-item';
		}
		this.prevCard = $newPrevCard;
		this.prevCard && (this.prevCard.style.display = 'none');
	}

	removePrevCard() {
		this.prevCard && this.prevCard.parentNode.removeChild(this.prevCard);
		this.prevCard = null;
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
