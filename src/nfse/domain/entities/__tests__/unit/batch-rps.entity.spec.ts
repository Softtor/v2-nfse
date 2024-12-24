import { BatchRpsEntity, BatchRpsProps } from '../../batch-rps.entity';
import { ProviderProps } from '../../provider.entity';
import { provider, rpsList } from '../testing/mocks';
describe('BatchRpsEntity', () => {
  it('should create a BatchRpsEntity with the correct properties', () => {
    const props: BatchRpsProps = {
      batchNumber: '123',
      provider,
      rpsList,
    };

    const batchRpsEntity = new BatchRpsEntity(props);

    expect(batchRpsEntity.batchNumber).toBe('123');
    expect(batchRpsEntity.provider).toBe(provider);
    expect(batchRpsEntity.rpsList).toBe(rpsList);
    expect(batchRpsEntity.rpsQuantity).toBe(rpsList.length);
  });

  it('should set rpsQuantity to 0 if rpsList is not provided', () => {
    const props: BatchRpsProps = {
      batchNumber: '123',
      provider,
      rpsList: [],
    };

    const batchRpsEntity = new BatchRpsEntity(props);

    expect(batchRpsEntity.rpsQuantity).toBe(0);
  });

  it('should throw an error when creating a BatchRpsEntity with invalid properties', () => {
    const props = {
      provider,
      rpsList,
    };

    expect(() => new BatchRpsEntity(props as BatchRpsProps)).toThrow();
  });
});
