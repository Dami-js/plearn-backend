export interface IFeedController {
  getFeeds: (queries: { q: string; learningStyle: string }) => Promise<any[]>;
  getFeed: (params: { title: string }) => Promise<any>;
  removeFeed: (id: string) => Promise<any>;
}
