export type interval = "hour" | "day" | "week" | "month" | "year";

export type RedditPostData = {
    url: string;
    post_hint: string; 
    media: {
      reddit_video?: {
        fallback_url: string
      }
    },
    title: string;
    subreddit: string;
    gallery_data ?: {
        items:[]
    }
}

export type RedditPost = {
 data: RedditPostData
};

export type RedditPostResponse = {
  data: { 
    children: RedditPost[]
  }
}
