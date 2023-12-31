import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuarios,
  Rol,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosRolController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Usuarios',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rol),
          },
        },
      },
    },
  })
  async getRol(
    @param.path.number('id') id: typeof Usuarios.prototype.id,
  ): Promise<Rol> {
    return this.usuariosRepository.tiene(id);
  }
}
