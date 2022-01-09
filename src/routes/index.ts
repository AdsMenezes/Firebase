import { Router } from 'express'

import MovieController from '../controllers/MovieController'

const routes = Router()

const movieController = new MovieController()

routes.get('/movies', movieController.index)
routes.get('/movies/:id', movieController.show)
routes.post('/movies', movieController.create)
routes.put('/movies/:id', movieController.update)
routes.delete('/movies/:id', movieController.delete)

export default routes