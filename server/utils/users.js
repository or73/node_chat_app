// [{
// 	id: '/#34dfdsasdf',
// 	name: 'OR73',
// 	rooms: 'The Office Fans'
// }]


class Users {
	constructor () {
		this.users  = [];
	}
	
	addUser (id, name, room) {
		let user    = { id, name, room };
		
		this.users.push(user);
		
		return user;    // return added user
	}
	
	removeUser (id) {
		let user    = this.getUser(id);
		
		if (user) {
			this.users  = this.users.filter((user) => user.id !== id);
		}
		return user;    // return the user that was removed
	}
	
	getUser (id) {
		return this.users.filter((user) => user.id === id)[0];  // returns user's name
	}
	
	getUserList (room) {
		let users       = this.users.filter((user) => user.room === room);  // All users of a specific room
		let namesArray  = users.map((user) => user.name);   // array containing a list of names
		
		return namesArray;
	}
}



module.exports = { Users };

