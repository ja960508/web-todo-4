import Component from '../../core/component';
import logData2Desc from '../../utils/logTypeMap';
import timeDiff from '../../utils/timeDiff';

class TodoLog extends Component {
	constructor(...data) {
		super(...data);
	}

	template() {
		const { type, date } = this.props.logData;
		return `<div>Avatar</div>
    <div class="log__content">
      <div>@sam</div>
      <div>
      	${logData2Desc[type](this.props.logData)}
      </div>
      <div>${timeDiff({ date })}</div>
    </div>`;
	}
}

export default TodoLog;
