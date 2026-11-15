// ─────────────────────────────────────────────────────────────
//  YOUR SITE SETTINGS
//  Change the words inside the quote marks "like this".
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Roni Goren",

  /** The big italic line that opens the Home page. (An "&" in it is shown in red.) */
  tagline: "Cities, cinema & the art of a beautiful life",

  /** The small words at the top of the Home page. */
  topics: ["Cities", "Architecture", "Style", "Cinema"],

  /** The quote in the red band on the Home page. */
  quote: "I'm going to give myself everything I deserve.",
  quoteBy: "Scarface, 1983",

  /** Contact page */
  email: "ronigoren19@gmail.com",
  contactIntro: "About a city, a film, a building — or anything else. I read every message.",

  /** Your Instagram accounts. Delete a line to remove one, or copy a line to add one. */
  instagram: [
    { handle: "@ronigoren1", url: "https://instagram.com/ronigoren1" },
  ],

  /** The menu: left of your name, and right of your name. */
  menuLeft: [
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
    { to: "/cities", label: "Cities" },
    { to: "/architecture", label: "Architecture" },
  ],
  menuRight: [
    { to: "/style", label: "Style" },
    { to: "/cinema", label: "Cinema" },
    { to: "/contact", label: "Contact" },
  ],
};

export const allLinks = [{ to: "/", label: "Home" }, ...site.menuLeft, ...site.menuRight];
