import Component from '../../core/Component';
import processedData from '../../../../mock/mock';
import TodoColumn from './TodoColumn/TodoColumn';
import TodoAddForm from './TodoAddForm';
import TodoCard from './TodoColumn/TodoCard';
import Modal from './modal';
import { addTodo, editTodo, removeTodo } from '../../api/todos';

class TodoContainer extends Component {
	constructor(...data) {
		super(...data);
		this.columns = {};
		this.addForm = null;
		this.prevCard = null;
	}

	setup() {
		new Promise((resolve) => resolve(processedData)).then((res) => {
			const columnData = {};
			Object.keys(res).forEach((key) => (columnData[key] = { ...res[key] }));
			this.setState({ columnData });
		});
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
					columnId: key,
				},
				columnData: this.state.columnData[key],
			});
		}
	}

	setEvent() {
		this.addEvent('click', '.column', (e) => {
			e.preventDefault();
			const $column = e.target.closest('.column');
			const $clickedTarget = e.target;

			if ($clickedTarget.classList.contains('todo-add-btn')) {
				this.addStart($column);
			} else if ($clickedTarget.classList.contains('add-form-cancel')) {
				this.cancelAddTodo();
			} else if ($clickedTarget.classList.contains('add-form-submit')) {
				this.confirmAddTodo($clickedTarget);
			} else if ($clickedTarget.classList.contains('card-close-btn')) {
				const $todoCard = $clickedTarget.closest('.todo-card');
				this.modal ? this.closeModal() : this.openModal($todoCard);
			}
		});

		this.addEvent('dblclick', '.todo-card', (e) => {
			const $todoCard = e.target.closest('.todo-card');
			this.editStart($todoCard);
		});
	}

	addStart($column) {
		const $parent = $column.querySelector('.todo-list');
		const $beforeElement = $parent.querySelector('ul > li:first-child');
		let $newAddForm = null;

		// 해당 컬럼이 add-form 이 아닌 경우 해당 컬럼에 add-form 생성
		if ($beforeElement?.dataset.type !== 'add') {
			$newAddForm = this.handleTodoCard['addStart']({
				$parent,
				$beforeElement,
				props: {
					dataset: {
						type: 'add',
					},
				},
			});
			// 기존에 열려있던 addForm 닫기
			this.removeAddForm($newAddForm);
			this.prevCard && this.handlePrevCard();
		}
		// 해당 컬럼이 add-form 이었던 경우
		else {
			this.removeAddForm();
		}
	}

	cancelAddTodo() {
		this.removeAddForm();
		this.handlePrevCard();
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
			props: { todo, todoId: $todoAddForm.dataset.todoId },
		});
	}

	editStart($beforeElement) {
		const props = {
			type: 'edit',
			title: $beforeElement.querySelector('h4').innerText,
			content: $beforeElement.querySelector('.card-content').innerText,
			dataset: {
				todoId: $beforeElement.dataset.todoId,
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
			{ ...props, class: [...classList, 'blocked'] },
			$beforeElement
		);
	}

	createTodoCard = ({ $parent, props = {}, $beforeElement }) => {
		const classList = [...(props.class || []), 'todo-card'];
		const todoId = props.todoId;

		if (todoId) {
			// todoId가 있을 때
			// edit
			editTodo().then(() => {
				const elem = new TodoCard(
					'li',
					$parent,
					{ ...props, class: classList, dataset: { todoId } },
					$beforeElement
				);

				const columnId = document
					.querySelector(`[data-todo-id='${todoId}']`)
					.closest('.column').dataset.columnId;

				const todo = {
					id: todoId,
					title: props.todo.title,
					content: props.todo.content,
					columnId,
				};

				let target = this.state.columnData[columnId].todos.findIndex(
					(item) => item.id == todoId
				);

				this.state.columnData[columnId].todos[target] = { ...todo };
				this.setState({ ...this.state });

				this.removePrevCard();
				this.removeAddForm();
			});
		} else {
			// todoId가 없을 때
			// add
			addTodo().then((id) => {
				new TodoCard(
					'li',
					$parent,
					{ ...props, class: classList, dataset: { todoId: id } },
					$beforeElement
				);

				const columnId = document
					.querySelector(`[data-todo-id='${id}']`)
					.closest('.column').dataset.columnId;

				const todo = {
					id: todoId,
					title: props.todo.title,
					content: props.todo.content,
					columnId,
				};

				this.state.columnData[columnId].todos.push(todo);
				this.setState({ ...this.state });

				this.removePrevCard();
				this.removeAddForm();
			});
		}
	};

	handleTodoCard = {
		editStart: this.createAddForm,
		addStart: this.createAddForm,
		confirmEditTodo: this.createTodoCard,
		confirmAddTodo: this.createTodoCard,
	};

	openModal($todoCard) {
		const removeCard = () => {
			const columnId = $todoCard.closest('.column').dataset.columnId;
			const todoId = $todoCard.dataset.todoId;

			removeTodo(todoId).then(() => {
				this.state.columnData[columnId].todos = this.state.columnData[
					columnId
				].todos.filter((todo) => {
					return todo.id !== todoId;
				});

				this.setState({ ...this.state });
			});

			this.closeModal();
		};

		this.modal = new Modal('div', document.querySelector('body'), {
			class: ['modal-container'],
			removeCard,
			closeModal: this.closeModal.bind(this),
		});
	}

	closeModal() {
		const $modal = this.modal.$target;
		$modal.parentNode.removeChild($modal);
		this.modal = null;
	}
}

export default TodoContainer;
