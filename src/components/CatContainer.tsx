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
  }, [videoEl]);

  if (isLoading) return <>Laster inn katten...</>;

  if (error) return <>Could not fetch the cat! :(</>;
  const { url, post_hint } = data;
  const hasImageExt = imageExtRegExp.test(url);
  const hasVideo = data?.media?.reddit_video ?? false;

  if (!hasVideo && post_hint !== "image" && !hasImageExt) {
    refetch();
  }

  return (
    <div className="cat-container">
      <InfoBar data={data} />
      {hasVideo && (
        <video autoPlay loop muted ref={videoEl}>
          <source
            src={data?.media?.reddit_video.fallback_url}
            type="video/mp4"
          />
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
