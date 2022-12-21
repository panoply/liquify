export default (
/* html */`
<main>

  <!-- It contains an article -->
  <article>
    <h2>Article heading</h2>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a diam lectus. Set sit amet ipsum mauris. Maecenas congue ligula as quam viverra nec consectetur ant hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur.</p>

    <h3>subsection</h3>

    <p>Donec ut librero sed accu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor.</p>

    <p>Pelientesque auctor nisi id magna consequat sagittis. Curabitur dapibus, enim sit amet elit pharetra tincidunt feugiat nist imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros.</p>
  </article>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Prettify Beautification",
    "startDate": "2025-01-01T19:30",
    "endDate": "2025-01-01T23:00",
    "location": {
      "@type": "Place",
      "name": "The Internet",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Internet",
        "addressLocality": "World",
        "addressCountry": "Earth"
      }
    },
    "image": [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg"
    ],
    "description": "The new generation code beautification tool for formatting HTML, Liquid, JavaScript, TypeScript, CSS/SCSS and more! Prettify is built atop of the sparser lexing engines and its parse approach was adapted from the distributed source code of the late and powerful PrettyDiff.",
    "offers": {
      "@type": "Offer",
      "url": "https://www.example.com/event_offer/12345_201803180430",
      "price": "30",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-10-20T16:00"
    },
    "performer": {
      "@type": "PerformingGroup",
      "name": "Panoply"
    },
    "openingHours": "Mo 01:00-01:00 Tu 01:00-01:00 We 01:00-01:00 Th 01:00-01:00 Fr 01:00-01:00 Sa 01:00-01:00 Su 01:00-01:00"
  }
  </script>
</main>
`);
