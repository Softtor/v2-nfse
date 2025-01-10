import { EntityValidationError } from '../../../shared/domain/errors/validation-error';
import { ServiceEntityValidatorFactory } from '../validators/service.entity-validator';
import { Entity } from './entity';

export type ServiceProps = {
  serviceValue: number;
  deductionValue: number;
  pisValue: number;
  cofinsValue?: number;
  inssValue?: number;
  irValue?: number;
  csllValue?: number;
  otherRetentions?: number;
  totalTributesValue?: number;
  issValue?: number;
  rate?: number;
  nbsCode?: string;
  unconditionalDiscount?: number;
  conditionalDiscount?: number;
  issWithheld: number;
  serviceItemList: string;
  cnaeCode: string;
  municipalTaxationCode: string;
  serviceDescription: string;
  municipalityCode: string;
  issExigibility: number;
  incidenceMunicipality: string;
};

export class ServiceEntity extends Entity<ServiceProps> {
  constructor(props: ServiceProps) {
    super(props);
    this.validate();
  }

  validate(): void {
    const validator = ServiceEntityValidatorFactory.create();
    const isValid = validator.validate(this.props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get serviceValue(): number {
    return this.props.serviceValue;
  }

  get deductionValue(): number {
    return this.props.deductionValue;
  }

  get pisValue(): number {
    return this.props.pisValue;
  }

  get cofinsValue(): number {
    return this.props.cofinsValue;
  }

  get inssValue(): number {
    return this.props.inssValue;
  }

  get irValue(): number {
    return this.props.irValue;
  }

  get csllValue(): number {
    return this.props.csllValue;
  }

  get otherRetentions(): number {
    return this.props.otherRetentions;
  }

  get totalTributesValue(): number {
    return this.props.totalTributesValue;
  }

  get issValue(): number {
    return this.props.issValue;
  }

  get rate(): number {
    return this.props.rate;
  }

  get nbsCode(): string {
    return this.props.nbsCode;
  }

  get unconditionalDiscount(): number {
    return this.props.unconditionalDiscount;
  }

  get conditionalDiscount(): number {
    return this.props.conditionalDiscount;
  }

  get issWithheld(): number {
    return this.props.issWithheld;
  }

  get serviceItemList(): string {
    return this.props.serviceItemList;
  }

  get cnaeCode(): string {
    return this.props.cnaeCode;
  }

  get municipalTaxationCode(): string {
    return this.props.municipalTaxationCode;
  }

  get serviceDescription(): string {
    return this.props.serviceDescription;
  }

  get municipalityCode(): string {
    return this.props.municipalityCode;
  }

  get issExigibility(): number {
    return this.props.issExigibility;
  }

  get incidenceMunicipality(): string {
    return this.props.incidenceMunicipality;
  }

  set serviceValue(value: number) {
    this.props.serviceValue = value;
  }

  set deductionValue(value: number) {
    this.props.deductionValue = value;
  }

  set pisValue(value: number) {
    this.props.pisValue = value;
  }

  set cofinsValue(value: number) {
    this.props.cofinsValue = value;
  }

  set inssValue(value: number) {
    this.props.inssValue = value;
  }

  set irValue(value: number) {
    this.props.irValue = value;
  }

  set csllValue(value: number) {
    this.props.csllValue = value;
  }

  set otherRetentions(value: number) {
    this.props.otherRetentions = value;
  }

  set totalTributesValue(value: number) {
    this.props.totalTributesValue = value;
  }

  set issValue(value: number) {
    this.props.issValue = value;
  }

  set rate(value: number) {
    this.props.rate = value;
  }

  set nbsCode(value: string) {
    this.props.nbsCode = value;
  }

  set unconditionalDiscount(value: number) {
    this.props.unconditionalDiscount = value;
  }

  set conditionalDiscount(value: number) {
    this.props.conditionalDiscount = value;
  }

  set issWithheld(value: number) {
    this.props.issWithheld = value;
  }

  set serviceItemList(value: string) {
    this.props.serviceItemList = value;
  }

  set cnaeCode(value: string) {
    this.props.cnaeCode = value;
  }

  set municipalTaxationCode(value: string) {
    this.props.municipalTaxationCode = value;
  }

  set serviceDescription(value: string) {
    this.props.serviceDescription = value;
  }

  set municipalityCode(value: string) {
    this.props.municipalityCode = value;
  }

  set issExigibility(value: number) {
    this.props.issExigibility = value;
  }

  set incidenceMunicipality(value: string) {
    this.props.incidenceMunicipality = value;
  }
}
