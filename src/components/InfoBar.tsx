import { RedditPostData } from "../util/types";
import "./InfoBar.css";

type PropTypes = {
  data: RedditPostData;
};

export default function InfoBar({ data }: PropTypes) {
  const { title, subreddit } = data;

  return (
    <div className="info-bar">
      <div className="info-bar-content">
        <h2>{title}</h2>
        <p>r/{subreddit}</p>
      </div>
    </div>
  );
}
