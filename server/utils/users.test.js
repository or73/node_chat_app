const expect    = require('expect');

const { Users } = require('./users');



describe('Users', () => {
	let users;
	
	beforeEach(() => {
		users   = new Users();
		users.users = [{
			id: '1',
			name: 'Ktk01',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'OD03',
			room: 'React Course'
		}, {
			id: '3',
			name: 'SPPH',
			room: 'Node Course'
		}, {
			id: '4',
			name: 'OR73',
			room: 'React Course'
		}];
	});
	
	
	it('should add new user', () => {
		let users   = new Users();
		let user    = {
			id: '123',
			name: 'OR73',
			room: 'Office Fans'
		};
		let resUser = users.addUser(user.id,  user.name,  user.room);
		
		expect(users.users).toEqual([user]);
	});
	
	
	it('should remove a user', () => {
		let userId  = '4';
		let user    = users.removeUser(userId);
		
		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(3);
	});
	
	
	it('should not remove user', () => {
		let userId  = '5';
		let user    = users.removeUser(userId);
		
		expect(user).toBeFalsy();
		expect(users.users.length).toBe(4);
	});
	
	
	it('should find user', () => {
		let userId  = '2';
		let user    = users.getUser(userId);
		
		expect(user.id).toBe(userId);
	});
	
	
	it('should not find user', () => {
		let userId  = 'xxx';
		let user    = users.getUser(userId);
		
		expect(user).toBeFalsy();
	});
	
	
	it('should return names for node course', () => {
		let userList    = users.getUserList('Node Course');
		
		expect(userList).toEqual(['Ktk01', 'SPPH']);
	});
	
	
	it('should return names for react course', () => {
		let userList    = users.getUserList('React Course');
		
		expect(userList).toEqual(['OD03', 'OR73']);
	});
});
