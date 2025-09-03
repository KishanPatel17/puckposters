// use memo creates a cache of an array so the expensive calc doesn't need to constantly run
import { useMemo } from "react";
import { teamMeta } from "../data/teamMeta";

export default function WallpaperBar({ speed = 20, height = 110 }) {
  // Collect wallpaper URLs from teamMeta
  const wallpapers = useMemo(() => {
    const urls = Object.values(teamMeta)
      .map((t) => t.bg)
      .filter(Boolean);
    // Optional: de-dupe
    return Array.from(new Set(urls));
  }, []);

  // CSS vars let you tweak speed/height from props
  const style = {
    "--wpbar-height": `${height}px`,
    "--wpbar-duration": `${speed}s`,
  };

  if (!wallpapers.length) return null;

  return (
    <div className="wallpaper-bar" style={style} aria-hidden="true">
      <div className="wallpaper-track">
        {wallpapers.map((src, i) => (
          <div className="wallpaper-tile" key={`a-${i}`}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
      {/* duplicate for seamless loop */}
      <div className="wallpaper-track">
        {wallpapers.map((src, i) => (
          <div className="wallpaper-tile" key={`b-${i}`}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
