---
layout: landing.liquid
title: 'SPX | Single Page XHR'
permalink: '/index.html'
---

<div class="hero d-grid ai-center">

  <div class="hero-github">
    <a href="https://github.com/panoply/spx">
      {% svg "github", 'icon' %}
    </a>
  </div>

  <div class="d-flex flex-column as-center jc-center">
    <a
      data-spx-target="['body']"
      href=" {{- '/introduction/' | slugify }}"
      class="hero-logo d-block">
      {% svg "logo", 'icon' %}
    </a>
  </div>

  <div class="d-flex flex-column m-auto fc-white tc fw-lighter mt-5">
    <h5 class="d-block italic fw-normal light uncase">
      <strong>Single Page XHR</strong>
      enhancement for
      <strong>SSR</strong>
      powered web applications.<br> SPX is a lightening fast, lightweight
      <small>(8kb gzip)</small>
      push state solution.
    </h5>
  </div>

  <div class="d-flex flex-column m-auto cli mt-2">
    <pre class="language-js"><code>pnpm add spx</code></pre>
  </div>

</div>
