import { FastifyReply, FastifyRequest } from 'fastify';
import { constants } from 'http2';

import { MrMeeseeksRepository } from '../../domain/repository/mr-meeseeks';
import { mrMesseeksFormatList } from '../resources/meeseeks-resource';

export interface MeeseeksController {
  meeseeksAllHandler(req: FastifyRequest, res: FastifyReply): Promise<void>;
}

export const createMrMeeseeksController = (repository: MrMeeseeksRepository): MeeseeksController => {
  const meeseeksAllHandler = async (req: FastifyRequest, res: FastifyReply): Promise<void> => {
    const data = await repository.getAllMeeseeks();
    res.status(constants.HTTP_STATUS_OK).send(mrMesseeksFormatList(data));
  };
  return {
    meeseeksAllHandler,
  };
};
