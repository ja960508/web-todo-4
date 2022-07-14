import Component from '../../core/Component';
class TodoAddForm extends Component {
	constructor(...data) {
		super(...data);
		this.$title = this.$target.querySelector('.add-form-title');
		this.$content = this.$target.querySelector('.add-form-content');
		this.$submitBtn = this.$target.querySelector('.add-form-submit');
	}

	template() {
		const { type, title: originTitle, content: originContent } = this.props;
		const title = originTitle ?? '';
		const content = originContent ?? '';
		const btnName = type === 'edit' ? '수정' : '등록';
		return `
				<input class='add-form-title' type='text' placeholder='제목을 입력하세요' name="title" value="${title}" />
				<input class='add-form-content' type='text' placeholder='내용을 입력하세요' name="content" maxlength="500" value="${content}" />
				<div>
				<button class='add-form-cancel primary-btn--gray' type='button'>취소</button>
				<button class='add-form-submit primary-btn--blue' type='submit' disabled="true">${btnName}</button>
				 </div>
		`;
	}
	setEvent() {
		const isDisabled = ({ originTitle, originContent, title, content }) => {
			if (!title || !content) return true;
			else if (originTitle === title && originContent === content) return true;
			return false;
		};

		this.addEvent('input', 'input', () => {
			const { title: originTitle, content: originContent } = this.props;
			const [title, content] = [
				this.$title.value.trim(),
				this.$content.value.trim(),
			];
			this.$submitBtn.disabled = isDisabled({
				originTitle,
				originContent,
				title,
				content,
			});
		});
	}
}
export default TodoAddForm;
