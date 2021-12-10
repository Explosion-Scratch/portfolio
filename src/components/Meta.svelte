<script>
  export let settings = {
    title: "--Explosion--",
    author: "Explosion-Scratch",
    description: "Hello, I'm --Explosion--, a fullstack JavaScript developer",
    color: "#54ed26",
    image:
      "https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg",
  };
  const generate = (meta) => {
    return [
      { charset: "utf-8" },
      { lang: "en" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      { name: "title", content: meta.title },
      { name: "author", content: meta.author },
      {
        name: "keywords",
        content: meta.keywords || "",
      },
      { name: "robots", content: "index,follow" },
      { name: "language", content: "English" },
      { name: "description", content: meta.description },
      { name: "theme-color", content: meta.color },
      { name: "og:type", content: "website" },
      { name: "apple-mobile-web-app-title", content: meta.title },
      { name: "og_site_name", content: meta.site || meta.title },
      { name: "og:site_name", content: meta.site || meta.title },
      { name: "og:locale", content: "en_US" },
      { name: "og:url", content: meta.url },
      { name: "og:title", content: meta.title },
      { name: "og:description", content: meta.description },
      { name: "og:image", content: meta.image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: meta.url },
      { name: "twitter:title", content: meta.title },
      { name: "twitter:description", content: meta.description },
      { name: "twitter:image", content: meta.image },
    ]
      .map((i) => {
        var out = { ...i };
        if (!out.hid) {
          out.hid = out.name;
        }
        return out;
      })
      .map(
        (i) =>
          `<meta name=${JSON.stringify(i.name)} content=${JSON.stringify(
            i.content
          )}/>`
      )
      .join("\n");
  };
  let metaHTML = generate(settings);
</script>

{@html metaHTML}
