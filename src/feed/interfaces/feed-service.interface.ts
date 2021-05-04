export interface IFeedService {
  fetchFeeds: () => Promise<any[]>;
  fetchFeed: () => Promise<any>;
  deleteFeed: () => Promise<boolean>;
}
