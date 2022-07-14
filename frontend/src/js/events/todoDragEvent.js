let ghost;

export function moveAt(target, pageX, pageY) {
	target.style.left = pageX - target.offsetWidth / 2 + 'px';
	target.style.top = pageY - target.offsetHeight / 2 + 'px';
}

export function onMouseMove(target) {
	ghost = target.cloneNode(true);
	document.body.appendChild(ghost);
	ghost.style.display = 'none';

	return (event) => {
		target.classList.add('dragging');

		ghost.style.position = 'absolute';
		ghost.style.display = 'list-item';
		ghost.style.zIndex = 1000;
		ghost.style.width = window.getComputedStyle(target).width;
		ghost.style.zIndex = window.getComputedStyle(target).height;

		moveAt(ghost, event.pageX, event.pageY);
	};
}
export function mouseUp(e) {
	let belowCard;

	ghost.style.display = 'none';
	let elemBelow = document.elementFromPoint(e.clientX, e.clientY);
	ghost.style.display = 'list-item';

	let todoList = getTodoList(elemBelow);

	console.log(todoList);
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
