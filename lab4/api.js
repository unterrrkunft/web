const allUsers = Array.from({ length: 20 }, (_, i) => ({
  firstname: `User${i + 1}`,
  lastname: `Lastname${String.fromCharCode(65 + i)}`,
  score: Math.floor(Math.random() * 100),
}));

const api = {
  fetchUsers: () =>
    new Promise((res) => {
      setTimeout(() => {
        const shuffled = [...allUsers].sort(() => 0.5 - Math.random());
        res(shuffled.slice(0, 10));
      }, 1000);
    }),
  // getNewUsers: () => allUsers.slice(-5), - несостыковочка. В задании написано сначала вывести все последние, а потом мы модифицираем эту функцию
  getNewUsers: () => allUsers.slice(0, 5),
};