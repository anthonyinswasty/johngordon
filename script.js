
async function updateLatestVideo() {
  try {
    const response = await fetch('https://rss.app/feeds/i9XYWf2Y7v2eV4fG.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    const firstItem = xml.querySelector('item');
    const videoLink = firstItem.querySelector('link').textContent;

    const embedUrl = videoLink.includes("rumble.com") 
      ? videoLink.replace("/watch/", "/embed/").replace("rumble.com/", "rumble.com/embed/") 
      : videoLink;

    document.getElementById('latest-video').src = embedUrl;
  } catch (error) {
    console.error("Error loading video:", error);
  }
}

window.onload = updateLatestVideo;
