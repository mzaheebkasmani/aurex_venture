/**
 * Multi-Turn Conversational Consultation & Roasting Engine for Aurex
 * 
 * Bulletproof Architecture:
 * - Token-based exact matching (eliminates substring bugs like "domain" -> "ai", "both" -> "bot", "corporate" -> "rate").
 * - Full domain coverage (Hosting & Domain, Office Location, Email/Contact, WhatsApp Automation, Speed Guarantee,
 *   E-Commerce, SaaS, Corporate, UI/UX, Pricing, Timelines, Leadership Team, Portfolio, Identity).
 * - Multi-turn conversational intelligence with ZERO repetition.
 * - Greeting interceptor that never loops previous replies.
 * - Hilarious roasting for off-topic/illogical queries (cooking/biryani, cricket, dating, medical, homework, gibberish).
 * - Full bilingual support (Roman Urdu & English, plus Urdu script).
 */

export interface ChatHistoryItem {
  role: "user" | "model" | string;
  text: string;
}

function tokenize(text: string): string[] {
  return (text || "")
    .toLowerCase()
    .split(/[^a-z0-9\u0600-\u06FF]+/i)
    .filter(Boolean);
}

function hasAnyToken(tokens: string[], words: string[]): boolean {
  const tokenSet = new Set(tokens);
  return words.some((w) => tokenSet.has(w.toLowerCase()));
}

function hasAnyPhrase(text: string, phrases: string[]): boolean {
  const lower = (text || "").toLowerCase();
  return phrases.some((p) => lower.includes(p.toLowerCase()));
}

