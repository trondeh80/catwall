import { interval, RedditPostData, RedditPostResponse } from "./types";

// Interval of time measurement for top upvoted post.
const postInterval: interval = "hour";

const subreddits: string[] = [
  "thisismylifemeow",
  "supermodelcats",
  "aww",
  "MEOW_IRL",
  "Catculations",
  "tuckedinkitties",
  "catsbeingcats",
  "chonkers",
  "cattaps",
  "mildlystartledcats",
  "catslaps",
  "delightfullychubby",
  "WhatsWrongWithYourCat",
  "StartledCats"
]

export default async function getCats(): Promise<RedditPostData> {
  const subredditData: RedditPostResponse = await fetch(
    `https://www.reddit.com/r/${getSubReddit()}/top.json?limit=1&t=${postInterval}`
  ).then((response) => response.json());
  const [topUpvoted] = subredditData?.data?.children ?? [];
  return topUpvoted?.data ?? {};
}

function getSubReddit(): string {
  const index = Math.floor(Math.random() * subreddits.length);
  return subreddits[index];
}
