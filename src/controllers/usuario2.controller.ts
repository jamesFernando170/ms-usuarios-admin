import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Configuracion} from '../Llaves/configuracion';
import {CambioClave, Credenciales, NotificacionCorreo, Usuario2} from '../models';
import {CredencialesRecuperarClave} from '../models/credenciales-recuperar-clave.model';
import {NotificacionSms} from '../models/notificacion-sms.model';
//import {NotificacionCorreo, Usuario2} from '../models';
import {Usuario2Repository} from '../repositories';
import {AdministradorClavesService, NotificacionesService} from '../services';

export class Usuario2Controller {
  constructor(
    @repository(Usuario2Repository)
    public usuario2Repository: Usuario2Repository,
    @service(AdministradorClavesService)
    public servicioClaves: AdministradorClavesService,
    @service(NotificacionesService)
    public servivioNotificaciones: NotificacionesService
  ) { }

  @post('/usuario2s')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario2)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario2, {
            title: 'NewUsuario',
            exclude: ['_id'],
          }),
        },
      },
    })
    usuario: Omit<Usuario2, '_id'>,
  ): Promise<Usuario2> {
    let clave = this.servicioClaves.CrearClaveAleatoria();
    //console.log(clave);

    let claveCifrada = this.servicioClaves.CifrarTexto(clave);
    usuario.clave = claveCifrada

    let usuarioCreado = await this.usuario2Repository.create(usuario);

    if (usuarioCreado) {
      // enviar clave por Correo o mensaje
      let datos = new NotificacionCorreo();
      datos.destinatario = usuario.correo;
      datos.asunto = Configuracion.asuntoCreacionUsuario;
      datos.mensaje = `Hola ${usuario.nombre} <br/> ${Configuracion.mensajeCreacionUsuario} ${clave}`
      this.servivioNotificaciones.EnviarCorreo(datos)
    }
    return usuarioCreado;
  }

  @get('/usuario2s/count')
  @response(200, {
    description: 'Usuario2 model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario2) where?: Where<Usuario2>,
  ): Promise<Count> {
    return this.usuario2Repository.count(where);
  }

  @get('/usuario2s')
  @response(200, {
    description: 'Array of Usuario2 model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario2, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario2) filter?: Filter<Usuario2>,
  ): Promise<Usuario2[]> {
    return this.usuario2Repository.find(filter);
  }

  @patch('/usuario2s')
  @response(200, {
    description: 'Usuario2 PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario2, {partial: true}),
        },
      },
    })
    usuario2: Usuario2,
    @param.where(Usuario2) where?: Where<Usuario2>,
  ): Promise<Count> {
    return this.usuario2Repository.updateAll(usuario2, where);
  }

  @get('/usuario2s/{id}')
  @response(200, {
    description: 'Usuario2 model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario2, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario2, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario2>
  ): Promise<Usuario2> {
    return this.usuario2Repository.findById(id, filter);
  }

  @patch('/usuario2s/{id}')
  @response(204, {
    description: 'Usuario2 PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario2, {partial: true}),
        },
      },
    })
    usuario2: Usuario2,
  ): Promise<void> {
    await this.usuario2Repository.updateById(id, usuario2);
  }

  @put('/usuario2s/{id}')
  @response(204, {
    description: 'Usuario2 PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario2: Usuario2,
  ): Promise<void> {
    await this.usuario2Repository.replaceById(id, usuario2);
  }

  @del('/usuario2s/{id}')
  @response(204, {
    description: 'Usuario2 DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuario2Repository.deleteById(id);
  }

  @post('/identificar-usuario')
  @response(200, {
    description: 'Identificación de usuarios',
    content: {'application/json': {schema: getModelSchemaRef(Credenciales)}},
  })
  async identificarUsuario(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales, {
            title: 'Identificar Usuario'
          }),
        },
      },
    })
    credenciales: Credenciales,
  ): Promise<object | null> {
    let usuario = await this.usuario2Repository.findOne({
      where: {
        correo: credenciales.usuario,
        clave: credenciales.clave
      }
    });
    if (usuario) {
      usuario.clave = "";
      // generar token y agregarlo a la respuesta.
    }
    return usuario;
  }

  @post('/cambiar-clave')
  @response(200, {
    description: 'Cambio de clave de usuarios',
    content: {'application/json': {schema: getModelSchemaRef(CambioClave)}},
  })
  async cambiarClave(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioClave, {
            title: 'Cambio de clave del Usuario'
          }),
        },
      },
    })
    credencialesClave: CambioClave,
  ): Promise<Boolean> {
    let usuario = await this.servicioClaves.CambiarClave(credencialesClave);
    if (usuario) {
      //Notificacion por correo o sms
      let datos = new NotificacionCorreo();
      datos.destinatario = usuario.correo;
      datos.asunto = Configuracion.asuntoCambioClave;
      datos.mensaje = `Hola ${usuario.nombre} <br/> ${Configuracion.mensajeCambioClave}`
      this.servivioNotificaciones.EnviarCorreo(datos)
    }
    return usuario != null;
  }

  @post('/recuperar-clave')
  @response(200, {
    description: 'Recuperar clave de usuarios',
    content: {'application/json': {schema: {}}},
  })
  async recuperarClave(
    @requestBody({
      content: {
        'application/json': {
        },
      },
    })
    credenciales: CredencialesRecuperarClave,
  ): Promise<Usuario2 | null> {
    let usuario = await this.usuario2Repository.findOne({
      where: {
        correo: credenciales.correo
      }
    });
    if (usuario) {
      //Notificacion sms de la nueva contraseña
      let clave = this.servicioClaves.CrearClaveAleatoria();
      console.log(clave);
      let claveCifrada = this.servicioClaves.CifrarTexto(clave);
      usuario.clave = this.servicioClaves.CifrarTexto(clave);
      await this.usuario2Repository.updateById(usuario._id, usuario)
      console.log(claveCifrada);
      let datos = new NotificacionSms();
      datos.destino = usuario.celular;
      datos.mensaje = `Hola ${usuario.nombre} <br/> ${Configuracion.mensajeRecuperarClave} ${clave}`
      this.servivioNotificaciones.EnviarSms(datos)
    }
    return usuario
  }
}


