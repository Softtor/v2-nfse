import { Entity } from '@/shared/domain/entities/entity';
import { FiscalEmitterValidatorFactory } from '../validators/fiscal-emitter.validator';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { AddressEntity } from '@/nfse/domain/entities/address.entity';

export interface FiscalEmitterProps {
  name: string;
  document: string;
  email?: string;
  phone?: string;
  nickname?: string;
  address: AddressEntity;
  city?: string;
  crt?: string;
  ie?: string;
  im: string;
  cnaeCode?: string;
  activityCode?: string;
  aliquot?: number;
  iss?: number;
  cofins?: number;
  csll?: number;
  inss?: number;
  ir?: number;
  pis?: number;
  issWithheld?: number;
  serviceItemList?: string;
  municipalTaxationCode?: string;
  issEligibility?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FiscalEmitterEntity extends Entity<FiscalEmitterProps> {
  constructor(props: FiscalEmitterProps, id?: string | number) {
    FiscalEmitterEntity.validate(props);
    super(
      {
        ...props,
        aliquot: props.aliquot ?? 0.0,
        iss: props.iss ?? 0.0,
        cofins: props.cofins ?? 0.0,
        csll: props.csll ?? 0.0,
        inss: props.inss ?? 0.0,
        ir: props.ir ?? 0.0,
        pis: props.pis ?? 0.0,
        issWithheld: props.issWithheld ?? 2,
        issEligibility: props.issEligibility ?? 0,
      },
      id,
    );
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
  }

  update(value: Partial<FiscalEmitterProps>): void {
    if (value.createdAt) {
      delete value.createdAt;
    }

    if (value.address) {
      this.props.address = this.updateAddress(value.address);
    }

    Object.assign(this.props, {
      ...value,
      aliquot: value.aliquot ?? this.props.aliquot,
      iss: value.iss ?? this.props.iss,
      cofins: value.cofins ?? this.props.cofins,
      csll: value.csll ?? this.props.csll,
      inss: value.inss ?? this.props.inss,
      ir: value.ir ?? this.props.ir,
      pis: value.pis ?? this.props.pis,
      issWithheld: value.issWithheld ?? this.props.issWithheld,
      issEligibility: value.issEligibility ?? this.props.issEligibility,
    });
    this.props.updatedAt = new Date();
    FiscalEmitterEntity.validate(this.props);
  }

  private updateAddress(value: Partial<AddressEntity>): AddressEntity {
    const currentAddress = this.props.address;
    const updatedAddressProps = {
      address: value.address ?? currentAddress.address,
      number: value.number ?? currentAddress.number,
      complement: value.complement ?? currentAddress.complement,
      neighborhood: value.neighborhood ?? currentAddress.neighborhood,
      municipalityCode:
        value.municipalityCode ?? currentAddress.municipalityCode,
      state: value.state ?? currentAddress.state,
      postalCode: value.postalCode ?? currentAddress.postalCode,
    };

    return new AddressEntity(updatedAddressProps);
  }

  static validate(props: FiscalEmitterProps) {
    const validator = FiscalEmitterValidatorFactory.create();
    const isValid = validator.validate({
      ...props,
      address: props.address.props,
    });

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get document() {
    return this.props.document;
  }

  private set document(value: string) {
    this.props.document = value;
  }

  get email() {
    return this.props.email;
  }

  private set email(value: string) {
    this.props.email = value;
  }

  get nickname() {
    return this.props.nickname;
  }

  private set nickname(value: string) {
    this.props.nickname = value;
  }

  get address() {
    return this.props.address;
  }

  private set address(value: AddressEntity) {
    this.props.address = value;
  }

  get city() {
    return this.props.city;
  }

  private set city(value: string) {
    this.props.city = value;
  }

  get crt() {
    return this.props.crt;
  }

  private set crt(value: string) {
    this.props.crt = value;
  }

  get ie() {
    return this.props.ie;
  }

  private set ie(value: string) {
    this.props.ie = value;
  }

  get im() {
    return this.props.im;
  }

  private set im(value: string) {
    this.props.im = value;
  }

  get cnaeCode() {
    return this.props.cnaeCode;
  }

  private set cnaeCode(value: string) {
    this.props.cnaeCode = value;
  }

  get activityCode() {
    return this.props.activityCode;
  }

  private set activityCode(value: string) {
    this.props.activityCode = value;
  }

  get aliquot() {
    return this.props.aliquot;
  }

  private set aliquot(value: number) {
    this.props.aliquot = value;
  }

  get iss() {
    return this.props.iss;
  }

  private set iss(value: number) {
    this.props.iss = value;
  }

  get phone() {
    return this.props.phone;
  }

  private set phone(value: string) {
    this.props.phone = value;
  }

  get cofins() {
    return this.props.cofins;
  }

  private set cofins(value: number) {
    this.props.cofins = value;
  }

  get csll() {
    return this.props.csll;
  }

  private set csll(value: number) {
    this.props.csll = value;
  }

  get inss() {
    return this.props.inss;
  }

  private set inss(value: number) {
    this.props.inss = value;
  }

  get ir() {
    return this.props.ir;
  }

  private set ir(value: number) {
    this.props.ir = value;
  }

  get pis() {
    return this.props.pis;
  }

  private set pis(value: number) {
    this.props.pis = value;
  }

  get issWithheld() {
    return this.props.issWithheld;
  }

  private set issWithheld(value: number) {
    this.props.issWithheld = value;
  }

  get issEligibility() {
    return this.props.issEligibility;
  }

  private set issEligibility(value: number) {
    this.props.issEligibility = value;
  }

  get serviceItemList() {
    return this.props.serviceItemList;
  }

  private set serviceItemList(value: string) {
    this.props.serviceItemList = value;
  }

  get municipalTaxationCode() {
    return this.props.municipalTaxationCode;
  }

  private set municipalTaxationCode(value: string) {
    this.props.municipalTaxationCode = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
