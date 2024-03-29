export default (
/* html */`

---
layout: blank
title: The Programming Historian Blog
redirect_from: /news.html
skip_concordance: true
---

<h1>PH Blog</h1>

The <i>Programming Historian</i> blog is our space to share news about the project, ideas for how you might use
technology in your work, and exciting examples of the Programming Historian applied in the real world.

Subscribe to the <a href="/feed.xml">RSS feed</a> for new blog posts.

{% for post in paginator.posts %}

  <hr />

  <div class="blog-header">
    <h4 class="above-title">{{post.date | date: "%B %-d, %Y"}}</h4>
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <h3 class="author-name">
    {% assign authorCount = post.authors | size %}
    {% if authorCount == 1 %}
    {{ post.authors | first }}
    {% else %}
    {% for author in post.authors %}
    {% if forloop.first %}
    {{ author }}
    {% elsif forloop.last %}
    and {{ author }}
    {% else %}
    , {{ author }}
    {% endif %}
    {% endfor %}
    {% endif %}
  </h3>
  {{ post.excerpt | remove: '</p>' }} <a href="{{ post.url }}">
    <!--Read the full post! &raquo;--></a>
  </div>


  {% endfor %}

  <nav aria-label="Blog page navigation" class="row d-flex justify-content-between mt-5">
  {% if paginator.previous_page %}
  <a href="{{ paginator.previous_page_path }}" class="btn btn-secondary">
  </a>
  {% else %}
  <span class="previous"></span>
  {% endif %}
  <span class="page_number ">
    {{ paginator.page }} / {{ paginator.total_pages }}
  </span>
  {% if paginator.next_page %}
  <a href="{{ paginator.next_page_path }}" class="btn btn-secondary">→</a>
  {% else %}
  <span class="next"></span>
  {% endif %}
  </div>
  </nav>
`);
