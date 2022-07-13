const processedData = {
	1: {
		title: '해야할 일',
		todos: [
			{
				id: 1,
				title: '코딩하기',
				content: '코딩을 사랑해',
				column_id: 1,
				index: 0,
			},
			{
				id: 4,
				title: '코딩하기',
				content: '코딩을 사랑해',
				column_id: 1,
				index: 1,
			},
			{
				id: 5,
				title: '춤추기',
				content: '하이',
				column_id: 1,
				index: 2,
			},
		],
	},
	2: {
		title: '진행중인 일',
		todos: [
			{
				id: 2,
				title: '코딩하기',
				content: '코딩을 사랑해',
				column_id: 2,
				index: 0,
			},
		],
	},
	3: {
		title: '완료된 일',
		todos: [
			{
				id: 3,
				title: '코딩하기',
				content: '코딩을 사랑해',
				column_id: 3,
				index: 0,
			},
			{
				id: 6,
				title: '커피사기',
				content: '내일까지 프론트',
				column_id: 3,
				index: 1,
			},
		],
	},
};

export const logData = [
	{
		id: 1,
		type: 'move',
		userName: '한진탁',
		toDoTitle: '코딩하기',
		toDoColumnId: 1,
		nextToDoColumnId: 2,
		date: new Date(),
	},
	{
		id: 2,
		type: 'remove',
		userName: '이주암',
		toDoTitle: '밥먹기',
		toDoColumnId: 1,
		nextToDoColumnId: null,
		date: new Date('2022-07-11T03:24:00'),
	},
	{
		id: 3,
		type: 'add',
		userName: '한진탁',
		toDoTitle: '운동하기',
		toDoColumnId: 1,
		nextToDoColumnId: null,
		date: new Date(),
	},
	{
		id: 4,
		type: 'move',
		userName: '이주암',
		toDoTitle: '공부하기',
		toDoColumnId: 2,
		nextToDoColumnId: 1,
		date: new Date(),
	},
	{
		id: 5,
		type: 'add',
		userName: '한진탁',
		toDoTitle: '쇼핑하기',
		toDoColumnId: 3,
		nextToDoColumnId: null,
		date: new Date(),
	},
];

export default processedData;
