document.addEventListener("DOMContentLoaded", function() {
  const rssFeedUrl = "https://rss.app/feeds/i9XYWf2Y7v2eV4fG.xml";

  fetch(rssFeedUrl)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const items = data.querySelectorAll("item");
      let html = "";
      items.forEach(el => {
        const title = el.querySelector("title").textContent;
        const link = el.querySelector("link").textContent;
        const description = el.querySelector("description").textContent;
        html += `
          <div class="video-item">
            <h2><a href="${link}" target="_blank">${title}</a></h2>
            ${description}
          </div>
        `;
      });
      document.getElementById("rss-feed").innerHTML = html;
    });
});
