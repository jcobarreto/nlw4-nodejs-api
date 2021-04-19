import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

  // http://localhost:4444/answers/5?u=d5d57d02-1f3a-4ea8-b556-f676ebbbf198
  /**      
   * Route Params => Parametros que compõe a rota
   * routes.get("/answers/:value")      
   * 
   * Query Params => Busca, Paginacao, não obrigatórios
   * ?chave=valor
   */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if (!surveyUser) {
      throw new AppError('Survey User does not exists!');
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };