import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@/shared/application/dtos/pagination-output';
import { SearchInput } from '@/shared/application/dtos/search-input';
import {
  FiscalEmitterOutputDto,
  FiscalEmitterOutputMapper,
} from '../dto/fiscal-emitter-output.dto';
import { UseCase as DefaultUseCase } from '@/shared/application/usecases/use-case';
import {
  FiscalEmitterRepository,
  SearchParams,
  SearchResult,
} from '@/fiscal-emitter/domain/repositories/fiscal-emitter.repository';

export type ListFiscalEmitterInput = SearchInput;
export type ListFiscalEmitterOutput = PaginationOutput<FiscalEmitterOutputDto>;

export class ListFiscalEmitterUseCase
  implements DefaultUseCase<ListFiscalEmitterInput, ListFiscalEmitterOutput>
{
  constructor(
    private readonly fiscalEmitterRepository: FiscalEmitterRepository,
  ) {}

  async execute(
    input: ListFiscalEmitterInput,
  ): Promise<ListFiscalEmitterOutput> {
    const params = new SearchParams(input);

    const searchResult: SearchResult =
      await this.fiscalEmitterRepository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: SearchResult): ListFiscalEmitterOutput {
    const items = searchResult.items.map((item) =>
      FiscalEmitterOutputMapper.toOutput(item),
    );
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
