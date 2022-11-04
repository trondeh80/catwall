type interval = "day" | "week" | "month" | "year";
const subreddit: string = "thisismylifemeow";
const interval: interval = "day";

export default async function getCats() {
  const subredditData = await fetch(
    `https://www.reddit.com/r/${subreddit}/top.json?limit=1&t=${interval}`
  ).then((response) => response.json());
  const [topUpvoted = {}] = subredditData?.data?.children ?? [];
  return topUpvoted?.data ?? {};
}
