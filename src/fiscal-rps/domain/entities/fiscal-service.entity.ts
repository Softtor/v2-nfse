import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { FiscalServiceValidatorFactory } from '../validators/fiscal-service.validator';

export interface FiscalServiceProps {
  serviceValue: number;
  deductionValue?: number;
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
  issWithheld?: number;
  serviceItemList: string;
  cnaeCode: string;
  municipalTaxationCode?: string;
  serviceDescription: string;
  municipalityCode: string;
  issExigibility: number;
  incidenceMunicipality: string;
  externalPlanCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FiscalServiceEntity extends Entity<FiscalServiceProps> {
  constructor(props: FiscalServiceProps, id?: string) {
    super(
      {
        ...props,
        deductionValue: props.deductionValue ?? 0.0,
        pisValue: props.pisValue ?? 0.0,
        cofinsValue: props.cofinsValue ?? 0.0,
        inssValue: props.inssValue ?? 0.0,
        irValue: props.irValue ?? 0.0,
        csllValue: props.csllValue ?? 0.0,
        otherRetentions: props.otherRetentions ?? 0.0,
        totalTributesValue: props.totalTributesValue ?? 0.0,
        issValue: props.issValue ?? 0.0,
        rate: props.rate ?? 0.0,
        unconditionalDiscount: props.unconditionalDiscount ?? 0.0,
        conditionalDiscount: props.conditionalDiscount ?? 0.0,
        issWithheld: props.issWithheld ?? 0.0,
        issExigibility: props.issExigibility ?? 0,
      },
      id,
    );
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
    FiscalServiceEntity.validate(this.props);
  }

  updateFields(fields: Partial<FiscalServiceProps>): void {
    const { createdAt, ...updatableFields } = fields;
    const updatedFields = {
      ...updatableFields,
      deductionValue:
        updatableFields.deductionValue ?? this.props.deductionValue ?? 0.0,
      pisValue: updatableFields.pisValue ?? this.props.pisValue ?? 0.0,
      cofinsValue: updatableFields.cofinsValue ?? this.props.cofinsValue ?? 0.0,
      inssValue: updatableFields.inssValue ?? this.props.inssValue ?? 0.0,
      irValue: updatableFields.irValue ?? this.props.irValue ?? 0.0,
      csllValue: updatableFields.csllValue ?? this.props.csllValue ?? 0.0,
      otherRetentions:
        updatableFields.otherRetentions ?? this.props.otherRetentions ?? 0.0,
      totalTributesValue:
        updatableFields.totalTributesValue ??
        this.props.totalTributesValue ??
        0.0,
      issValue: updatableFields.issValue ?? this.props.issValue ?? 0.0,
      rate: updatableFields.rate ?? this.props.rate ?? 0.0,
      unconditionalDiscount:
        updatableFields.unconditionalDiscount ??
        this.props.unconditionalDiscount ??
        0.0,
      conditionalDiscount:
        updatableFields.conditionalDiscount ??
        this.props.conditionalDiscount ??
        0.0,
      issWithheld: updatableFields.issWithheld ?? this.props.issWithheld ?? 0.0,
      issExigibility:
        updatableFields.issExigibility ?? this.props.issExigibility,
    };

    Object.assign(this.props, updatedFields);
    this.props.updatedAt = new Date();
    FiscalServiceEntity.validate(this.props);
  }

  updateFromEmitter(emitter: any): void {
    const fieldsToUpdate = {
      cnaeCode: emitter.cnaeCode,
      municipalityCode: emitter.cityCode?.toString(),
      rate: emitter.aliquot ?? 0.0,
      issValue: emitter.iss ?? 0.0,
      incidenceMunicipality: emitter.cityCode?.toString(),
      pisValue: emitter.pis ?? 0.0,
      serviceItemList: emitter.serviceItemList,
      municipalTaxationCode: emitter.municipalTaxationCode,
      issExigibility: emitter.issExigibility ?? 0,
    };

    Object.assign(this.props, fieldsToUpdate);
    this.props.updatedAt = new Date();
    FiscalServiceEntity.validate(this.props);
  }

  get serviceValue() {
    return this.props.serviceValue;
  }

  get deductionValue() {
    return this.props.deductionValue;
  }

  get pisValue() {
    return this.props.pisValue;
  }

  get cofinsValue() {
    return this.props.cofinsValue;
  }

  get inssValue() {
    return this.props.inssValue;
  }

  get irValue() {
    return this.props.irValue;
  }

  get csllValue() {
    return this.props.csllValue;
  }

  get otherRetentions() {
    return this.props.otherRetentions;
  }

  get totalTributesValue() {
    return this.props.totalTributesValue;
  }

  get issValue() {
    return this.props.issValue;
  }

  get rate() {
    return this.props.rate;
  }

  get nbsCode() {
    return this.props.nbsCode;
  }

  get unconditionalDiscount() {
    return this.props.unconditionalDiscount;
  }

  get conditionalDiscount() {
    return this.props.conditionalDiscount;
  }

  get issWithheld() {
    return this.props.issWithheld;
  }

  get serviceItemList() {
    return this.props.serviceItemList;
  }

  get cnaeCode() {
    return this.props.cnaeCode;
  }

  get municipalTaxationCode() {
    return this.props.municipalTaxationCode;
  }

  get serviceDescription() {
    return this.props.serviceDescription;
  }

  get municipalityCode() {
    return this.props.municipalityCode;
  }

  get issExigibility() {
    return this.props.issExigibility;
  }

  get incidenceMunicipality() {
    return this.props.incidenceMunicipality;
  }

  get externalPlanCode() {
    return this.props.externalPlanCode;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static validate(props: FiscalServiceProps) {
    const validator = FiscalServiceValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      console.log('FiscalServiceEntity.validate', validator.errors);
      throw new EntityValidationError(validator.errors);
    }
  }
}
