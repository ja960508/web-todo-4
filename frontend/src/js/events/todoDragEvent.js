export function moveAt(target, pageX, pageY) {
	target.style.left = pageX - target.offsetWidth / 2 + 'px';
	target.style.top = pageY - target.offsetHeight / 2 + 'px';
}

export function onMouseMove(target) {
	return (event) => {
		moveAt(target, event.pageX, event.pageY);
	};
}
