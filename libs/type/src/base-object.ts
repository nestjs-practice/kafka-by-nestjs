type Props = {
  [key: string]: any;
};

export class BaseObject<T extends Props> {
  public constructor(protected _props: T) {}

  public get props(): Readonly<T> {
    return this._props;
  }

  get<TKey extends keyof T>(key: TKey): T[TKey] {
    return this.props[key];
  }

  protected set(props: Partial<T>): this {
    Object.keys(props).forEach((prop: keyof T) => {
      this._props[prop] = props[prop] as T[typeof prop];
    });

    return this;
  }

  protected setProps(props: Partial<T>): this {
    return this.set(props);
  }
}
