import Fastify, { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';

type FastifyDone = (err?: FastifyError) => void;

const health = (fastify: FastifyInstance, _: unknown, done: FastifyDone) => {
  fastify.get('/health', async (_: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ message: 'ok' });
    return;
  });

  done();
};

const start = async () => {
  const server: FastifyInstance = Fastify({
    logger: true,
  });
  server.register(health);
  server.register(cors, { origin: '*' });

  try {
    await server.listen({ port: 8000, host: '0.0.0.0' });
    const address = server.server.address();
    if (address && typeof address !== 'string') {
      server.log.info(`Server listening on ${address.port}`);
    } else {
      server.log.error('Failed to retrieve server address information');
      process.exit(1);
    }
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
