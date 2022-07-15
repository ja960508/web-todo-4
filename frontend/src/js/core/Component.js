class Component {
	constructor(tag, $parent, props = {}, beforeElem = '') {
		this.$target = document.createElement(tag);

		if (props.class) {
			this.$target.classList.add(...props.class);
		}

		if (props.dataset) {
			for (const [key, value] of Object.entries(props.dataset)) {
				this.$target.dataset[key] = value;
			}
		}

		this.props = props;
		this.state = {};
		this.setup();
		this.setEvent(); // constructor 에서 딱 한번만 실행.
		this.render();

		if (!beforeElem) {
			$parent.appendChild(this.$target);
		} else if (typeof beforeElem === 'string') {
			$parent.insertBefore(this.$target, $parent.querySelector(beforeElem));
		} else {
			$parent.insertBefore(this.$target, beforeElem);
		}
	}

	clearChildren() {
		this.$target.innerHTML = this.template();
	}

	setChildren() {}

	setup() {} // 컴포넌트 생성 시 딱 한번만 실행

	mounted() {} // render 후에 실행되는 부분

	template() {
		return '';
	} // 컴포넌트 템플릿

	render() {
		// 렌더링
		this.$target.innerHTML = this.template();
		this.setChildren();
		this.mounted(); // render 후에 mounted 가 실행된다.
	}

	setEvent() {}

	setState(newState) {
		// 상태변경되면 리렌더링
		this.state = { ...this.state, ...newState };
		this.render();
	}

	addEvent(eventType, selector, callback) {
		const children = [...this.$target.querySelectorAll(selector)];
		// selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
		// closest를 이용하여 처리한다.
		const isTarget = (target) =>
			children.includes(target) || target.closest(selector);
		this.$target.addEventListener(eventType, (event) => {
			if (!isTarget(event.target)) return false;
			callback(event);
		});
	}
}

export default Component;
