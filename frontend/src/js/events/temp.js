export function pullUpBelowCards(todoCard) {
	const DIV = document.createElement('div');
	const UL = todoCard.parentNode;
	const belowNode = [];
	let flag = false;

	DIV.classList.add('card-pocket');
	UL.insertBefore(DIV, todoCard.nextElementSibling);

	todoCard.classList.add('fade');

	todoCard.parentNode.childNodes.forEach((item) => {
		if (item.tagName === 'DIV') return;

		flag && belowNode.push(item);

		if (item.classList.contains('fade')) {
			flag = true;
		}
	});

	belowNode.forEach((node) => DIV.appendChild(node));

	DIV.style.transform = `translateY(-${todoCard.offsetHeight}px)`;

	return [DIV, UL];
}

export function restoreBelowCards(DIV, UL) {
	const nodeList = [];

	DIV.childNodes.forEach((node) => {
		nodeList.push(node);
	});

	nodeList.forEach((node) =>
		UL.insertBefore(node, UL.querySelector('.card-pocket'))
	);

	DIV.parentNode.removeChild(DIV);
}

export function calcPositionDiff(ghost, subTarget) {
	const xDiff =
		ghost.getBoundingClientRect().x - subTarget.getBoundingClientRect().x;
	const yDiff =
		ghost.getBoundingClientRect().y - subTarget.getBoundingClientRect().y;

	return [xDiff, yDiff];
}
