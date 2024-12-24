/** refactor */
// import { Injectable } from '@nestjs/common';
// import { SoapAbstractRepository } from '../../../../domain/soap/repository/soap.repository';
// import { ProviderEntity } from '../../../domain/entities/provider.entity';
// import { PersonMapper } from './mappers/ServiceMapper';

// export type SchemaProps = {
//   ConsultarRpsDisponivelEnvio: {
//     cnpj?: string;
//     ie: string;
//     cpf?: string;
//     page?: number;
//   };
// };

// @Injectable()
// export class ConsultAvailableRpsRepository extends SoapAbstractRepository<SchemaProps> {
//   protected schema: string = 'consult-available-rps.xml';
//   protected method: string = 'ConsultarRpsDisponivel';
//   protected rootTag: string = 'ConsultarRpsDisponivelEnvio';

//   public async fetch(
//     provider: ProviderEntity,
//     page: number = 1,
//   ): Promise<void> {
//     const schema = this.toSchema(provider, page);
//     return await this.exec(schema, true);
//   }

//   private toSchema(provider: ProviderEntity, page: number = 1): SchemaProps {
//     const person = new PersonMapper(provider);
//     const schema = {
//       ConsultarRpsDisponivelEnvio: {
//         ...person.toXML(),
//         ie: provider.inscricaoMunicipal,
//         page,
//       },
//     };
//     return schema;
//   }
// }
