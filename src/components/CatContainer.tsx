import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import getCats from "../util/getCats";
import InfoBar from "./InfoBar";

const imageExtRegExp = /(.*)\.[png|jpg|jpeg|gif]$/gim;

export default function CatContainer() {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["catRepo"],
    queryFn: getCats,
  });

  useEffect(() => {
    if (!videoEl?.current) {
      return;
    }
    videoEl.current.play();
  }, [videoEl, data]);

  useEffect(() => {
    const timerId = setTimeout(refetch, 30000);
    return () => clearTimeout(timerId);
  }, [refetch, data]);

  if (isLoading) return <>Laster inn katten...</>;

  if (error) return <>Could not fetch the cat! :(</>;

  if (!data) {
    refetch();
    return null;
  }

  const { url, post_hint, media, gallery_data } = data;
  const hasImageExt = imageExtRegExp.test(url);
  const hasVideo = media?.reddit_video ?? false;

  if (!hasVideo && post_hint !== "image" && !hasImageExt) {
    refetch();
  }

  if (!hasVideo && !url) {
    refetch();
  }

  // Todo: Fix this! Gallery data contains "mediaId" - I do not know how to get the media!
  if (gallery_data) {
    refetch(); // If its a gallery we simply refetch to get something else for now
  }

  return (
    <div className="cat-container">
      <InfoBar data={data} />
      {hasVideo && (
        <video
          key={media.reddit_video?.fallback_url}
          autoPlay
          loop
          muted
          ref={videoEl}
        >
          <source src={media.reddit_video?.fallback_url} type="video/mp4" />
        </video>
      )}

      {url && !hasVideo && (
        <img
          src={url}
          className="cat-image"
          alt="A top uvoted cat from reddit"
        />
      )}
    </div>
  );
}
