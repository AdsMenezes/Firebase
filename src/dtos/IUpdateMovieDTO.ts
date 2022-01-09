import ICreateMovieDTO from  './ICreateMovieDTO'

export default interface IUpdateMovieDTO extends Partial<ICreateMovieDTO>{
  id: string;
}