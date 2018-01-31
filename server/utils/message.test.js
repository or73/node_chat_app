const expect    = require('expect');
const request   = require('supertest');

const { generateMessage }   = require('./message');


describe('generateMessage',
	() => {
		it('should generate the correct message object',
			() => {
				let from    = 'OR73';
				let text    = 'some test message';
				
				let message = generateMessage(from,  text);
				
				expect(typeof message.createdAt).toBe('number');
				expect(message).toMatchObject({ from, text });
		});
	});


