if (!self.define) {
  let e,
    s = {};
  const t = (t, i) => (
    (t = new URL(t + ".js", i).href),
    s[t] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = t), (e.onload = s), document.head.appendChild(e);
        } else (e = t), importScripts(t), s();
      }).then(() => {
        let e = s[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const a =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[a]) return;
    let r = {};
    const c = (e) => t(e, a),
      u = { module: { uri: a }, exports: r, require: c };
    s[a] = Promise.all(i.map((e) => u[e] || c(e))).then((e) => (n(...e), r));
  };
}
define(["./workbox-e9849328"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "055fd6cca7045a2ed41331b9c4d4031d",
        },
        {
          url: "/_next/static/chunks/144-34e13c50bbd7703b.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/1b7bc3a5-b860a2b1606e0314.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/215-5360cf8600cf49a2.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/225-b24e6e526a3e2486.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/238-15cb0de8350ec089.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/24-844769aa7f440d1d.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/251-5ae22f6866a87f02.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/271-551b0c4dcfa2d489.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/39eaf34b-8c91de695d552c1f.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/3b6143f6-45d426f9859a5f2b.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/40-fa4457c588b52934.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/43abe07a-e7e7a238d91fc786.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/44150630-ba21f4f3468498f7.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/491-c2c292df746e2d7b.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/534-5aa25c5870bf0465.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/562-e5aabcb360e0987e.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/706-88e4fca520e0229d.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/785-f16816254955508a.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/798-1498a6824f673d4e.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/842892ce-cc2a27afbc517fa4.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/86cb00e6-e65ac3fece2b9c01.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/8f130de0-8e7d053529e1877c.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/907-1f1bd8d80731783d.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/93-11c03dae352c63f4.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-456aac3be5abec80.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/checkout/page-8783b9e71bb2d1ce.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/layout-66a03472c233d112.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/my-shop/page-0b1f1c46efb06496.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/orders/page-afa9e98ff9736483.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/page-048d31fe647b1c88.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/products/%5Bid%5D/page-ef948f6d0d577a95.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/products/page-f645e065f9a190ba.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/signin/page-6d311a2605c7421a.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/app/signup/page-54be16c474be2ffd.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/e9700330-1151880a4075894d.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/fca6a955-78ed533fe47a1295.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/framework-6e06c675866dc992.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/main-app-7bca139c02de5b92.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/main-b7a62c07b8a344a4.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/pages/_app-3736b0c7f2bb2fa9.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/pages/_error-a1633587b446cc13.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-4a2db4c86437d7ba.js",
          revision: "jkJ0Ks3eruviy0SBQKd4u",
        },
        {
          url: "/_next/static/css/bb558686a5ae0231.css",
          revision: "bb558686a5ae0231",
        },
        {
          url: "/_next/static/jkJ0Ks3eruviy0SBQKd4u/_buildManifest.js",
          revision: "3ad2f03d74fb0f0fe057e2dc0d2966de",
        },
        {
          url: "/_next/static/jkJ0Ks3eruviy0SBQKd4u/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/media/861bdc7038a6624b-s.p.ttf",
          revision: "a98626e1aef6ceba5dfc1ee7112e235a",
        },
        {
          url: "/_next/static/media/fashion.c72d1e9a.webp",
          revision: "4473656cd214c60e2bf6556e4c6c551f",
        },
        {
          url: "/_next/static/media/gedgets.a4457e9f.webp",
          revision: "4f051eb73023d83df879f36b73892bf1",
        },
        {
          url: "/_next/static/media/home-living.0e8d1fd8.webp",
          revision: "775aa8de46c31bdc396f3e54ccf08f3e",
        },
        {
          url: "/_next/static/media/personal-care.ce18b709.webp",
          revision: "6b2ba4e1d34afb8d042d0ca582b7a62f",
        },
        {
          url: "/_next/static/media/quick-basket.65bd6610.png",
          revision: "40f39ffa5e508c06e8e33eb0df42f6cd",
        },
        {
          url: "/_next/static/media/shop-removebg-preview.626979ea.png",
          revision: "3e252e4168077be6260c16875dcca163",
        },
        {
          url: "/fonts/montserrat/Montserrat-Black.ttf",
          revision: "6d1796a9f798ced8961baf3c79f894b6",
        },
        {
          url: "/fonts/montserrat/Montserrat-BlackItalic.ttf",
          revision: "b5331c5f5aae974d18747a94659ed002",
        },
        {
          url: "/fonts/montserrat/Montserrat-Bold.ttf",
          revision: "88932dadc42e1bba93b21a76de60ef7a",
        },
        {
          url: "/fonts/montserrat/Montserrat-BoldItalic.ttf",
          revision: "781190aecb862fffe858d42b124658cc",
        },
        {
          url: "/fonts/montserrat/Montserrat-ExtraBold.ttf",
          revision: "9bc77c3bca968c7490de95d1532d0e87",
        },
        {
          url: "/fonts/montserrat/Montserrat-ExtraBoldItalic.ttf",
          revision: "09a2d2564ea85d25a3b3a7903159927b",
        },
        {
          url: "/fonts/montserrat/Montserrat-ExtraLight.ttf",
          revision: "38bc5e073a0692a4eddd8e61c821d57a",
        },
        {
          url: "/fonts/montserrat/Montserrat-ExtraLightItalic.ttf",
          revision: "6885cd4955ecc64975a122c3718976c1",
        },
        {
          url: "/fonts/montserrat/Montserrat-Italic.ttf",
          revision: "6786546363c0261228fd66d68bbf27e9",
        },
        {
          url: "/fonts/montserrat/Montserrat-Light.ttf",
          revision: "100b38fa184634fc89bd07a84453992c",
        },
        {
          url: "/fonts/montserrat/Montserrat-LightItalic.ttf",
          revision: "428b2306e9c7444556058c70822d7d7c",
        },
        {
          url: "/fonts/montserrat/Montserrat-Medium.ttf",
          revision: "a98626e1aef6ceba5dfc1ee7112e235a",
        },
        {
          url: "/fonts/montserrat/Montserrat-MediumItalic.ttf",
          revision: "287208c81e03eaf08da630e1b04d80e8",
        },
        {
          url: "/fonts/montserrat/Montserrat-Regular.ttf",
          revision: "9c46095118380d38f12e67c916b427f9",
        },
        {
          url: "/fonts/montserrat/Montserrat-SemiBold.ttf",
          revision: "c88cecbffad6d8e731fd95de49561ebd",
        },
        {
          url: "/fonts/montserrat/Montserrat-SemiBoldItalic.ttf",
          revision: "2d3cef91fbb6377e40398891b90d29bf",
        },
        {
          url: "/fonts/montserrat/Montserrat-Thin.ttf",
          revision: "0052573bbf05658a18ba557303123533",
        },
        {
          url: "/fonts/montserrat/Montserrat-ThinItalic.ttf",
          revision: "3cb621135b5f6fe15d7c2eba68f0ee37",
        },
        {
          url: "/icon512_maskable.png",
          revision: "6125266acf641717acc3b343c0cd21cd",
        },
        {
          url: "/icon512_rounded.png",
          revision: "53c202fdc7d3ce35d2e7fb92bb86b326",
        },
        { url: "/manifest.json", revision: "95edd842208097bf138253bec6b30ea3" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: t,
              state: i,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    );
});