export function getAurexReply(query: string, history?: ChatHistoryItem[]): string {
  const rawQ = query.trim();
  const q = rawQ.toLowerCase();
  const tokens = tokenize(rawQ);
  const cleanQ = tokens.join(" ");

  // Extract recent conversation history context
  const previousTurns = Array.isArray(history) ? history : [];
  const modelMessages = previousTurns
    .filter((m) => m && m.role === "model")
    .map((m) => (m.text || "").replace(/[*_#`~]/g, " ").toLowerCase());
  const userMessages = previousTurns
    .filter((m) => m && m.role === "user")
    .map((m) => (m.text || "").replace(/[*_#`~]/g, " ").toLowerCase());

  const lastBotReply = modelMessages[modelMessages.length - 1] || "";
  const lastUserQuery = userMessages[userMessages.length - 1] || "";

  // Roman Urdu & Urdu script detection
  const isUrdu =
    hasAnyToken(tokens, [
      "kya", "kaise", "chahiye", "batao", "hai", "hain", "karo", "karna", "hum",
      "kitna", "kitne", "rabta", "madad", "shuru", "kaam", "paisa", "paise", "kharcha",
      "banao", "nayi", "naye", "nai", "naya", "banani", "banana", "purani", "purana",
      "theek", "salam", "shukriya", "haan", "han", "ji", "jee", "bhai", "yaar",
      "kuch", "meri", "mera", "acha", "accha", "kahan", "kon", "konsa", "kisi",
      "udhaar", "dawai", "bukhar", "khana", "pakana", "rishta", "totkay"
    ]) ||
    hasAnyPhrase(rawQ, ["ویب", "نئی", "نئے", "نیا", "ہاں", "شکریہ", "سلام", "پرانی"]);

  // =========================================================================
  // 1. GREETING & INTERJECTION INTERCEPTOR
  // =========================================================================
  const isGreeting =
    hasAnyPhrase(cleanQ, [
      "hello", "hi", "hey", "salam", "assalam", "assalamu alaikum",
      "assalam o alaikum", "good morning", "good evening", "good afternoon", "سلام"
    ]) && tokens.length <= 4;

  if (isGreeting) {
    if (previousTurns.length > 1) {
      if (isUrdu) {
        return `Hello! Main bilkul yahan mojood hoon 🤖\n\nHum aapke project par baat kar rahe thay. Aap batayein ke aapko kis tarah ki website chahiye (jaise E-Commerce, SaaS, Corporate, ya custom Web App) ya aapka koi specific sawal hai?`;
      }
      return `Hello! I'm right here with you 🤖\n\nWe were discussing your digital project. Feel free to let me know what type of website you need (e.g. E-Commerce, SaaS, Corporate business site) or ask any questions you have!`;
    }

    if (isUrdu) {
      return `Assalam-o-Alaikum! Main **Aurex** hoon—Aurex Ventures ka digital consultant 🤖\n\nMain aapki web development, AI automation, UI/UX design aur business growth mein madad kar sakta hoon. Aap kis cheez ke baare mein janna chahte hain?`;
    }
    return `Hello! I'm **Aurex**, your digital consultant for Aurex Ventures 🤖\n\nHow can I help you today? Feel free to ask about our web development, AI automation, UI/UX design, or schedule a free discovery consultation with our team!`;
  }

  // =========================================================================
  // 2. ILLOGICAL / COMPLETELY UNRELATED TOPIC DETECTION & ROASTING
  // =========================================================================

  // Cooking / Food
  const isCooking =
    hasAnyToken(tokens, [
      "biryani", "recipe", "salan", "roti", "cooking", "chicken", "maggi",
      "bake", "cake", "samosa", "kheer", "ingredients"
    ]) ||
    hasAnyPhrase(cleanQ, ["how to cook", "boil egg", "khana pakana", "make pizza", "make burger", "brew tea", "make chai", "بریانی"]);

  // Dating / Relationship
  const isRelationship =
    hasAnyToken(tokens, [
      "girlfriend", "boyfriend", "crush", "breakup", "patchup", "shadi", "shaadi",
      "rishta", "pyar", "pyaar", "mohabbat", "flirt", "patana", "wife", "husband"
    ]) ||
    hasAnyPhrase(cleanQ, ["impress larki", "date me", "love you", "propose"]);

  // Sports / Cricket / Football
  const isSports =
    hasAnyToken(tokens, ["cricket", "ipl", "psl", "football", "messi", "ronaldo", "wicket", "sixer", "toss"]) ||
    hasAnyPhrase(cleanQ, ["babar azam", "virat kohli", "world cup", "match score", "who won", "kon jita", "aaj ka match"]);

  // Entertainment / Gossip
  const isEntertainment =
    hasAnyToken(tokens, ["bollywood", "lollywood", "cinema", "heroine"]) ||
    hasAnyPhrase(cleanQ, ["salman khan", "shahrukh", "netflix show", "drama serial", "filmi baatein"]);

  // Medical / Sickness
  const isMedical =
    hasAnyToken(tokens, ["bukhar", "dawai", "fever", "headache", "cough", "doctor", "bimari", "tablets", "capsule", "syrup"]) ||
    hasAnyPhrase(cleanQ, ["sar dard", "pet dard", "medical advice"]);

  // Money Begging / Loans
  const isMoneyBegging =
    hasAnyToken(tokens, ["udhaar", "robbery"]) ||
    hasAnyPhrase(cleanQ, ["paise de do", "give me money", "send me cash", "loan chahiye", "bank loot", "free money", "easypaisa bhej"]);

  // Gibberish
  const isGibberish =
    tokens.length === 1 &&
    tokens[0].length >= 6 &&
    (
      /^([a-z])\1{4,}$/.test(tokens[0]) ||
      tokens[0].includes("asdfg") ||
      tokens[0].includes("qwerty") ||
      tokens[0].includes("zxcvb") ||
      /^[bcdfghjklmnpqrstvwxz]{6,}$/i.test(tokens[0])
    );

  const isOffTopic = isCooking || isRelationship || isSports || isEntertainment || isMedical || isMoneyBegging || isGibberish;

  if (isOffTopic) {
    if (isCooking) {
      if (isUrdu) {
        return `Bhai main Aurex Ventures ka AI tech consultant hoon, koi Bawarchi Khana ya Food Panda nahi! 😂\n\nYahan Next.js websites, AI automation aur business scale hota hai, biryani ya chai nahi banti! Kitchen ka rasta seedha haath par hai, wapis kaam ki baat par aao — website banwani hai ya nahi?`;
      }
      return `Sir, this is Aurex Ventures—a premier digital & AI engineering agency, not MasterChef! 💀\n\nWe build high-converting websites and enterprise AI agents, not food recipes. The kitchen is down the hall. Back to reality: do you need a digital platform or did you get lost on the internet?`;
    }

    if (isRelationship) {
      if (isUrdu) {
        return `Wah bhai wah! Aurex Ventures ki corporate agency par aakar rishtay aur crush ke mashwaray maang rahe ho? 🤦‍♂️😂\n\nHum high-performance software aur AI bots banatay hain, daadi ammi ke totkay ya rishta aunty nahi hain! Kaam ki baat karo: koi business website banwani hai ya time pass chal raha hai?`;
      }
      return `Sir, this is a corporate technology agency, not an agony aunt column or a dating hotline! 💀\n\nI can build you an AI agent that generates 7-figure revenue, but I cannot fix your love life. Back to business: are we building an ultra-fast website for your brand or what?`;
    }

    if (isSports) {
      if (isUrdu) {
        return `Arey Janab, main Aurex ka AI digital consultant hoon, Harsha Bhogle ya Shoaib Akhtar nahi! 🏏😂\n\nHum code run karte hain, ground par runs nahi banatay! Agar sports club ya cricket portal ki website banwani hai to meeting book karo, warna match TV par dekho!`;
      }
      return `I engineer Next.js cloud platforms and AI automation, I'm not ESPN or your fantasy league commissioner! 🏆\n\nIf you want to build a sports tech app or e-commerce store, let's talk. Otherwise, Google the score like a normal person!`;
    }

    if (isEntertainment) {
      if (isUrdu) {
        return `Ustaad! Aurex Ventures par aakar filmi baatein aur Bollywood gossip? 🎬😂\n\nHum award-winning web applications aur AI bots develop karte hain, Netflix ki script nahi likhte! Chalo ab seedhe kaam par aao — business ke liye website ya AI system chahiye?`;
      }
      return `You came to a premier software agency to discuss celebrity gossip? 🍿😂\n\nWe architect enterprise digital platforms and automated workflows, we don't write Hollywood tabloids! Let's refocus: what digital solution does your business need?`;
    }

    if (isMedical) {
      if (isUrdu) {
        return `Bhai jaan, main software engineer aur AI architect hoon, MBBS doctor nahi! 🏥🤦‍♂️\n\nDawai doctor se poocho, idhar se sirf high-speed Next.js websites aur AI workflows milte hain. Chalo shabash, hospital jao ya kaam ki baat karo!`;
      }
      return `I am an AI tech consultant, not a licensed physician! 🩺\n\nTake your health questions to a doctor. If you run a clinic or healthtech startup and need a patient portal or telemedicine app (like our Project Epsilon), let's build it!`;
    }

    if (isMoneyBegging) {
      if (isUrdu) {
        return `Acha ji? Aurex Ventures par aakar seedha loan aur muft ke paise maang rahe ho? 💸😂\n\nPaise kamane hain to business shuru karo aur humse aik zabardast high-converting website ya AI bot banwao! Muft mein to yahan sirf consultation call milti hai!`;
      }
      return `Did you just ask an AI tech consultant for free cash? 💸😂\n\nWe help companies generate millions through custom software and digital growth, but we aren't an ATM! If you want to build a real business that makes real money, let's talk.`;
    }

    if (isGibberish) {
      if (isUrdu) {
        return `System Error 404: Logic Not Found! 🧠\n\nThora sa dimagh par zor dalo aur socho tum kis website par kharay ho! Hum world-class web development, AI automation aur modern UI/UX design karte hain. Agar business grow karna hai to meeting book karo, ye ajeeb o ghareeb baatein band! 😂`;
      }
      return `Error 404: Brain cells not detected. 🧠\n\nOut of all the game-changing technology we could build for you—scalable SaaS platforms, AI bots, killer branding—you decided to ask *that*? 😂 Let's reset: tell me what business you run and let's build something that actually generates revenue!`;
    }
  }

  // =========================================================================
  // 3. SPECIFIC BUSINESS & TECHNICAL TOPICS (EXACT TOKEN-BASED MATCHING)
  // =========================================================================

  // Hosting & Domain
  if (hasAnyToken(tokens, ["hosting", "domain", "server", "dns", "ssl", "host", "cloudflare", "vercel", "aws"])) {
    if (isUrdu) {
      return `Haan bilkul! Hum complete deployment, cloud hosting aur domain configuration handle karte hain 🌐\n\n• **Cloud Hosting**: Hum **Vercel**, **AWS**, ya **Cloudflare** par deploy karte hain jo 99.99% uptime aur sub-second global speed provide karta hai.\n• **Custom Domain & SSL**: Aapka custom domain connect karte hain, free auto-renewing SSL security certificate setup karte hain aur DNS records optimize karte hain.\n• **100% Ownership**: Code, repository aur cloud accounts ka complete access aur ownership aapke paas hoti hai.\n\nKya aapke paas domain already purchase kiya hua hai ya hum guide karein?`;
    }
    return `Yes, absolutely! We handle complete deployment, cloud hosting, and domain configuration 🌐\n\n• **Global Edge Hosting**: We deploy on ultra-fast networks like **Vercel**, **AWS**, or **Cloudflare** for sub-second global speeds and 99.99% uptime.\n• **Custom Domain & SSL**: We configure your custom domain, DNS records, free auto-renewing SSL certificates, and enterprise security.\n• **100% Client Ownership**: You retain full ownership and administrative access to all repositories, codebases, and cloud accounts.\n\nDo you already have a domain registered, or would you like guidance on domain selection?`;
  }

  // Email & Direct Contact Details
  if (hasAnyToken(tokens, ["email", "contact", "phone", "call", "rabta"]) || hasAnyPhrase(cleanQ, ["email address", "contact details", "phone number", "how to contact", "kaise rabta"])) {
    if (isUrdu) {
      return `Hamare sath rabta karna nihayat aasan hai! 🤝\n\n• **Email**: direct **hello@aurex.com** par email karein.\n• **Discovery Call**: Navigation bar mein **'Book a Meeting'** button par click karke 20-minute ki technical call schedule karein.\n• **Contact Form**: Neechay Contact Us section mein form fill karein.\n\nHumari team 24 ghante ke andar tailored proposal ke sath reply karti hai!`;
    }
    return `Connecting with Aurex Ventures is seamless! 🤝\n\n• **Direct Email**: Reach our leadership team directly at **hello@aurex.com**.\n• **Discovery Call**: Click the **"Book a Meeting"** button in our header to schedule a 20-minute consultation.\n• **Contact Form**: Scroll down to our Contact Us section to submit your brief.\n\nOur team connects back within 24 hours with an actionable roadmap!`;
  }

  // Office Location & Physical Presence
  if (hasAnyToken(tokens, ["office", "location", "located", "based"]) || hasAnyPhrase(cleanQ, ["where are you", "office kahan", "kahan par hai", "office address", "physical location"])) {
    if (isUrdu) {
      return `Aurex Ventures aik global digital agency hai jo worldwide clients ko serve karti hai 🌍\n\n• Hamara core digital engineering hub Pakistan mein based hai, aur hum United States, UK, Middle East aur international clients ke sath kaam karte hain.\n• Tamam technical consultations, sprint reviews aur demo sessions **Google Meet / Zoom** par seamless tareeqe se conduct hotay hain.\n• Aap website ke top par **'Book a Meeting'** ke zariye direct discovery call schedule kar sakte hain ya **hello@aurex.com** par rabta kar sakte hain!`;
    }
    return `Aurex Ventures operates as a premier global digital agency serving brands worldwide 🌍\n\n• Our core engineering hub is based in Pakistan, collaborating with clients across North America, the UK, Europe, the Middle East, and worldwide.\n• All project discovery calls, sprint updates, and technical demos are conducted seamlessly via **Google Meet or Zoom**.\n• You can schedule a direct meeting via the **"Book a Meeting"** button in our navigation bar or reach out at **hello@aurex.com**!`;
  }

  // WhatsApp Automation
  if (hasAnyToken(tokens, ["whatsapp"])) {
    if (isUrdu) {
      return `Haan! **WhatsApp AI Automation** hamari boht popular service hai 📱\n\n• **24/7 AI Customer Support**: Roman Urdu aur English dono mein customers ke sawalon aur inquiries ka foran jawab dena.\n• **Automated Order & Lead Sync**: WhatsApp se anay walay orders aur leads ko direct aapke CRM ya Google Sheets mein save karna.\n• **Payment & Notification Triggers**: Invoices, delivery status aur automated follow-up messages bhejna.\n\nKya aap apne business ke liye WhatsApp bot demo discuss karna chahte hain?`;
    }
    return `Yes! **WhatsApp AI Automation** is one of our flagship enterprise services 📱\n\n• **24/7 Conversational AI**: Automatically handles customer inquiries, FAQs, and sales qualification in both English and Roman Urdu.\n• **CRM & Sheet Sync**: Instantly captures leads and orders into your CRM, database, or Google Sheets.\n• **Automated Triggers**: Sends order confirmations, payment links, and dispatch notifications.\n\nWould you like to schedule a discovery call to review a live architecture demo for your business?`;
  }

  // Assistant Identity
  if (hasAnyPhrase(cleanQ, ["who are you", "what is your name", "tum kon ho", "robot ho", "real person", "are you ai", "are you human"])) {
    if (isUrdu) {
      return `Main **Aurex** hoon—Aurex Ventures ka virtual AI digital consultant 🤖\n\nMain aapko hamari web development, AI automation, UI/UX design aur business growth services ke baare mein guide karta hoon. Agar aap hamari human leadership team (Founder Ahmed Ali aur senior engineers) se direct baat karna chahte hain to aap **'Book a Meeting'** ke zariye call schedule kar sakte hain!`;
    }
    return `I am **Aurex**, the virtual AI digital consultant for **Aurex Ventures** 🤖\n\nI assist prospective clients in exploring our web development, AI automation, and UI/UX engineering services. If you'd like to consult directly with our human leadership team (Founder Ahmed Ali and our senior architects), click **"Book a Meeting"** to set up a discovery call!`;
  }

  // Speed Guarantee & Technical Standards
  if (hasAnyPhrase(cleanQ, ["how fast", "speed", "guarantee", "lighthouse", "performance", "kitni fast"])) {
    if (isUrdu) {
      return `Hum **99+ Google Lighthouse score** aur sub-second load times ki technical guarantee dete hain ⚡\n\n• **Clean Architecture**: Hum Next.js 15, React 19 aur Tailwind CSS use karte hain jo bina kisi heavy template ke likhi jati hai.\n• **Zero Bloat**: Na koi slow WordPress plugins aur na unnecessary script overhead.\n• **SEO Advantage**: Fast speed ki wajah se Google rankings aur mobile conversion rate boht behtar ho jata hai.`;
    }
    return `We guarantee **99+ Google Lighthouse performance** and sub-second load times ⚡\n\n• **Next.js 15 & React 19 Architecture**: Server-side rendering (SSR) and edge-cached distribution with zero template bloat.\n• **Core Web Vitals Mastery**: Instant First Contentful Paint (FCP) and optimal Cumulative Layout Shift (CLS).\n• **Conversion Advantage**: Faster load times directly translate into higher conversion rates and superior Google ranking authority.`;
  }

  // Standalone Logo or UI/UX Design Only
  if (hasAnyPhrase(cleanQ, ["only logo", "sirf logo", "only ui", "only ux", "only design", "logo design", "figma only"])) {
    if (isUrdu) {
      return `Haan bilkul! Hum standalone **UI/UX Design & Branding** services bhi provide karte hain 🎨\n\n• **Figma Deliverables**: Interactive, clickable wireframes aur pixel-perfect modern design systems.\n• **Brand Identity**: Modern vector logo, complete color palettes, typography aur brand guidelines.\n• **Timeline**: Aam tor par 1 se 2 hafton mein complete handoff mil jata hai.\n\nKya aap apne design vision ko discuss karne ke liye meeting book karna chahte hain?`;
    }
    return `Yes! We offer standalone **UI/UX Design & Brand Identity** engineering 🎨\n\n• **Deliverables**: Comprehensive Figma design systems, interactive clickable prototypes, and responsive mobile mockups.\n• **Visual Identity**: Custom vector logos, typography hierarchies, brand guidelines, and color palettes.\n• **Timeline**: Delivered in 1–2 weeks with full developer-ready Figma assets.\n\nWould you like to schedule a brief call with our lead designer to discuss your concepts?`;
  }

  // Talking specifically to Ahmed Ali / Founder
  if (hasAnyPhrase(cleanQ, ["ahmed ali", "talk to founder", "talk to ceo", "meet ahmed", "ceo se baat"])) {
    if (isUrdu) {
      return `Aap hamare Founder & CEO, **Ahmed Ali**, se direct discovery session schedule kar sakte hain! 💼\n\nWebsite ke top bar par **'Book a Meeting'** button par click karein ya neechay contact form submit karein. Ahmed Ali aur hamari leadership team clients ke technical scopes aur architecture roadmaps ko personally review karti hai.`;
    }
    return `You can connect directly with our Founder & CEO, **Ahmed Ali**, by scheduling a discovery session via the **"Book a Meeting"** button! 💼\n\nHe personally leads project architecture roadmaps and client strategy consultations. You can also send a direct briefing to **hello@aurex.com**.`;
  }

  // =========================================================================
  // 4. MULTI-TURN STATEFUL PROGRESSION (ZERO-REPETITION)
  // =========================================================================

  const botAskedNewVsRedesign =
    (lastBotReply.includes("redesign") && (lastBotReply.includes("scratch") || lastBotReply.includes("build a new"))) ||
    lastBotReply.includes("mojooda website ko redesign");

  const botAskedWebsiteType =
    lastBotReply.includes("what type of website") ||
    lastBotReply.includes("kis tarah ki website") ||
    lastBotReply.includes("kis type ki site");

  const botAskedBranding =
    lastBotReply.includes("branding & assets") ||
    lastBotReply.includes("logo and branding") ||
    lastBotReply.includes("logo aur design guidelines ready");

  const indicatesRedesign =
    hasAnyToken(tokens, ["redesign", "purani", "purana", "existing", "old", "update", "revamp", "second", "2"]) ||
    hasAnyPhrase(cleanQ, ["ری ڈیزائن", "پرانی"]);

  const indicatesNewWebsite =
    hasAnyToken(tokens, ["new", "naye", "nayi", "nai", "naya", "scratch", "fresh", "shuru", "banani", "banana", "pehli", "first", "1"]) ||
    hasAnyPhrase(cleanQ, ["نئی", "نئے", "نیا"]);

  // Handling choice if bot asked New vs Redesign OR if user explicitly stated it:
  if (botAskedNewVsRedesign || indicatesNewWebsite || indicatesRedesign) {
    if (indicatesRedesign) {
      if (isUrdu) {
        return `Behtareen! Purani website ko modern aur high-converting digital platform mein transform karna hamara pasandeeda kaam hai 🎨\n\nRedesign karte waqt hum in cheezon par focus karte hain:\n• **Modern UI/UX Overhaul**: Saaf layout, intuitive user navigation aur modern aesthetic.\n• **Speed & Tech Upgrade**: Next.js & Tailwind par migrate karke 99+ PageSpeed score.\n• **SEO Preservation**: Aapke current Google ranking URLs ko mehfooz rakhna.\n\nKya aap apni mojooda website ka link share kar sakte hain aur batayein ke aapko isme kya top improvements chahiye?`;
      }
      return `Got it! We love redesigning existing websites to transform them into high-converting digital powerhouses 🎨\n\nWhen revamping an existing platform, we focus on:\n• **Modern UI/UX Overhaul**: Intuitive user journeys, responsive mobile layouts, and modern typography.\n• **Speed & Tech Upgrade**: Migrating to Next.js & Tailwind for lightning-fast sub-second load times.\n• **SEO Preservation**: Protecting your current search rankings, URLs, and domain authority.\n\nCould you share your current website URL or tell us the top 2-3 improvements you'd like to see?`;
    }

    if (botAskedNewVsRedesign || indicatesNewWebsite) {
      if (isUrdu) {
        return `Zabardast! Nayi website scratch se develop karna hamari core specialty hai 🚀\n\nHum aapke project ko modern architecture par execute karte hain:\n1. **Aapko kis tarah ki website chahiye?** (e.g. E-Commerce store, SaaS platform, Corporate business site, ya custom Web App?)\n2. **Branding & Design**: Kya aapke paas logo aur design guidelines ready hain, ya hamari UI/UX team scratch se complete visual identity banaye?\n\nHum complete Next.js, React aur Tailwind CSS par build karte hain jo 99+ Google Lighthouse score aur mobile responsiveness deliver karti hai. Aap batayein kis type ki site chahiye ya direct **'Book a Meeting'** par click karke free consultation call book karein!`;
      }
      return `Awesome! Building a brand new website from scratch is our core specialty at **Aurex Ventures** 🚀\n\nTo tailor the right tech architecture and roadmap for you:\n1. **What type of website do you need?** (e.g. E-Commerce store, SaaS landing page, Corporate business site, or custom Web App?)\n2. **Branding & Assets**: Do you already have a logo and branding guidelines, or would you like our design team to craft the full UI/UX from scratch?\n\nOur builds leverage Next.js, React, TypeScript, and Tailwind CSS for 99+ Google PageSpeed and high conversion. Feel free to share more details, or book a free 20-minute consultation via the **"Book a Meeting"** button above!`;
    }
  }

  // =========================================================================
  // 5. WEBSITE TYPE RESOLUTION (E-COMMERCE, SAAS, CORPORATE)
  // =========================================================================
  if (
    hasAnyToken(tokens, ["ecommerce", "shopify", "woocommerce", "clothing", "fashion", "products"]) ||
    hasAnyPhrase(cleanQ, ["e commerce", "online store", "selling online", "dukan"])
  ) {
    if (isUrdu) {
      return `E-Commerce ke liye hum ultra-fast, high-converting online stores develop karte hain 🛍️\n\n• **Core Features**: Seamless checkout, instant product filters, Stripe / payment gateway integration, inventory sync, aur dynamic cart.\n• **Tech Stack**: Headless Shopify ya custom Next.js full-stack store.\n• **Timeline**: Aam tor par 3 se 5 hafton mein ready ho jata hai.\n\nKya aapke paas product catalogue ready hai? Aap website ke top par **'Book a Meeting'** ke zariye free call schedule kar sakte hain!`;
    }
    return `For **E-Commerce**, we engineer high-converting, lightning-fast shopping experiences 🛍️\n\n• **Core Features**: Seamless checkout, instant search & product filtering, Stripe / payment integrations, inventory sync, and mobile-first cart flows.\n• **Architecture**: Headless Shopify or custom Next.js full-stack store.\n• **Timeline**: Typically ready to launch in 3–5 weeks.\n\nWould you like to schedule a free 20-minute discovery call via the **"Book a Meeting"** button to review your product catalogue and project roadmap?`;
  }

  if (hasAnyToken(tokens, ["saas", "dashboard", "portal", "software"]) || hasAnyPhrase(cleanQ, ["web app", "custom app"])) {
    if (isUrdu) {
      return `SaaS aur Web Applications mein hum enterprise-grade software deliver karte hain 💻\n\n• **Architecture**: Scalable Next.js frontends, secure backend APIs, database management, user auth, aur subscription billing.\n• **Timeline**: 4 se 8 hafton ka targeted milestone roadmap.\n\nAap website par **'Book a Meeting'** ke zariye hamari technical team ke sath discovery call book karein!`;
    }
    return `For **SaaS & Web Applications**, we build scalable, enterprise-ready digital products 💻\n\n• **Architecture**: Responsive Next.js frontend, secure authentication, API microservices, database schemas, and recurring subscription billing.\n• **Timeline**: Delivered in structured 4–8 week sprint milestones.\n\nWould you like to book a technical discovery session via the **"Book a Meeting"** button to map out your feature architecture?`;
  }

  if (hasAnyToken(tokens, ["corporate", "portfolio"]) || hasAnyPhrase(cleanQ, ["business site", "business website", "company site", "agency site", "landing page", "real estate"])) {
    if (isUrdu) {
      return `Corporate aur Business websites ke liye hum high-authority digital experiences banatay hain 🏢\n\n• **Features**: Interactive micro-animations, service showcases, lead generation forms, aur 99+ mobile speed.\n• **Timeline**: Aam tor par 2 se 3 hafton mein deliver ho jati hai.\n\nAap website ke contact section se humein message karein ya direct free meeting book karein!`;
    }
    return `For **Corporate & Business Websites**, we create authority-building digital experiences 🏢\n\n• **Features**: Modern visual hierarchy, smooth interactive animations, service showcases, high-conversion lead magnets, and 99+ mobile speed.\n• **Timeline**: Typically launched in 2–3 weeks.\n\nLet's schedule a brief discovery call to map out your site structure and brand voice—you can click **"Book a Meeting"** above!`;
  }

  // =========================================================================
  // 6. BRANDING & ASSETS FOLLOW-UP
  // =========================================================================
  if (botAskedBranding) {
    if (hasAnyToken(tokens, ["no", "scratch", "nahi"]) || hasAnyPhrase(cleanQ, ["dont have", "kuch nahi", "bana do", "banani hai"])) {
      if (isUrdu) {
        return `Koi masla nahi! Hamari in-house UI/UX design team aapka brand scratch se design karegi 🎨\n\n• Custom modern logo, complete color palette, typography aur brand guidelines.\n• Interactive Figma prototypes taake development shuru hone se pehle aap final look approve kar sakein.\n\nAap meeting book karein taake hum design concepts discuss kar sakein!`;
      }
      return `No problem at all! Our in-house UI/UX studio will craft your brand from scratch 🎨\n\n• Custom modern logo, comprehensive color palettes, typography, and brand identity guidelines.\n• Interactive Figma prototypes so you can preview and approve the design before coding begins.\n\nFeel free to click **"Book a Meeting"** to connect with our design team!`;
    } else {
      if (isUrdu) {
        return `Zabardast! Agar logo aur assets ready hain to hum direct development aur customized UI layouts par kaam shuru kar sakte hain 🚀\n\nIs se timeline bhi fast ho jati hai aur typically 2-3 hafton mein site live ho sakti hai. Meeting schedule karein taake hum files review kar sakein!`;
      }
      return `Fantastic! Having your logo and branding assets ready means we can move directly into rapid development and customized UI layouts 🚀\n\nThis typically speeds up delivery to just 2–3 weeks. Click **"Book a Meeting"** so we can review your assets and finalize the launch plan!`;
    }
  }

  // =========================================================================
  // 7. INITIAL WEB DEVELOPMENT INQUIRY (Fresh queries only)
  // =========================================================================
  if (hasAnyToken(tokens, ["website"]) || hasAnyPhrase(cleanQ, ["web development", "build a site", "need a site", "make a site", "ویب سائٹ"])) {
    if (isUrdu) {
      return `Aurex Ventures modern aur ultra-fast web development me specialize karta hai 💻\n\n• **Tech Stack**: Next.js, React, TypeScript aur Tailwind CSS.\n• **Key Benefits**: 99+ Google Lighthouse score, mobile-first design aur clean custom code.\n\nKya aap bilkul **nayi website** banana chahte hain ya apni **mojooda website ko redesign** karna chahte hain?`;
    }
    return `Our **Web Development** engineering is modern, ultra-fast, and conversion-focused 💻\n\n• **Tech Stack**: Next.js, React, TypeScript, and Tailwind CSS.\n• **Key Standards**: Flawless mobile responsiveness, 99+ PageSpeed scores, and clean scalable architectures.\n\nAre you looking to build a **new website from scratch**, or **redesign an existing one**?`;
  }

  // =========================================================================
  // 8. AI AUTOMATION & INTELLIGENT BOTS (Whole-word "ai" only!)
  // =========================================================================
  if (
    hasAnyToken(tokens, ["ai", "automation", "agent", "agents", "bot", "bots", "chatbot", "chatbots", "llm", "chatgpt"]) ||
    hasAnyPhrase(cleanQ, ["ai automation", "workflow automation", "automate"])
  ) {
    if (isUrdu) {
      return `Hamari **AI Automation** services aapke business ke manual tasks ko automate karti hain 🤖\n\n1. **Smart Conversational Agents**: 24/7 multilingual customer support aur sales qualification bots.\n2. **Workflow Automation**: CRM, email triggers, accounting aur databases ko sync karna (Zapier, Make, custom APIs).\n3. **Document & Data AI**: Invoices aur reports ki automated parsing.\n\nAap apne business me kis process ko automate karna chahte hain?`;
    }
    return `Our **AI Automation** services empower modern businesses to reduce operational overhead and scale faster 🤖\n\n1. **Intelligent Virtual Agents**: 24/7 multilingual customer engagement and sales qualification bots.\n2. **Workflow & Pipeline Automation**: Connecting CRM, email triggers, Slack, and databases.\n3. **Data Intelligence**: Automated document processing, reporting, and predictive analytics.\n\nWhich workflow in your company would you like to automate?`;
  }

  // =========================================================================
  // 9. UI/UX DESIGN & BRANDING (Whole-word "ui" & "ux" only!)
  // =========================================================================
  if (
    hasAnyToken(tokens, ["ui", "ux", "branding", "logo", "figma", "prototype"]) ||
    hasAnyPhrase(cleanQ, ["ui ux", "design system", "brand identity"])
  ) {
    if (isUrdu) {
      return `Hamari **UI/UX Design & Branding** team distinctive aur memorable designs create karti hai 🎨\n\n• **Full Design Systems**: Modern Figma prototypes aur interactive wireframes.\n• **Brand Identity**: Logo design, typography, color palettes aur brand guidelines.\n• **Conversion Focus**: User journeys jo visitors ko customers me convert karti hain.\n\nKya aapko sirf UI/UX design chahiye ya complete design + development package?`;
    }
    return `Our **UI/UX Design & Branding** studio creates distinctive, memorable digital identities 🎨\n\n• **Design Systems**: Interactive Figma prototypes, wireframes, and design guidelines.\n• **Brand Identity**: Logos, typography, iconography, and complete visual language.\n• **User Experience**: Conversion-optimized user flows designed for engagement.\n\nAre you looking for UI/UX design only, or an end-to-end design + development package?`;
  }

  // =========================================================================
  // 10. DIGITAL MARKETING, SEO & GROWTH (Whole-word "seo" & "ads" only!)
  // =========================================================================
  if (
    hasAnyToken(tokens, ["seo", "ads", "marketing", "traffic"]) ||
    hasAnyPhrase(cleanQ, ["google rank", "digital marketing", "cro"])
  ) {
    if (isUrdu) {
      return `Hum targeted **Digital Marketing & SEO** strategies provide karte hain 📈\n\n• **Search Engine Optimization (SEO)**: Organic rankings aur search traffic boost karna.\n• **Conversion Rate Optimization (CRO)**: Website par aane walay visitors ko leads me convert karna.\n• **Targeted Growth**: Data-driven campaigns jo measurable ROI deliver karti hain.\n\nKya aap apni website ki search rankings aur sales barhana chahte hain?`;
    }
    return `Our **Growth & Digital Marketing** strategies deliver measurable ROI 📈\n\n• **Search Engine Optimization (SEO)**: Technical on-page & off-page optimization to rank higher on Google.\n• **Conversion Rate Optimization (CRO)**: A/B testing user journeys to maximize customer acquisitions.\n• **Targeted Campaigns**: Data-driven performance marketing tailored to your market.\n\nAre you looking to scale organic search traffic or run targeted conversion campaigns?`;
  }

  // =========================================================================
  // 11. PRICING / COST / BUDGET / RATES (Whole-word "rate" only!)
  // =========================================================================
  if (
    hasAnyToken(tokens, ["price", "cost", "pricing", "quote", "budget", "kharcha", "paisa", "paise"]) ||
    hasAnyPhrase(cleanQ, ["kitna kharcha", "kitne mein", "how much", "rate card", "hourly rate"])
  ) {
    if (isUrdu) {
      return `Aurex Ventures transparent aur milestone-based pricing offer karta hai 💼\n\n• **Modern Websites & Landing Pages**: Typically 2 se 4 hafton mein ready hoti hain.\n• **Full-Stack SaaS & Web Applications**: Typically 4 se 8 hafton ka roadmap hota hai.\n• **AI Automations**: Custom scope aur integrations par depend karta hai.\n\nAap apne project ka basic idea share karein ya direct free discovery call book karein taake hum aapko tailored proposal de sakein!`;
    }
    return `We offer transparent, milestone-based proposals tailored to your project goals 💼\n\n• **Modern Websites & Landing Pages**: Typically delivered in 2–4 weeks.\n• **Full-Stack SaaS & Web Apps**: Structured in 4–8 week sprints.\n• **AI Automations & Pipelines**: Tailored per integration scope.\n\nWould you like to schedule a free 20-minute discovery call using the **"Book a Meeting"** button to receive an exact quotation?`;
  }

  // =========================================================================
  // 12. TIMELINE & DELIVERY DURATION
  // =========================================================================
  if (
    hasAnyToken(tokens, ["timeline", "duration", "weeks", "days"]) ||
    hasAnyPhrase(cleanQ, ["how long", "kitna time", "kab tak"])
  ) {
    if (isUrdu) {
      return `Hamari delivery timelines project ke scope par depend karti hain ⏱️\n\n• **Landing Pages & Business Sites**: 2 se 3 hafte.\n• **E-Commerce Stores**: 3 se 5 hafte.\n• **Full-Stack SaaS & Custom Portals**: 4 se 8 hafte (sprint milestones mein deliver hota hai).\n• **AI Chatbots & Automations**: 1 se 3 hafte.\n\nAap apne project ki requirements batayein taake exact deadline set ki ja sakay!`;
    }
    return `Our delivery sprints are rapid and milestone-driven ⏱️\n\n• **Landing Pages & Corporate Sites**: 2–3 weeks.\n• **E-Commerce Platforms**: 3–5 weeks.\n• **SaaS Products & Complex Web Apps**: 4–8 weeks in structured bi-weekly sprints.\n• **AI Bots & Workflow Automations**: 1–3 weeks.\n\nLet's hop on a brief discovery call to map your exact milestones!`;
  }

  // =========================================================================
  // 13. TECH STACK, CODING & INFRASTRUCTURE
  // =========================================================================
  if (
    hasAnyToken(tokens, ["nextjs", "react", "tailwind", "typescript", "postgres", "supabase", "coding"]) ||
    hasAnyPhrase(cleanQ, ["next js", "tech stack", "database"])
  ) {
    if (isUrdu) {
      return `Hamara technology stack modern, ultra-fast aur enterprise-grade hai ⚡\n\n• **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS aur Framer Motion.\n• **Backend & APIs**: Node.js, Express, REST APIs, GraphQL aur Serverless functions.\n• **Databases & Cloud**: PostgreSQL, Supabase, Firebase, AWS aur Vercel edge deployment.\n• **Performance**: 99+ Google Lighthouse score aur sub-second load times.\n\nKya aapko kisi specific architecture ya backend integration ki zaroorat hai?`;
    }
    return `Our technology stack is built for high speed, security, and effortless scaling ⚡\n\n• **Frontend Architecture**: Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion.\n• **Backend & Cloud**: Node.js, Express, REST APIs, PostgreSQL, Supabase, and Vercel edge distribution.\n• **Standards**: Flawless mobile responsiveness, 99+ PageSpeed scores, and zero-bloat modular code.\n\nDo you have specific tech stack preferences or existing systems we should integrate with?`;
  }

  // =========================================================================
  // 14. BOOKING A MEETING / CONTACT
  // =========================================================================
  if (hasAnyToken(tokens, ["meeting", "schedule"]) || hasAnyPhrase(cleanQ, ["book a call", "book meeting", "schedule call", "meeting book"])) {
    if (isUrdu) {
      return `Hamare sath rabta karna boht aasan hai! 🤝\n\n1. Website ke top bar par **'Book a Meeting'** button par click karein ya neechay **Contact Us** form fill karein.\n2. Aap direct **hello@aurex.com** par email bhi bhej sakte hain.\n3. Humari team 24 ghante ke andar aap se rabta karegi aur tailored roadmap discuss karegi.`;
    }
    return `Booking a discovery consultation with **Aurex Ventures** is seamless! 🤝\n\n1. Click the **"Book a Meeting"** button in our navigation bar or scroll to the **Contact Us** form.\n2. You can also email us directly at **hello@aurex.com**.\n3. Our team will connect within 24 hours to review your requirements and outline a concrete roadmap.`;
  }

  // =========================================================================
  // 15. TEAM & LEADERSHIP
  // =========================================================================
  if (hasAnyToken(tokens, ["team", "ceo", "founder", "mubashir", "waleed"]) || hasAnyPhrase(cleanQ, ["ahmed ali", "ali khan", "leadership"])) {
    if (isUrdu) {
      return `Aurex Ventures ki core leadership team:\n\n• **Ahmed Ali**: Founder & CEO\n• **Ali Khan**: Lead Graphic & UI/UX Designer\n• **Waleed Khan**: AI Automation Engineer\n• **Mubashir**: Full Stack Developer\n\nHumari team worldwide businesses ke liye award-winning digital experiences aur AI systems build karti hai.`;
    }
    return `**Aurex Ventures** is driven by experienced industry leaders:\n\n• **Ahmed Ali** — Founder & CEO\n• **Ali Khan** — Lead Graphic & UI/UX Designer\n• **Waleed Khan** — AI Automation Engineer\n• **Mubashir** — Full Stack Developer\n\nTogether, we collaborate with startups and enterprises globally to deliver high-impact digital solutions.`;
  }

  // =========================================================================
  // 16. PORTFOLIO & PAST WORK
  // =========================================================================
  if (hasAnyToken(tokens, ["portfolio", "projects", "sample"]) || hasAnyPhrase(cleanQ, ["past work", "case study"])) {
    if (isUrdu) {
      return `Humara portfolio mukhtalif industries ko cover karta hai:\n\n• **Project Alpha**: Next-gen Fintech ecosystem.\n• **Project Beta**: Enterprise AI & ML infrastructure platform.\n• **Project Gamma**: High-scale SaaS workflow application.\n• **Project Delta**: Modern Web3 platform.\n• **Project Epsilon**: Healthtech app.\n• **Project Zeta**: E-commerce enterprise.\n\nAap website ke **Portfolio** section mein inke interactive previews dekh sakte hain!`;
    }
    return `Our featured portfolio spans diverse industry verticals:\n\n• **Project Alpha** — Next-generation Fintech ecosystem.\n• **Project Beta** — Enterprise AI & Machine Learning infrastructure.\n• **Project Gamma** — High-scale SaaS workflow application.\n• **Project Delta** — Modern Web3 and digital platform.\n• **Project Epsilon** — Healthtech telemedicine application.\n• **Project Zeta** — Modern high-volume e-commerce platform.\n\nYou can inspect interactive case studies right in our **Portfolio** section below!`;
  }

  // =========================================================================
  // 17. ALL SERVICES OVERVIEW
  // =========================================================================
  if (hasAnyToken(tokens, ["services"]) || hasAnyPhrase(cleanQ, ["what do you do", "what do you offer", "kya karte"])) {
    if (isUrdu) {
      return `Aurex Ventures aik premier corporate digital agency hai jo 4 core pillars par kaam karti hai:\n\n1. **AI Automation**: Custom conversational bots aur workflow automations.\n2. **Modern Web Development**: Next.js, React aur high-performance web applications.\n3. **UI/UX Design & Branding**: Design systems, wireframes aur brand identities.\n4. **Growth & Digital Marketing**: SEO aur targeted customer acquisition.\n\nAap kis service ke baare me mazeed janna chahte hain?`;
    }
    return `At **Aurex Ventures**, we help ambitious businesses scale through 4 core service pillars:\n\n1. **AI Automation**: Custom conversational agents, CRM triggers, and workflow automations.\n2. **Modern Web Development**: Ultra-fast React, Next.js, Tailwind, and scalable cloud applications.\n3. **UI/UX Design & Branding**: Design systems, wireframing, and distinctive brand identities.\n4. **Growth & Digital Marketing**: Data-driven SEO and conversion rate optimization.\n\nWhich of these services would you like to explore for your company?`;
  }

  // =========================================================================
  // 18. AFFIRMATIONS & AGREEMENTS
  // =========================================================================
  if (
    hasAnyToken(tokens, ["yes", "yeah", "yep", "sure", "ok", "okay", "haan", "han", "ji", "jee", "theek", "bilkul"]) ||
    hasAnyPhrase(cleanQ, ["ji haan", "theek hai", "sounds good", "let's do it"])
  ) {
    if (isUrdu) {
      return `Zabardast! Aap website ke top bar par **'Book a Meeting'** button par click karke direct free discovery call schedule kar sakte hain. Agar aapko koi specific requirement share karni ho, to aap yahan bhi likh sakte hain!`;
    }
    return `Awesome! You can click the **"Book a Meeting"** button in the top navigation to schedule a free 20-minute discovery call with our leadership team. Or feel free to share any specific questions right here!`;
  }

  // =========================================================================
  // 19. THANK YOU / APPRECIATION
  // =========================================================================
  if (hasAnyToken(tokens, ["thanks", "thank", "shukriya"]) || hasAnyPhrase(cleanQ, ["thank you", "شکریہ"])) {
    if (isUrdu) {
      return `Aapka bohat shukriya! Agar aapko mazeed kisi cheez ki zaroorat ho ya discovery call schedule karni ho, to main hamesha yahan mojood hoon!`;
    }
    return `You're very welcome! If you'd like to schedule a discovery meeting or have any more questions about our services, I'm right here to help!`;
  }

  // =========================================================================
  // 20. BROAD INTELLIGENT TECH & BUSINESS CONSULTATION (Gemini-like depth)
  // =========================================================================
  if (isUrdu) {
    return `Main **Aurex** hoon—Aurex Ventures ka AI digital consultant 🤖\n\nAapka point boht important hai. Hum businesses ko modern digital solutions provide karte hain:\n• **Custom Engineering**: Next.js, React aur high-performance web systems.\n• **AI Automations**: Custom bots aur 24/7 automated workflows jo manual work khatam karte hain.\n• **Conversion Design**: Modern UI/UX aur high-authority brand identity.\n\nAap apne project ya requirement ke baare mein batayein, hum mil kar aik clear technical roadmap banayein ge!`;
  }

  return `I'm **Aurex**, your digital consultant for Aurex Ventures 🤖\n\nThat's a great inquiry! At Aurex Ventures, we engineer high-impact digital solutions for ambitious brands:\n• **Next.js & React Engineering**: Ultra-fast web apps and websites built for 99+ PageSpeed and high conversion.\n• **AI Automations & Bots**: Custom intelligent agents that streamline workflows and scale 24/7 customer engagement.\n• **Design & Branding**: Modern Figma UI/UX prototypes and complete visual identities.\n\nCould you share a bit more detail about your vision or company? We'd love to help you build the right technical roadmap!`;
}
