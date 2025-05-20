const rssFeedUrl = "https://rss.app/feeds/i9XYWf2Y7v2eV4fG.xml";

async function loadVideos() {
  try {
    const res = await fetch(rssFeedUrl);
    const data = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const items = xml.querySelectorAll("item");

    const featuredContainer = document.getElementById("featured-video");
    const feedContainer = document.getElementById("video-feed");

    items.forEach((item, index) => {
      const title = item.querySelector("title")?.textContent;
      const link = item.querySelector("link")?.textContent;
      const pubDate = new Date(item.querySelector("pubDate")?.textContent);
      const videoId = link?.split("/").pop();

      if (videoId) {
        const card = document.createElement("div");
        card.className = "video-card";

        const iframe = document.createElement("iframe");
        iframe.src = `https://rumble.com/embed/${videoId}/`;
        iframe.allowFullscreen = true;

        const h3 = document.createElement("h3");
        h3.textContent = title;

        const p = document.createElement("p");
        p.textContent = pubDate.toLocaleDateString();

        card.appendChild(iframe);
        card.appendChild(h3);
        card.appendChild(p);

        if (index === 0) {
          featuredContainer.appendChild(card);
        } else {
          feedContainer.appendChild(card);
        }
      }
    });
  } catch (error) {
    console.error("Failed to load RSS feed:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadVideos);
