import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
  SearchableRepositoryInterface,
} from '@/shared/domain/repositories/searchable-repository-contracts';
import { FiscalNfConfigEntity } from '../entities/fiscal-nf-config.entity';

export type Filter = string;

export class SearchParams extends DefaultSearchParams<Filter> {}

export class SearchResult extends DefaultSearchResult<
  FiscalNfConfigEntity,
  Filter
> {}

export interface FiscalNfConfigRepository
  extends SearchableRepositoryInterface<
    FiscalNfConfigEntity,
    Filter,
    SearchParams,
    SearchResult
  > {
  findByEmitterId(emitterId: number): Promise<FiscalNfConfigEntity>;
  findFirst(): Promise<FiscalNfConfigEntity>;
}
