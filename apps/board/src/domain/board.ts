import { BaseObject } from '@lib/type';

type Props = {
  id?: number;
  name: string;
  isHidden: boolean;
  createdDate?: Date;
  updatedDate?: Date;
};

export class Board extends BaseObject<Props> {
  getId() {
    return this.props.id;
  }

  getName() {
    return this.props.name;
  }

  getIsHidden() {
    return this.props.isHidden;
  }

  getCreatedDate() {
    return this.props.createdDate;
  }

  getUpdatedDate() {
    return this.props.updatedDate;
  }
}
