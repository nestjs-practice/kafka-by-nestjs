import { BaseObject } from '@lib/type';

type Props = {
  userId: number;
  articleCount: number;
  updatedDate?: Date;
};

export class UserAnalytics extends BaseObject<Props> {
  static empty(userId: number) {
    return new UserAnalytics({
      userId,
      articleCount: 0,
    });
  }

  getUserId() {
    return this.props.userId;
  }

  getArticleCount() {
    return this.props.articleCount;
  }

  setArticleCountUp() {
    this.setProps({
      articleCount: this.props.articleCount + 1,
      updatedDate: new Date(),
    });
  }

  setArticleCountDown() {
    this.setProps({
      articleCount: this.props.articleCount - 1,
      updatedDate: new Date(),
    });
  }

  getUpdatedDate() {
    return this.props.updatedDate;
  }
}
