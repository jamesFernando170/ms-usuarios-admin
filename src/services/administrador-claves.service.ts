import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CambioClave, Usuario2} from '../models';
import {Usuario2Repository} from '../repositories';
const generator = require('generate-password');
const CryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AdministradorClavesService {
  constructor(
    @repository(Usuario2Repository)
    public usuario2Repository: Usuario2Repository
  ) { }

  /*
   * Add service methods here
   */
  async CambiarClave(credencialesClave: CambioClave): Promise<Usuario2 | null> {
    let usuario = await this.usuario2Repository.findOne({
      where: {
        _id: credencialesClave.id_usuario,
        clave: credencialesClave.clave_actual
      }
    });
    if (usuario) {
      usuario.clave = credencialesClave.nueva_clave;
      await this.usuario2Repository.updateById(credencialesClave.id_usuario, usuario)
      return usuario;
    } else {
      return null;
    }
  }

  CrearClaveAleatoria(): string {
    let password = generator.generate({
      length: 10,
      numbers: true,
      uppercase: true
    });

    return password
  }

  CifrarTexto(texto: string) {
    let textoCifrado = CryptoJS.MD5(texto).toString();
    return textoCifrado
  }
}
