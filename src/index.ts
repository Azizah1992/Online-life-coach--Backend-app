import { server } from './server';// entry point 

server.listen({ port: 3001 }).catch((err) => {
	server.log.error(err);
	process.exit(1);
});
