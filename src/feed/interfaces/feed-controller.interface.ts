export interface IFeedController {
  getFeeds: () => Promise<any[]>;
  getFeed: () => Promise<any>;
  deleteFeed: () => Promise<boolean>;
}
