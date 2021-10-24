import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Rol2} from '../models';
import {Rol2Repository} from '../repositories';

export class Rol2Controller {
  constructor(
    @repository(Rol2Repository)
    public rol2Repository : Rol2Repository,
  ) {}

  @post('/rol2s')
  @response(200, {
    description: 'Rol2 model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rol2)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol2, {
            title: 'NewRol2',
            exclude: ['_id'],
          }),
        },
      },
    })
    rol2: Omit<Rol2, '_id'>,
  ): Promise<Rol2> {
    return this.rol2Repository.create(rol2);
  }

  @get('/rol2s/count')
  @response(200, {
    description: 'Rol2 model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rol2) where?: Where<Rol2>,
  ): Promise<Count> {
    return this.rol2Repository.count(where);
  }

  @get('/rol2s')
  @response(200, {
    description: 'Array of Rol2 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rol2, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rol2) filter?: Filter<Rol2>,
  ): Promise<Rol2[]> {
    return this.rol2Repository.find(filter);
  }

  @patch('/rol2s')
  @response(200, {
    description: 'Rol2 PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol2, {partial: true}),
        },
      },
    })
    rol2: Rol2,
    @param.where(Rol2) where?: Where<Rol2>,
  ): Promise<Count> {
    return this.rol2Repository.updateAll(rol2, where);
  }

  @get('/rol2s/{id}')
  @response(200, {
    description: 'Rol2 model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rol2, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Rol2, {exclude: 'where'}) filter?: FilterExcludingWhere<Rol2>
  ): Promise<Rol2> {
    return this.rol2Repository.findById(id, filter);
  }

  @patch('/rol2s/{id}')
  @response(204, {
    description: 'Rol2 PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol2, {partial: true}),
        },
      },
    })
    rol2: Rol2,
  ): Promise<void> {
    await this.rol2Repository.updateById(id, rol2);
  }

  @put('/rol2s/{id}')
  @response(204, {
    description: 'Rol2 PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rol2: Rol2,
  ): Promise<void> {
    await this.rol2Repository.replaceById(id, rol2);
  }

  @del('/rol2s/{id}')
  @response(204, {
    description: 'Rol2 DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rol2Repository.deleteById(id);
  }
}
