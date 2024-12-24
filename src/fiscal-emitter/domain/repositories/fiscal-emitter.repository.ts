import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { FiscalEmitterEntity } from '../entities/fiscal-emitter.entity';

export type Filter = string;

export class SearchParams extends DefaultSearchParams<Filter> {}

export class SearchResult extends DefaultSearchResult<
  FiscalEmitterEntity,
  Filter
> {}

export interface FiscalEmitterRepository
  extends SearchableRepositoryInterface<
    FiscalEmitterEntity,
    Filter,
    SearchParams,
    SearchResult
  > {
  save(entity: FiscalEmitterEntity): Promise<FiscalEmitterEntity>;
  findByDocument(document: string): Promise<FiscalEmitterEntity>;
}
