import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

type GalleryJson = { images: string[] };

function TypeSubtitle({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [text]);
  return <div className="brand__sub brand__sub--script">{shown}</div>;
}

function useInterval(callback: () => void, delayMs: number | null) {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; }, [callback]);
  useEffect(() => {
    if (delayMs === null) return;
    const id = setInterval(() => saved.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}

function GalleryCarousel() {
  const [images, setImages] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    fetch("/assets/gallery/gallery.json", { cache: "no-store" })
      .then(r => r.json() as Promise<GalleryJson>)
      .then(data => setImages(Array.isArray(data.images) ? data.images : []))
      .catch(() => setImages([]));
  }, []);

  const hasImages = images.length > 0;
  const current = hasImages ? images[idx % images.length] : "";

  useInterval(() => {
    if (!hasImages || paused) return;
    setIdx(i => (i + 1) % images.length);
  }, 3000);

  const next = () => hasImages && setIdx(i => (i + 1) % images.length);
  const prev = () => hasImages && setIdx(i => (i - 1 + images.length) % images.length);

return (
      <div
      className="gallery"
      style={hasImages ? ({ ["--bg" as any]: `url("${current}")` } as any) : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
	>

      {!hasImages ? (
        <div className="gallery__empty">
          <p>Gallery loading…</p>
        </div>
      ) : (
        <>
          <img className="gallery__img" src={current} alt="Guided fishing trip photo" loading="lazy" onError={() => setIdx(i => (i + 1) % (images.length || 1))} />
          <div className="gallery__controls">
            <button onClick={prev} aria-label="Previous photo">‹</button>
            <div className="gallery__meta">
              <span>{idx + 1} / {images.length}</span>
            </div>
            <button onClick={next} aria-label="Next photo">›</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const phone = "936-239-1100";
  const tel = useMemo(() => `tel:${phone.replace(/[^0-9+]/g, "")}`, [phone]);

  return (
    <div className="page">
<header className="header">
  <div className="header__inner">
    <div className="brand">
      <div>
        <div className="brand__name">Huson Outdoors</div>
        <TypeSubtitle text="Guided Fishing • Since 2010" />
      </div>
    </div>

    <img
      className="header__logo"
      src="/assets/brand/logo-header.svg"
      alt="Huson Outdoors Guided Fishing"
    />

    <nav className="nav">
      <a href="#services">Services</a>
      <a href="#gallery">Gallery</a>
      <a href="#season">Season</a>
      <a href="#contact">Contact</a>
    </nav>

    <a className="call" href={tel}>Call {phone}</a>
  </div>
</header>
      <main>
        <section className="hero" style={{ backgroundImage: `url("/assets/hero/hero.webp?v=2")` }}>
          <div className="hero__inner">
            <div className="hero__copy">
              <h3>Lake Livingston Guided Trips</h3>
              <p className="hero__lead">
                 Lake Livingston guided trips — morning or afternoon. All tackle and bait supplied.
              </p>

              <div className="chips">
                <span>Top 3 Polk County guide services (last 3 years)</span>
                <span>Custom-built boats</span>
                <span>Custom-built lures</span>
              </div>

              <div className="hero__cta">
                <a className="btn btn--primary" href={tel}>Spots fill up fast — Book today!</a>
                <a className="btn btn--ghost" href="#gallery">View Trip Photos</a>
              </div>
            </div>

            <div className="hero__card">
              <div className="hero__cardTitle">Target Species</div>
              <ul className="list">
                <li>White Bass</li>
                <li>Catfish</li>
                <li>Striped Bass</li>
                <li>Alligator Gar</li>
              </ul>

              <div className="hero__cardTitle">Season</div>
              <p className="muted">Open mid March through Sept 1.</p>
            </div>
          </div>
        </section>

         <section id="gallery" className="section section--wide">
          <div className="container">
            <h2>Gallery</h2>
            <p className="muted">The Spoils!</p>
          </div>
          <div className="container">
  <GalleryCarousel />
</div>
        </section>

        <section id="season" className="section">
          <div className="container">
            <h2>Season & What’s Included</h2>
            <div className="grid">
              <div className="panel">
                <h3>Open Season</h3>
                <p>Mid March through Sept 1.</p>
              </div>
              <div className="panel">
                <h3>Included</h3>
                <p>All tackle and bait supplied. Custom-built boats and lures.</p>
              </div>
              <div className="panel">
                <h3>Recognition</h3>
                <p>Voted Top 3 guide services in Polk County for the last three years.</p>
              </div>
            </div>

              <div className="promo">
                <div className="promo__left">
                  <img className="promo__logo" src="/assets/partners/whitebass.jpg" alt="Whitebass Lures" />
                  <div>
                    <h3>Whitebass Lures</h3>
                    <p className="muted">We build and fish custom White Bass gear. Website coming soon.</p>

                    <div className="lures">
                      <img src="/assets/partners/lures/lure-1.webp" alt="Whitebass lure 1" loading="lazy" />
                      <img src="/assets/partners/lures/lure-2.webp" alt="Whitebass lure 2" loading="lazy" />
                      <img src="/assets/partners/lures/lure-3.webp" alt="Whitebass lure 3" loading="lazy" />
                    </div>
                  </div>
                </div>

                <img className="promo__logo" src="/assets/partners/stay-baited.png" alt="Stay-Baited" />
        	</div>      
	</div>

</section>

<section id="services" className="section">
          <div className="container">
            <h2>Services</h2>
            <div className="cards">
              <div className="card">
                <h3>Morning Trip</h3>
                <p>Fully guided morning trip with tackle and bait supplied.</p>
                <ul className="list">
                  <li>Boat + guide included</li>
                  <li>Custom gear & lures</li>
                  <li>Great for families and groups</li>
                </ul>
                <a className="btn btn--primary" href={tel}>Call to Reserve</a>
              </div>

              <div className="card">
                <h3>Afternoon Trip</h3>
                <p>Afternoon trips available — great for flexible schedules.</p>
                <ul className="list">
                  <li>All tackle & bait supplied</li>
                  <li>Target seasonal patterns</li>
                  <li>Local knowledge since 2010</li>
                </ul>
                <a className="btn btn--primary" href={tel}>Call to Reserve</a>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="section section--cta">
          <div className="container cta">
            <div>
              <h2>Spots fill up fast — Book today!</h2>
              <p className="muted">Call now to lock in your morning or afternoon trip during the season.</p>
            </div>
            <a className="btn btn--primary" href={tel}>Call {phone}</a>
          </div>
        </section>

          <footer className="footer">
            <div className="container footer__inner">
              <div className="muted">© {new Date().getFullYear()} Lake Area LLC</div>
              <a className="footer__phone" href={tel}>{phone}</a>
            </div>
          </footer>
        </main>
      </div>
    );
  }
