import { getFirestore, CollectionReference, DocumentData } from 'firebase-admin/firestore'

import ICreateMovieDTO from '../dtos/ICreateMovieDTO'
import IUpdateMovieDTO from '../dtos/IUpdateMovieDTO'

export default class MoviesRepository {
  private static INSTANCE: MoviesRepository

  private repository: CollectionReference<DocumentData>

  private constructor() {
    this.repository = getFirestore().collection('movies')
  }

  public static getInstance() {
    if(!MoviesRepository.INSTANCE) {
      MoviesRepository.INSTANCE = new MoviesRepository()
    }

    return MoviesRepository.INSTANCE
  }

  public async findAll() {
    const snapshot = await this.repository.orderBy('name').get()
    
    const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

    return movies
  }

  public async findById(id: string) {
    const doc = await this.repository.doc(id).get()
    
    const movie = { id, ...doc.data()}

    return movie
  }

  public async create({ name, genet, year, duration }: ICreateMovieDTO): Promise<string> {
    const movieRef = await this.repository.add({ 
      name,
      genet,
      year,
      duration
    })

    return movieRef.id
  }

  public async update({ id, name, genet, year, duration }: IUpdateMovieDTO): Promise<void> {
    await this.repository.doc(id).update({
      name,
      genet,
      year,
      duration
    })
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.doc(id).delete()
  }
}