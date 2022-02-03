import React from "react";

function BlogSection() {
  return (
    <div className="blog-container" style={{ display: "flex" }}>
      <div className="blog-header" style={{ flex: "50%", marginLeft: 100 }}>
        <h1>Secrets of people who always have a clean house</h1>
        <div className="subheader">
          <h2>They know how to make space</h2>
          <span>
            Even if you don`t consider yourself a collector of “stuff,” that
            “stuff” always seems to pile up in every corner and on every
            countertop. “Start following the one in, one out rule going
            forward,” says Nancy Haworth of On Task Organizing in Raleigh, North
            Carolina. “When you buy something new, toss, sell, or donate an
            older item to create space for the new item.”
          </span>
        </div>
        <div className="subheader">
          <h2>They smooth surfaces</h2>
          <span>
            Junk drawers have a habit of spilling out onto what should be an
            otherwise clean, empty surface. Countertops and tables are
            practically begging to be littered with stray mail and other odds
            and ends. People with clean homes tackle that problem immediately.
            “When you keep large, flat surfaces clear, not only are they more
            visually appealing, but easier to wipe down as well,” says Carrie
            Higgins, author of Organization Hacks and founder of the blog Making
            Lemonade. “Don’t store appliances on countertops or clutter on your
            desk.” Here are a few items you shouldn’t store on your kitchen
            countertop.
          </span>
        </div>
        <div className="subheader">
          <h2>They set cleaning systems in place</h2>
          <span>
            Clean homes don’t just miraculously clean themselves—neat people
            have a protocol in place to keep things maintained and orderly.
            “People with neat homes tend to have a cleaning schedule and
            routines so dirt and laundry don’t have time to pile up,” says
            Higgins. “For example, they set a designated day to vacuum or do
            laundry every Monday so those big tasks don’t get skipped.”
            Sometimes you may need to do something small every day. You don’t
            need to hire anyone, but take the advice from a professional
            housecleaner about how they clean their own homes.
          </span>
        </div>
        <div className="subheader">
          <h2>They think clean when they step into the house</h2>
          <span>
            Sometimes it really is the little things that lend themselves to a
            sparkling abode. Bailey Gaddis, a certified professional organizer
            and author of Feng Shui Mommy, starts with a shoes-off policy. “When
            shoes are left at the door you prevent toxins, soil, leaves, and
            other goodies that quickly dirty up floors from making their way
            into your home,” she says. Check out some more secrets your
            housecleaner won’t tell you.
          </span>
        </div>
      </div>
      <div style={{ flex: "50%" }}></div>
    </div>
  );
}

export default BlogSection;
