import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import getCats from "../util/getCats";

export default function CatContainer() {
  const videoEl = useRef<HTMLVideoElement | null>(null);
  const { isLoading, error, data } = useQuery({
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

  if (data?.media?.reddit_video) {
    const { fallback_url } = data.media.reddit_video;
    return (
      <>
        <video autoPlay loop ref={videoEl}>
          <source src={fallback_url} type="video/mp4" />
        </video>
      </>
    );
  }

  if (data.url) {
    return (
      <>
        <img
          src={data.url}
          className="cat-image"
          alt="A top uvoted cat from reddit"
        />
      </>
    );
  }
  return null;
}
