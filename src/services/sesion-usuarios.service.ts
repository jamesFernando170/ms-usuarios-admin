import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Configuracion} from '../Llaves/configuracion';
import {Credenciales, Usuario2} from '../models';
import {Usuario2Repository} from '../repositories';
const fetch = require('node-fetch')

@injectable({scope: BindingScope.TRANSIENT})
export class SesionUsuariosService {
  constructor(
    @repository(Usuario2Repository)
    private usuario2Repository: Usuario2Repository
  ) { }

  /*
   * Add service methods here
   */
  async IdentificarUsuario(credenciales: Credenciales) {
    let usuario = await this.usuario2Repository.findOne({
      where: {
        correo: credenciales.usuario,
        clave: credenciales.clave
      }
    });
    return usuario;
  }

  async generarToken(datos: Usuario2): Promise<string> {
    let url = `${Configuracion.urlCrearToken}?${Configuracion.arg_nombre}=${datos.nombre}&${Configuracion.arg_id_proponente}=${datos._id}`;
    let token = "";
    await fetch(url)
      .then(async (res: any) => {
        token = await res.text();
      })
    return token
  }
}
