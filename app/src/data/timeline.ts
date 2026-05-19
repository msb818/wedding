export type Task = {
  id: string;
  text: string;
  detail?: string;
};

export type Phase = {
  id: string;
  title: string;
  window: string;
  subtitle: string;
  tasks: Task[];
};

export const TIMELINE: Phase[] = [
  {
    id: "p1",
    title: "Phase 1 — Foundation",
    window: "Now through July 2026 · 15–14 months out",
    subtitle:
      "The most important phase. Everything that follows depends on getting this right.",
    tasks: [
      { id: "p1-top3", text: "Pick our 'top 3' priorities", detail: "Sit down together for an hour and write the three things that matter most (photos, food, music, venue view, guest experience, etc.). Tape it to the fridge." },
      { id: "p1-budget", text: "Set a total budget number", detail: "A single total dollar figure you're both comfortable with. Be honest about who's contributing what. See the budget guide in the repo." },
      { id: "p1-count", text: "Draft a guest count range", detail: "Not a list yet — just a range like '80–110'. Drives venue size and ~60% of your budget." },
      { id: "p1-style", text: "Decide on a wedding style", detail: "Pick one or two adjectives: 'rustic mountain', 'elegant garden', 'modern industrial', 'casual outdoor'." },
      { id: "p1-vibe", text: "Decide on dress code / formality", detail: "Formal (black-tie / cocktail) vs. semi-formal (suits / sundresses) vs. casual. Mountain weddings skew semi-formal." },
      { id: "p1-venue-search", text: "Start the venue search", detail: "Email 8–10 venues. Tour 4–6. Sign by end of July 2026." },
      { id: "p1-planner", text: "Decide if we want a full-service planner", detail: "If yes, hire now — they help with the venue search. Month-of coordinators can wait until 2027." },
      { id: "p1-email", text: "Create a shared planning email", detail: "e.g. yournames.wedding@gmail.com. Use it for all vendor correspondence." },
      { id: "p1-sheet", text: "Start a shared guest list spreadsheet", detail: "Columns: name, email, address, RSVP, dietary, +1 status, side, party group." },
      { id: "p1-engagement", text: "Book engagement photos (optional)", detail: "Most photographers include them. Useful for save-the-dates." },
    ],
  },
  {
    id: "p2",
    title: "Phase 2 — Big Vendors",
    window: "August–October 2026 · 13–11 months out",
    subtitle:
      "Venue is locked. Now book everything else. Top vendors fill Labor Day weekend fast.",
    tasks: [
      { id: "p2-photo", text: "Book the photographer", detail: "Look at 3+ full galleries, not just highlight reels. Ask for a complete recent wedding gallery." },
      { id: "p2-video", text: "Book the videographer (optional)" },
      { id: "p2-cater", text: "Book the caterer", detail: "Some venues require their in-house caterer or have a preferred list — clarify before booking." },
      { id: "p2-music", text: "Book the band or DJ", detail: "DJs $2–3.5k, bands $5–12k." },
      { id: "p2-officiant", text: "Lock the officiant", detail: "Friend, religious officiant, or pro. Colorado also allows self-solemnization — you can legally marry yourselves." },
      { id: "p2-dress", text: "Start dress / suit shopping", detail: "Wedding dresses take 6–9 months to order plus 2–3 months for alterations. Order by Dec 2026." },
      { id: "p2-hotels", text: "Reserve hotel room blocks (2–3 hotels)", detail: "Labor Day weekend is peak Denver tourism. Book NOW." },
      { id: "p2-stds", text: "Send save-the-dates", detail: "Send 9–10 months out (Nov–Dec 2026) so out-of-town guests can book flights." },
      { id: "p2-website", text: "Build the wedding website", detail: "Zola, The Knot, or Withjoy. Free and good. Include altitude warning, hotel blocks, shuttles, dress code." },
    ],
  },
  {
    id: "p3",
    title: "Phase 3 — Aesthetic & Logistics",
    window: "November 2026–January 2027 · 10–8 months out",
    subtitle: "Florals, attire, transportation, registry.",
    tasks: [
      { id: "p3-flowers", text: "Book the florist", detail: "Bring Pinterest board, color palette, venue photos, honest budget." },
      { id: "p3-hmu", text: "Book hair and makeup", detail: "Trial typically 1–2 months out." },
      { id: "p3-dress-order", text: "Order the dress (latest end of December)" },
      { id: "p3-party-attire", text: "Order bridesmaid & groomsmen attire" },
      { id: "p3-party-ask", text: "Choose & ask wedding party", detail: "Be clear about expectations and approximate costs they'll incur." },
      { id: "p3-shuttles", text: "Book transportation / shuttles", detail: "Non-negotiable for a foothills venue. Don't let guests drive mountain roads after drinks." },
      { id: "p3-wedding-night", text: "Book wedding-night lodging" },
      { id: "p3-honeymoon", text: "Start honeymoon planning", detail: "September abroad means winter decisions for flight prices." },
      { id: "p3-registry", text: "Set up registry", detail: "Use one consolidating site (Zola, MyRegistry) so guests have one link." },
      { id: "p3-cake", text: "Book cake / dessert vendor" },
    ],
  },
  {
    id: "p4",
    title: "Phase 4 — Details",
    window: "February–April 2027 · 7–5 months out",
    subtitle: "Invitations, tastings, rehearsal dinner, rings.",
    tasks: [
      { id: "p4-invites-design", text: "Design invitations", detail: "Allow 6–8 weeks for design + printing." },
      { id: "p4-rehearsal", text: "Plan the rehearsal dinner", detail: "Friday 9/3/27 night. Book restaurant or venue." },
      { id: "p4-welcome", text: "Plan welcome event (optional)", detail: "Casual Friday afternoon happy hour. $20–40/person, huge ROI." },
      { id: "p4-menu", text: "Menu tasting with the caterer" },
      { id: "p4-cake-taste", text: "Cake tasting" },
      { id: "p4-hmu-trial", text: "Hair / makeup trials" },
      { id: "p4-fit1", text: "First dress fitting" },
      { id: "p4-rings", text: "Order rings", detail: "Allow 6–8 weeks if engraving / custom." },
      { id: "p4-coord", text: "Hire month-of coordinator (if not already)" },
      { id: "p4-timeline", text: "Start day-of timeline draft with coordinator" },
      { id: "p4-ceremony-items", text: "Order ceremony items", detail: "Signage, programs (optional), guestbook, card box, unity items." },
      { id: "p4-party-gifts", text: "Buy wedding party gifts", detail: "Give at rehearsal dinner." },
    ],
  },
  {
    id: "p5",
    title: "Phase 5 — Crunch",
    window: "May–July 2027 · 4–2 months out",
    subtitle: "Invitations out. Walkthroughs. Music. Vows.",
    tasks: [
      { id: "p5-invites-send", text: "Send invitations (~12 weeks out)", detail: "RSVP deadline ~5 weeks before the wedding." },
      { id: "p5-fit2", text: "Final dress fitting #1" },
      { id: "p5-walkthrough", text: "Vendor walkthroughs at the venue", detail: "Bring planner, photographer, florist, caterer, DJ. Get everyone aligned." },
      { id: "p5-music", text: "Finalize music", detail: "Processional, recessional, first kiss, must-plays, do-not-plays, first dance, parent dances." },
      { id: "p5-vows", text: "Write our vows", detail: "Block this date 2 months out. Don't leave for the week of." },
      { id: "p5-rentals", text: "Confirm rentals", detail: "Chairs, linens, lighting, dance floor, any tents." },
      { id: "p5-bach", text: "Plan bachelor / bachelorette parties", detail: "July or early August. Not within 2 weeks of the wedding." },
      { id: "p5-bags", text: "Order welcome bags", detail: "Water, snacks, hand-written welcome card, Tylenol & sunscreen (altitude!)." },
      { id: "p5-shuttle-confirm", text: "Confirm transportation timing" },
    ],
  },
  {
    id: "p6",
    title: "Phase 6 — Final Assembly",
    window: "August 2027 · 4 weeks out",
    subtitle: "Marriage license, seating, headcount, payments.",
    tasks: [
      { id: "p6-license", text: "Get the Colorado marriage license", detail: "Valid 35 days. Apply between July 31 and Sep 4, 2027 — sweet spot is mid-August. $30, no waiting period, both parties present." },
      { id: "p6-fit3", text: "Final dress fitting #2 (~2–3 weeks out)" },
      { id: "p6-headcount", text: "Final headcount to caterer & venue", detail: "Usually due 7–10 days out." },
      { id: "p6-seating", text: "Build seating chart" },
      { id: "p6-final-timeline", text: "Finalize day-of timeline & distribute" },
      { id: "p6-payments", text: "Final vendor payments" },
      { id: "p6-kit", text: "Pack day-of emergency kit", detail: "Safety pins, stain remover, Tide pen, makeup, deodorant, bandaids, painkillers, snacks, charger, sewing kit, scissors, tape, tissues, flat shoes." },
      { id: "p6-pack", text: "Pack for wedding day & honeymoon" },
      { id: "p6-bags-drop", text: "Drop welcome bags at hotel (~2 days before)" },
      { id: "p6-grooming", text: "Haircut, manicure, etc. (~1 week out)" },
      { id: "p6-confirm", text: "Confirm all vendors 3–5 days out", detail: "Arrival time, contact person, payment status." },
    ],
  },
  {
    id: "p7",
    title: "Phase 7 — Wedding Week",
    window: "September 1–4, 2027",
    subtitle: "Slow down. Eat. Sleep. Be present.",
    tasks: [
      { id: "p7-tue", text: "Tue/Wed: out-of-town family arrives. Massage if possible." },
      { id: "p7-thu", text: "Thu: wedding party dinner (small group, optional)" },
      { id: "p7-fri-rehearsal", text: "Fri: rehearsal at venue (~4 PM, 1 hour)" },
      { id: "p7-fri-dinner", text: "Fri: rehearsal dinner + welcome event" },
      { id: "p7-fri-sleep", text: "Fri: go to bed early" },
      { id: "p7-sat-eat", text: "Sat: EAT BREAKFAST AND LUNCH", detail: "Set an alarm. You will not feel hungry. You also won't eat at the reception. Eat the sandwich." },
      { id: "p7-sat-hmu", text: "Sat morning: hair & makeup (starts ~5 hours before ceremony)" },
      { id: "p7-sat-photos", text: "Sat: first look + wedding party + family photos" },
      { id: "p7-sat-alone", text: "Sat: 10 minutes alone together right after the ceremony", detail: "Single best decision couples report making." },
      { id: "p7-sat-ceremony", text: "Sat ~4:30–5:30 PM: ceremony" },
      { id: "p7-sat-cocktails", text: "Sat: cocktail hour" },
      { id: "p7-sat-reception", text: "Sat: reception" },
    ],
  },
  {
    id: "p8",
    title: "Phase 8 — After",
    window: "September onward",
    subtitle: "Wrap-up, thank-yous, name changes.",
    tasks: [
      { id: "p8-returns", text: "Return rentals, attire, etc." },
      { id: "p8-thanks", text: "Send thank-you notes (target: within 2 months)" },
      { id: "p8-license-file", text: "Confirm marriage license filed with county clerk", detail: "Order 2–3 certified copies for name changes." },
      { id: "p8-name", text: "Name change paperwork (if applicable)", detail: "SSA → DMV → passport → banks." },
      { id: "p8-galleries", text: "Review photo / video galleries when they arrive" },
      { id: "p8-reviews", text: "Leave reviews for vendors we loved" },
    ],
  },
];
