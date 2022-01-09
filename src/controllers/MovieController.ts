import { Request, Response } from 'express'

import MoviesRepository from '../repositories/MoviesRepository'

export default class MovieController {
  public async index(request: Request, response: Response): Promise<Response> {
    const moviesRepository = MoviesRepository.getInstance()

    const movies = await moviesRepository.findAll()

    return response.json(movies)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const moviesRepository = MoviesRepository.getInstance()

    const movie = await moviesRepository.findById(id)

    return response.json(movie)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, genet, year, duration } = request.body

    const moviesRepository = MoviesRepository.getInstance()

    const movieId = await moviesRepository.create({
      name,
      genet,
      year,
      duration
    })

    return response.status(201).json({
      id: movieId,
      name,
      genet,
      year,
      duration
    })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, genet, year, duration } = request.body

    const moviesRepository = MoviesRepository.getInstance()

    await moviesRepository.update({
      id,
      name,
      genet,
      year,
      duration
    })

    return response.status(204).send()
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const moviesRepository = MoviesRepository.getInstance()

    await moviesRepository.deleteById(id)

    return response.status(204).send()
  }
}
