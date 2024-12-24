export class Entity<Props = any> {
  protected _props: Props;
  constructor(props: Props) {
    this._props = props;
  }

  get props(): Props {
    return this._props;
  }
}
