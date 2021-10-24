import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuarioRol2, UsuarioRol2Relations} from '../models';

export class UsuarioRol2Repository extends DefaultCrudRepository<
  UsuarioRol2,
  typeof UsuarioRol2.prototype._id,
  UsuarioRol2Relations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuarioRol2, dataSource);
  }
}
