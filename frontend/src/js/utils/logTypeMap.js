function move({ todoTitle, todoColumn, nextTodoColumn }) {
	return `${todoTitle}을/를 ${todoColumn}에서 ${nextTodoColumn}으로 이동하였습니다.`;
}

function add({ todoTitle, todoColumn }) {
	return `${todoColumn}에 ${todoTitle}을/를 등록하였습니다.`;
}

function remove({ todoTitle, todoColumn }) {
	return `${todoColumn}에서 ${todoTitle}을/를 삭제하였습니다.`;
}

const logData2Desc = {
	move: move,
	add: add,
	remove: remove,
};

export default logData2Desc;
