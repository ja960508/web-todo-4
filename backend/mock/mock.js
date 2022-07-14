let userData = [
  { id: 1, username: "한진탁" },
  { id: 2, username: "이주암" },
];

let columnData = [
  { id: 0, title: "해야할 일", userId: 1 },
  { id: 1, title: "하고있는 일", userId: 1 },
  { id: 2, title: "완료한 일", userId: 1 },
  { id: 3, title: "해야할 일2", userId: 2 },
  { id: 4, title: "하고있는 일2", userId: 2 },
  { id: 5, title: "완료한 일2", userId: 2 },
];

let todoData = [
  {
    id: 0,
    title: "코딩하기",
    content: "(해야할 일) 코딩을 사랑해",
    todoColumnId: 0,
    index: 0,
  },
  {
    id: 1,
    title: "밥먹기",
    content: "(해야할 일) 우육면을 사랑해",
    todoColumnId: 0,
    index: 1,
  },
  {
    id: 2,
    title: "춤추기",
    content: "(해야할 일)브레이크 댄스 타임",
    todoColumnId: 0,
    index: 2,
  },
  {
    id: 3,
    title: "잠자기",
    content: "(하고있는 일) 꿀잠꿀잠 사랑해",
    todoColumnId: 1,
    index: 0,
  },
  {
    id: 4,
    title: "커피사기",
    content: "(하고있는 일) 내일까지 프론트",
    todoColumnId: 1,
    index: 1,
  },
  {
    id: 5,
    title: "농구하기",
    content: "(하고있는 일)왼손은 거들 뿐",
    todoColumnId: 1,
    index: 2,
  },
  {
    id: 6,
    title: "놀기",
    content: "(완료한 일) 하루종일",
    todoColumnId: 2,
    index: 0,
  },
  {
    id: 7,
    title: "여행가기",
    content: "(완료한 일) 당일치기",
    todoColumnId: 2,
    index: 1,
  },
  {
    id: 8,
    title: "방황하기",
    content: "(완료한 일) 사춘기인가",
    todoColumnId: 2,
    index: 2,
  },
  {
    id: 9,
    title: "코딩하기",
    content: "(해야할 일2) 코딩을 사랑해",
    todoColumnId: 3,
    index: 0,
  },
  {
    id: 10,
    title: "밥먹기",
    content: "(해야할 일2) 우육면을 사랑해",
    todoColumnId: 3,
    index: 1,
  },
  {
    id: 11,
    title: "춤추기",
    content: "(해야할 일2)브레이크 댄스 타임",
    todoColumnId: 3,
    index: 2,
  },
  {
    id: 12,
    title: "잠자기",
    content: "(하고있는 일2) 꿀잠꿀잠 사랑해",
    todoColumnId: 4,
    index: 0,
  },
  {
    id: 13,
    title: "커피사기",
    content: "(하고있는 일2) 내일까지 프론트",
    todoColumnId: 4,
    index: 1,
  },
  {
    id: 14,
    title: "농구하기",
    content: "(하고있는 일2) 왼손은 거들 뿐",
    todoColumnId: 4,
    index: 2,
  },
  {
    id: 15,
    title: "놀기",
    content: "(완료한 일2) 하루종일",
    todoColumnId: 5,
    index: 0,
  },
  {
    id: 16,
    title: "여행가기",
    content: "(완료한 일2) 당일치기",
    todoColumnId: 5,
    index: 1,
  },
  {
    id: 17,
    title: "방황하기",
    content: "(완료한 일2) 사춘기인가",
    todoColumnId: 5,
    index: 2,
  },
];

let logData = [
  {
    id: 1,
    userId: 1,
    type: "move",
    todoTitle: "코딩하기",
    todoColumnId: 1,
    nextTodoColumnId: 2,
    date: new Date(),
  },
  {
    id: 2,
    userId: 1,
    type: "remove",
    todoTitle: "밥먹기",
    todoColumnId: 1,
    nextTodoColumnId: null,
    date: new Date("2022-07-11T03:24:00"),
  },
  {
    id: 3,
    userId: 1,
    type: "add",
    todoTitle: "운동하기",
    todoColumnId: 1,
    nextTodoColumnId: null,
    date: new Date(),
  },
  {
    id: 4,
    userId: 1,
    type: "move",
    todoTitle: "공부하기",
    todoColumnId: 2,
    nextTodoColumnId: 1,
    date: new Date(),
  },
  {
    id: 5,
    userId: 1,
    type: "add",
    todoTitle: "쇼핑하기",
    todoColumnId: 3,
    nextTodoColumnId: null,
    date: new Date(),
  },
];

function removeDataAtDB(todoId) {
  todoData = [...todoData.filter((todo) => todo.id !== todoId)];
}

export { userData, logData, todoData, columnData, removeDataAtDB };
