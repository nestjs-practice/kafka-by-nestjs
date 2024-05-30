import { BaseObject, Optional } from '@lib/type';
import { CreateUserDto } from '@lib/shared';
import { PasswordUtil } from '@lib/util';

type Props = {
  id?: Optional<number>;
  email: string;
  password: string;
  createdDate?: Date;
  updatedDate?: Date;
};

export class UserAccount extends BaseObject<Props> {
  static empty() {
    return new UserAccount({
      email: '',
      password: '',
    });
  }

  static create(userId: number, dto: CreateUserDto) {
    return new UserAccount({
      id: userId,
      email: dto.email,
      password: PasswordUtil.hashPassword(dto.password),
    });
  }

  update(dto: CreateUserDto) {
    this.setProps({
      email: dto.email ? dto.email : this.props.email,
      password: dto.password ? PasswordUtil.hashPassword(dto.password) : this.props.password,
    });
  }

  getId() {
    return this.props.id;
  }

  setId(id: number) {
    this.setProps({
      id,
    });
  }

  getEmail() {
    return this.props.email;
  }

  getPassword() {
    return this.props.password;
  }

  getCreatedDate() {
    return this.props.createdDate;
  }

  getUpdatedDate() {
    return this.props.updatedDate;
  }
}
