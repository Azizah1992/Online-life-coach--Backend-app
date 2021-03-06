import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { createUserController } from '../controllers/user';

const User = Type.Object({
	id: Type.String({ format: 'uuid' }),
	name: Type.String(),
	phone: Type.String(),
});
type User = Static<typeof User>;  //define query 

const GetUserQuery = Type.Object({
	name: Type.Optional(Type.String()),

});
type GetUserQuery = Static<typeof GetUserQuery>; //to define with type box

export let users: User[] = [  //which is defined in the contrlr coachs
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Omer', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', name: 'Nour', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', name: 'Ahlam', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', name: 'Khalid', phone: '0511111111' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', name: 'Sauod', phone: '0511111111' },

];

export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/users',
		schema: {
			summary: 'Creates new suer + all properties are required',
			tags: ['Users'],
			body: User,
		},
		handler: async (request, reply) => {
			const newUser: any = request.body;
			return createUserController(users, newUser);
		},
	});

	server.route({
		method: 'PATCH',
		url: '/users/:id',
		schema: {
			summary: 'Update a users by id + you dont need to pass all properties',
			tags: ['Users'],
			body: Type.Partial(User),
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newUser: any = request.body;
			return createUserController(users, newUser);

		},
	});

	server.route({
		method: 'DELETE',
		url: '/users/:id',
		schema: {
			summary: 'Deletes a user',
			tags: ['Users'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			users = users.filter((c) => c.id !== id);

			return users;
		},
	});

	server.route({
		method: 'GET',
		url: '/users/:id',
		schema: {
			summary: 'Returns one user or null',
			tags: ['Users'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Union([User, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return users.find((c) => c.id === id) ?? null;
		},
	});

	server.route({
		method: 'GET',
		url: '/users',
		schema: {
			summary: 'Gets all contacts',
			tags: ['Users'],
			querystring: GetUserQuery,
			response: {
				'2xx': Type.Array(User),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetUserQuery;

			if (query.name) {
				return users.filter((c) => c.name.includes(query.name ?? ''));
			} else {
				return users;
			}
		},
	});
}
function newUser(users: { id: string; name: string; phone: string; }[], newUser: any): unknown {
	throw new Error('Function not implemented.');
}








// import { Static, Type } from '@sinclair/typebox';
// import { FastifyInstance } from 'fastify';
// import { upsertContactController } from '../controllers/upsert-contact';

// const Contact = Type.Object({
// 	id: Type.String({ format: 'uuid' }),
// 	name: Type.String(),
// 	phone: Type.String(),
// });
// type Contact = Static<typeof Contact>;

// const GetContactsQuery = Type.Object({
// 	name: Type.Optional(Type.String()),
// });
// type GetContactsQuery = Static<typeof GetContactsQuery>;

// export let contacts: Contact[] = [
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', name: 'Lamis', phone: '0511111111' },
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', name: 'Lamis', phone: '0511111111' },
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', name: 'Amani', phone: '0511111111' },
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', name: 'Amani', phone: '0511111111' },
// 	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', name: 'Amal', phone: '0511111111' },
// 	{ id: '3', name: 'Azizah', phone: '123123123' },
// ];

// export default async function (server: FastifyInstance) {
// 	server.route({
// 		method: 'PUT',
// 		url: '/contacts',
// 		schema: {
// 			summary: 'Creates new contact + all properties are required',
// 			tags: ['Contacts'],
// 			body: Contact,
// 		},
// 		handler: async (request, reply) => {
// 			const newContact: any = request.body;
// 			return upsertContactController(contacts, newContact);
// 		},
// 	});

// 	server.route({
// 		method: 'PATCH',
// 		url: '/contacts/:id',
// 		schema: {
// 			summary: 'Update a contact by id + you dont need to pass all properties',
// 			tags: ['Contacts'],
// 			body: Type.Partial(Contact),
// 			params: Type.Object({
// 				id: Type.String({ format: 'uuid' }),
// 			}),
// 		},
// 		handler: async (request, reply) => {
// 			const newContact: any = request.body;
// 			return upsertContactController(contacts, newContact);
// 		},
// 	});

// 	server.route({
// 		method: 'DELETE',
// 		url: '/contacts/:id',
// 		schema: {
// 			summary: 'Deletes a contact',
// 			tags: ['Contacts'],
// 			params: Type.Object({
// 				id: Type.String({ format: 'uuid' }),
// 			}),
// 		},
// 		handler: async (request, reply) => {
// 			const id = (request.params as any).id as string;

// 			contacts = contacts.filter((c) => c.id !== id);

// 			return contacts;
// 		},
// 	});

// 	server.route({
// 		method: 'GET',
// 		url: '/contacts/:id',
// 		schema: {
// 			summary: 'Returns one contact or null',
// 			tags: ['Contacts'],
// 			params: Type.Object({
// 				id: Type.String({ format: 'uuid' }),
// 			}),
// 			response: {
// 				'2xx': Type.Union([Contact, Type.Null()]),
// 			},
// 		},
// 		handler: async (request, reply) => {
// 			const id = (request.params as any).id as string;

// 			return contacts.find((c) => c.id === id) ?? null;
// 		},
// 	});

// 	server.route({
// 		method: 'GET',
// 		url: '/contacts',
// 		schema: {
// 			summary: 'Gets all contacts',
// 			tags: ['Contacts'],
// 			querystring: GetContactsQuery,
// 			response: {
// 				'2xx': Type.Array(Contact),
// 			},
// 		},
// 		handler: async (request, reply) => {
// 			const query = request.query as GetContactsQuery;

// 			if (query.name) {
// 				return contacts.filter((c) => c.name.includes(query.name ?? ''));
// 			} else {
// 				return contacts;
// 			}
// 		},
// 	});
// }

