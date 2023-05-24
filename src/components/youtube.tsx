import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

export default function Youtube() {
  const opts: YouTubeProps["opts"] = {
    height: "180",
    width: "314",
  };

  return <YouTube videoId="8wi4gXSRvH8" opts={opts} />;
}
