import {
  servico,
  tomadorServico,
  batchRps,
  prestadorServico,
  rps,
} from './mock';
import {
  ServiceEntity,
  ServiceProps,
} from '@/nfse/domain/entities/service.entity';
import { ServiceMapper, WsService } from '../../mappers/service.mapper';
import { ServiceTakerEntity } from '@/nfse/domain/entities/service-taker.entity';
import {
  ServiceTakerMapper,
  WsServiceTaker,
} from '../../mappers/service-taker.mapper';
import { BatchRpsEntity } from '@/nfse/domain/entities/batch-rps.entity';
import { BatchRpsMapper, WsBatchRps } from '../../mappers/batch-rps.mapper';
import { ProviderEntity } from '@/nfse/domain/entities/provider.entity';
import { ProviderMapper, WsProvider } from '../../mappers/provider.mapper';
import { RpsEntity } from '@/nfse/domain/entities/rps.entity';
import { RpsMapper, WsRps } from '../../mappers/rps.mapper';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';
import { AddressMapper, WsAddress } from '../../mappers/address.mapper';

export const serviceEntityBuilder = (props: WsService): ServiceEntity => {
  return ServiceMapper.fromWS(props);
};

export const serviceTakerEntityBuilder = (
  props: WsServiceTaker,
): ServiceTakerEntity => {
  return ServiceTakerMapper.fromWS(props);
};

export const batchRpsEntityBuilder = (props: WsBatchRps): BatchRpsEntity => {
  return BatchRpsMapper.fromWS(props);
};

export const providerEntityBuilder = (props: WsProvider): ProviderEntity => {
  return ProviderMapper.fromWS(props);
};

export const rpsEntityBuilder = (props: WsRps): RpsEntity => {
  return RpsMapper.fromWS(props);
};

export const addressEntityBuilder = (props: WsAddress): AddressEntity => {
  return AddressMapper.fromWS(props);
};

export const serviceTakerBuilder = (
  props: WsServiceTaker,
): ServiceTakerEntity => {
  return ServiceTakerMapper.fromWS(props);
};
let service: ServiceEntity;
let serviceTaker: ServiceTakerEntity;
let provider: ProviderEntity;
let batch: BatchRpsEntity;

try {
  service = serviceEntityBuilder(servico);
  serviceTaker = serviceTakerEntityBuilder(tomadorServico);
  provider = providerEntityBuilder(prestadorServico);
  batch = batchRpsEntityBuilder(batchRps);
} catch (err) {
  console.error(err);
}
export { service, serviceTaker, provider, batch };
