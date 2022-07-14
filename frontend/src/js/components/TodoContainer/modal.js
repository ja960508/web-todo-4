import Component from '../../core/Component';
class Modal extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		return `
            <div class="modal">
                <p>선택한 카드를 삭제할까요?</p>
                <div>
                    <button class="modal-cancel-btn primary-btn--gray">취소</button> 
                    <button class="modal-remove-btn primary-btn--blue">삭제</button> 
                </div>
            </div>
        `;
	}

	setEvent() {
		this.addEvent('click', '.modal-cancel-btn', this.props.closeModal);
		this.addEvent('click', '.modal-remove-btn', this.props.removeCard);
		this.addEvent('click', '.modal-container', (e) => {
			if (e.target.classList.contains('modal-container'))
				this.props.closeModal();
		});
	}
}
export default Modal;
