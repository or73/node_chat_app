const expect        = require('expect');
const request       = require('supertest');
const { ObjectID }  = require('mongodb');

const { generateMessage, generateLocationMessage }   = require('./message');


describe('generateMessage',
	() => {
		it('should generate the correct message object', () => {
				let from    = 'OR73';
				let text    = 'some test message';
				
				let message = generateMessage(from,  text);
				
				expect(typeof message.createdAt).toBe('number');
				expect(message).toMatchObject({ from, text });
		});
	});


describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		let from    = 'OR73';
		let lat     = 15;
		let lon     = 21;
		let url     = 'https://www.google.com/maps?q=15,21';
		let message = generateLocationMessage(from, lat, lon);
		
		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({ from, url });
	});
});


