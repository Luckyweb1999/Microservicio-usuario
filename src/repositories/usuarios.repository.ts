import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, Rol} from '../models';
import {RolRepository} from './rol.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly tiene: BelongsToAccessor<Rol, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.PostgreSQL') dataSource: PostgreSqlDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuarios, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', rolRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
