import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

type FastifyDone = (err?: FastifyError) => void;

const health = (fastify: FastifyInstance, _: unknown, done: FastifyDone) => {
  fastify.get('/health', async (_: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({ message: 'ok' });
    return;
  });

  done();
};

export default health;
