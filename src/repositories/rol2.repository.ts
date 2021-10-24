import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol2, Rol2Relations, Usuario2, UsuarioRol2} from '../models';
import {UsuarioRol2Repository} from './usuario-rol2.repository';
import {Usuario2Repository} from './usuario2.repository';

export class Rol2Repository extends DefaultCrudRepository<
  Rol2,
  typeof Rol2.prototype._id,
  Rol2Relations
> {

  public readonly usuario2s: HasManyThroughRepositoryFactory<Usuario2, typeof Usuario2.prototype._id,
          UsuarioRol2,
          typeof Rol2.prototype._id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRol2Repository') protected usuarioRol2RepositoryGetter: Getter<UsuarioRol2Repository>, @repository.getter('Usuario2Repository') protected usuario2RepositoryGetter: Getter<Usuario2Repository>,
  ) {
    super(Rol2, dataSource);
    this.usuario2s = this.createHasManyThroughRepositoryFactoryFor('usuario2s', usuario2RepositoryGetter, usuarioRol2RepositoryGetter,);
    this.registerInclusionResolver('usuario2s', this.usuario2s.inclusionResolver);
  }
}
