// src/components/WallpaperBar.jsx

// Curated static list of thumbnails to show in the bar.
// You can include all 32 teams, or pick ~12–18 for performance.
const WALLPAPER_THUMBS = [
  "/backgrounds/thumbs/1080x1920/tor.webp",
  "/backgrounds/thumbs/1080x1920/mtl.webp",
  "/backgrounds/thumbs/1080x1920/edm.webp",
  "/backgrounds/thumbs/1080x1920/nyr.webp",
  "/backgrounds/thumbs/1080x1920/bos.webp",
  "/backgrounds/thumbs/1080x1920/vgk.webp",
  "/backgrounds/thumbs/1080x1920/van.webp",
  "/backgrounds/thumbs/1080x1920/ott.webp",
  "/backgrounds/thumbs/1080x1920/chi.webp",
  "/backgrounds/thumbs/1080x1920/fla.webp",
  "/backgrounds/thumbs/1080x1920/tbl.webp",
  "/backgrounds/thumbs/1080x1920/sea.webp",
  // … add more as you like
];

export default function WallpaperBar({ speed = 20, height = 110 }) {
  const style = {
    "--wpbar-height": `${height}px`,
    "--wpbar-duration": `${speed}s`,
  };

  return (
    <div className="wallpaper-bar" style={style} aria-hidden="true">
      <div className="wallpaper-track">
        {WALLPAPER_THUMBS.map((src, i) => (
          <div className="wallpaper-tile" key={`a-${i}`}>
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        ))}
      </div>
      {/* duplicate for seamless looping */}
      <div className="wallpaper-track">
        {WALLPAPER_THUMBS.map((src, i) => (
          <div className="wallpaper-tile" key={`b-${i}`}>
            <img
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
