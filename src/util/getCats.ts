type interval = "hour" | "day" | "week" | "month" | "year";
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

export default async function getCats() {
  const subredditData = await fetch(
    `https://www.reddit.com/r/${getSubReddit()}/top.json?limit=1&t=${postInterval}`
  ).then((response) => response.json());
  const [topUpvoted = {}] = subredditData?.data?.children ?? [];
  return topUpvoted?.data ?? {};
}

function getSubReddit(): string {
  const index = Math.floor(Math.random() * subreddits.length) + 0;
  return subreddits[index];
}
