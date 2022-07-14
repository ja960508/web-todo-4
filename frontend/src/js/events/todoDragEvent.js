export function moveAt(target, pageX, pageY) {
	target.style.left = pageX - target.offsetWidth / 2 + 'px';
	target.style.top = pageY - target.offsetHeight / 2 + 'px';
}

export function onMouseMove(target) {
	return (event) => {
		moveAt(target, event.pageX, event.pageY);
	};
}

function getTodoList(elemBelow) {
	if (elemBelow.closest('.column ul')) {
		return elemBelow.closest('.column ul');
	}

	if (elemBelow.classList.contains('column')) {
		return elemBelow.querySelector('ul');
	}

	return null;
}

function getClosestCardElement(todoList, dropYPoint) {
	const closestCard = { offset: Number.POSITIVE_INFINITY, element: null };

	todoList.forEach((card) => {
		const box = card.getBoundingClientRect();
		const boxMidYPoint = box.top + box.height / 2;
		const offset = Math.abs(dropYPoint - boxMidYPoint);

		if (offset < closestCard.offset) {
			closestCard.offset = offset;
			closestCard.element = card;
		}
	});

	return closestCard.element;
}
