declare namespace API {
  interface IYtbSimplifySnippet {
    kind: string;
    etag: string;
    items: {
      id: string;
      snippet: {
        title: string;
        description: string;
        thumbnails: {
          standard?: {
            url: string;
          };
          high?: {
            url: string;
          };
          medium?: {
            url: string;
          };
          default: {
            url: string;
          };
        };
      };
    }[];
  }
}
