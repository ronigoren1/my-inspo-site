---
title: How to write a post
date: 2026-11-15
summary: One sentence that appears on the Blog page under the title.
cover: my-photo.jpg
draft: true
---

This file is a TEMPLATE. It never appears on the site, because its name
starts with _ (underscore) and it says  draft: true  above.

HOW TO WRITE A NEW POST
1. In the folder  src/content/blog  click  Add file → Create new file.
2. Name it like this:  my-first-post.md   (small letters, dashes, ending in .md)
   The name becomes the web address: yoursite/blog/my-first-post
3. Copy everything from the top of this file, from the first --- down to here, paste it in,
   and change the title, date and summary.
4. Delete the line  draft: true  (or the post stays hidden).
5. Write your post under the second --- line. Leave an empty line between paragraphs.
6. Click Commit changes. About a minute later it is on your site.

PHOTOS
- Upload photos into the folder  blog  (at the top of the project)
- cover: my-photo.jpg   → the big photo at the top of the post (optional - delete the line for none)
- To put a photo inside the text, write it on its own line like this:

![A caption under the photo](my-photo.jpg)

SIMPLE FORMATTING
**bold words**   *italic words*   ## A small heading   > a quote
