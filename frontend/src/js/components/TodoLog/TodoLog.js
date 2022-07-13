import Component from '../../core/component';

class TodoLog extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		return `<div>Avatar</div>
    <div class="log__content">
      <div>@sam</div>
      <div>
        HTML/CSS공부하기를 해야할 일에서 하고 있는 일로 이동하였습니다.
      </div>
      <div>1분 전</div>
    </div>`;
	}
}

export default TodoLog;
