(() => {
  // ns-params:@params
  var params = { algolia: { appid: "QJKQYZKQ1F", appkey: "5fa0a426a84ac1a01a1b46b1c2b75bbd", enabled: true, searchindex: "infotrendspot_blog_articles" }, js: [{ url: "snap-gallery.js" }, { url: "instantsearch.min.js" }], keywords: ["InfoTrendSpot", "infotrendspot.org", "infotrendspot. org", "infotrendspot. com", "news", "live news", "big news", "world news", "technology"], mydomain: "https://infotrendspot.org/", showcopyright: true };

  // <stdin>
  var { appid, appkey, searchindex: indexName, enabled } = params.algolia;
  var searchClient = algoliasearch(appid, appkey);
  var { autocomplete, getAlgoliaResults } = window["@algolia/autocomplete-js"];
  function initAlgolia() {
    autocomplete({
      container: "#autocomplete",
      getSources({ query }) {
        return [
          {
            sourceId: "products",
            getItems() {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName,
                    query,
                    params: {
                      attributesToSnippet: ["headline:10", "description:35"]
                    }
                  }
                ]
              });
            },
            templates: {
              item({ item, components, html }) {
                return html`<div class="aa-ItemWrapper">
                <div class="aa-ItemContent">
                  
                  <div class="aa-ItemContentBody">
                    <div class="aa-ItemContentTitle">
                      ${components.Highlight({
                  hit: item,
                  attribute: "headline"
                })}
                    </div>
                    <a class="aa-ItemContentDescription" href="${item.url}">
                      ${components.Snippet({
                  hit: item,
                  attribute: "description"
                })}
                    </a>
                  </div>
                  <div class="aa-ItemActions">
                    <button
                      class="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                      type="button"
                      title="Select"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="currentColor"
                      >
                        <path
                          d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>`;
              }
            }
          }
        ];
      }
    });
    document.querySelector("#autocomplete input").focus();
  }
  if (enabled) {
    initAlgolia();
  }
})();
