import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgreSqlDataSource} from '../datasources';
import {Rol, RolRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly muchos_usuarios: HasManyRepositoryFactory<Usuarios, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.PostgreSQL') dataSource: PostgreSqlDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Rol, dataSource);
    this.muchos_usuarios = this.createHasManyRepositoryFactoryFor('muchos_usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('muchos_usuarios', this.muchos_usuarios.inclusionResolver);
  }
}
