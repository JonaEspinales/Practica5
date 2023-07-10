import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ClienteService {

  private clientes: Cliente[] = [
    {
      id:1, identificacion:'10' , nombre: 'Cliente de Deportes', estado:true
    },
    {
      id:2, identificacion:'20' , nombre: 'Cliente de Peliculas', estado:true
    },
  ]

  create(createClienteDto: CreateClienteDto) {
    const cliente = new Cliente();
    cliente.id=  Math.max( ... this.clientes.map(elemento => elemento.id),0 )+1 ;
    cliente.nombre = createClienteDto.nombre;
    this.clientes.push(cliente);
    return cliente;
  }

  findAll() : Cliente[] {
    return this.clientes;
  }

  findOne(id: number) {
    const cliente =  this.clientes.find(cliente=> cliente.id===id);
    if (!cliente) throw new NotFoundException(`ID ${id} not found`)
    return cliente;
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    const { identificacion, nombre, estado } = updateClienteDto;
    const cliente = this.findOne(id);
    if (identificacion) cliente.identificacion = identificacion;
    if (nombre) cliente.nombre = nombre;
    if (estado!= undefined) cliente.estado = estado;

    this.clientes =  this.clientes.map( elemento=> {
      if (elemento.id===id) return cliente;
      return elemento;
    } )

    return cliente;

  }

  remove(id: number) {
    this.findOne(id);
    this.clientes =  this.clientes.filter(elemento=> elemento.id!== id);
  }
}
