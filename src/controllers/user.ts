export function createUserController(users: any[], newUsers: any) {
	const usersIndex = users.findIndex((el) => el.id === newUsers.id);
	if (usersIndex === -1) {
		users.push(newUsers);
	} else {
		users[usersIndex] = { // when creat update it will tack some information from the last array 
			...users[usersIndex],
			...newUsers,
		};
	}
	return users;
}
