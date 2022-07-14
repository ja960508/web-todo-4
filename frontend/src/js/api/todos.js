export function addTodo() {
	return new Promise((res) => res(90));
}

export function editTodo(todoId) {
	return new Promise((res) => res(todoId));
}

export function removeTodo(todoId) {
	return new Promise((res) => res(todoId));
}
