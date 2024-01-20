# What is it?

Htmx builds on HTML and provides AJAX (javascript like) features to your HTML files.

**It is important to note that when using HTMX you respond with HTML and not JSON.**

- Normal html 

```

<a href="/blog">Blog</a>

```

this says to the browser:

“When a user clicks on this link, issue an HTTP GET request to ‘/blog’ and load the response content into the browser window”.

- HTMX html

```

<button hx-post="/clicked"
    hx-trigger="click"
    hx-target="#parent-div"
    hx-swap="outerHTML"
>
    Click Me!
</button>

```

This tells the browser:

“When a user clicks on this button, issue an HTTP POST request to ‘/clicked’ and use the content from the response to replace the element with the id parent-div in the DOM”

# Advantages of using HTMX

- Any element can trigger events
- Any element can issue a HTTP request
- All verbs of a HTTP request can be used not just GET or POST
- Any element can be a target of update over instead of updating the entire window.

# Installation

## CDN

```

<script src="https://unpkg.com/htmx.org@1.9.9" integrity="sha384-QFjmbokDn2DjBjq+fM+8LUIVrAgqcNW2s0PjAxHETgRn9l4fvX31ZxDxvwQnyMOX" crossorigin="anonymous"></script>


```

# AJAX - Asynchronous Javascript and Asynchronous XML

- hx-get - Issues a GET
- hx-post - Issues a POST
- hx-put - Issues a PUT
- hx-patch - Issues a PATCH
- hx-delete - Issues a DELETE

```html

<div hx-put="/messages">
    Put To Messages
</div>

explanation:

When a user clicks on this div, issue a PUT request to the URL /messages and load the response into the div

```

# Triggeres

Circumstances when the requests are sent.

When you don't mention the trigger yourself then the natural event is considered as its trigger.
- form - its the `submit` button click
- input, textarea, select - are triggered on the `change` event
