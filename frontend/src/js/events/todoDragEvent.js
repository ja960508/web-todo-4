export function moveAt(target, pageX, pageY) {
	target.style.left = pageX - target.offsetWidth / 2 + 'px';
	target.style.top = pageY - target.offsetHeight / 2 + 'px';
}

export function onMouseMove(target) {
	return (event) => {
		moveAt(target, event.pageX, event.pageY);
	};
}
export function mouseUp(e) {
	const ghost = e.target.closest('li');

	let belowCard;

	ghost.hidden = true;
	let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
	ghost.hidden = false;

	let todoList = getTodoList(elemBelow);

	if (!todoList) {
		document.body.removeChild(ghost);

		return false;
	}

	if (elemBelow.classList.contains('column')) {
		belowCard = getClosestCardElement(todoList.childNodes, e.clientY);
	} else {
		belowCard = elemBelow.closest('.todo-card');
	}

	ghost.removeAttribute('style');

	if (!belowCard) {
		todoList.appendChild(ghost);

		return true;
	}

	if (dropPointIsUpper(belowCard, e.clientY)) {
		todoList.insertBefore(ghost, belowCard);
	} else {
		todoList.insertBefore(ghost, belowCard.nextElementSibling);
	}

	return true;
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

function dropPointIsUpper(belowCard, currentY) {
	const box = belowCard.getBoundingClientRect();
	const boxMidPoint = box.top + box.height / 2;

	const offset = currentY - boxMidPoint;

	return offset < 0;
}
