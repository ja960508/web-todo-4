import Component from '../../core/Component';
import logData2Desc from '../../utils/logTypeMap';
import timeDiff from '../../utils/timeDiff';
import avatar from '../../../assets/user_avatar_img.svg';

class TodoLog extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		const { type, date } = this.props.logData;
		return `<img src="${avatar}" alt="Avatart" />
    <div class="log__content">
      <div class="user">@sam</div>
      <div class="log-content">
      	${logData2Desc[type](this.props.logData)}
      </div>
      <div class="time">${timeDiff({ date })}</div>
    </div>`;
	}
}

export default TodoLog;
