import Component from '../core/components';

export default class Items extends Component {
	setup() {
		/* 생략 */
	}
	template() {
		/* 생략 */
	}
	setEvent() {
		// target addBtn 클래스 click 이벤트 직접 등록
		this.addEvent('click', '.addBtn', ({ target }) => {
			const { items } = this.$state;
			this.setState({ items: [...items, `item${items.length + 1}`] });
		});

		// target delete 클래스에 click 이벤트 직접 등록
		this.addEvent('click', '.deleteBtn', ({ target }) => {
			const items = [...this.$state.items];
			items.splice(target.dataset.index, 1);
			this.setState({ items });
		});
	}
}
