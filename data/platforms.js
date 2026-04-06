const platforms = [
  {
    id:"khoros",name:"Khoros",category:"established",catLabel:"Established Platform",
    tagline:"Full-featured enterprise community with social customer care",
    uxApproach:[{type:"forum",label:"Traditional Forum"}],
    pricing:"~$50,000+/yr (custom quotes only)",target:"Enterprise",
    verdict:"Established leader, but watch post-acquisition direction",verdictType:"steady",website:"https://khoros.com",
    easeOfUse:6.5,qualityOfFeatures:8.5,integrations:8,dataPrivacySecurity:9,servicesSupport:8,reportsAnalytics:8.5,
    execution:{
      "Discussions":"Classic threaded forum. Topic-based boards with categories and sub-categories. Deep threading suits long technical support conversations. Content is highly searchable and persistent.",
      "Q&A":"Dedicated Q&A format with accepted answers, voting, and best-answer selection. Separate from general discussion boards.",
      "Ideation":"Purpose-built ideation boards with voting, status tracking, and admin workflow for feature requests.",
      "Knowledge Base":"Integrated KB with articles, guides, and how-tos. Can be community-contributed or admin-curated.",
      "Content Format":"Forum-first. Threaded posts organised by boards/categories. Also supports blogs and contests/quizzes.",
      "AI Approach":"Post-acquisition AI suite: AI Expert Help (instant responses), AI Discovery Defender (keeps content visible to AI search engines), AI Community Orchestration (assists CMs with content and moderation). Pre-built spam and profanity models.",
      "Events":"No native events. Requires third-party integration.",
      "Mobile":"Native mobile app included.",
      "Unique Features":"37+ language support. AI Discovery Defender ensures community content stays discoverable by AI answer engines (Google AI Overviews, ChatGPT, etc.) - unique in the market."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":true,"Knowledge Base":true,"Blogs":true,
      "Gamification":true,"Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":true,"Events":false,
      "AI Content Moderation":true,"AI Search / Answers":true,"Self-Hosted Option":false,"Multi-language (37+)":true
    },
    keyIntegrations:["Salesforce (premium bi-directional connector)","Google Analytics 360","Adobe Analytics / Experience Manager","Slack","Zendesk","Marketo"],
    examples:[
      {name:"Samsung Community",url:"https://community.samsung.com",desc:"Global customer support and discussion community"},
      {name:"Spotify Community",url:"https://community.spotify.com",desc:"Feature requests, troubleshooting, and music discussion"},
      {name:"HP Community",url:"https://community.hp.com",desc:"Long-running support community for printers, laptops, and PCs"}
    ],
    recentNews:[
      {date:"May 2025",text:"IgniteTech acquires Khoros to transform customer connections in the AI answer engine era"},
      {date:"Q3 2025",text:"Launched AI Expert Help, AI Discovery Defender (keeps content visible to AI search engines), and AI Brand Defender"},
      {date:"Q3 2025",text:"AI Community Orchestration: AI assists with content generation, moderation, sentiment analysis"},
      {date:"Jul 2025",text:"Strategic shift from search-driven support to AI-powered community ecosystems"}
    ],
    strengths:["Most comprehensive feature set for large enterprises","37+ language support out of the box","Deep Salesforce bi-directional connector","Strong AI moderation and spam filtering","Proven at massive scale (Samsung, Spotify)"],
    considerations:["Premium pricing - starts around $50k/yr","No native events capability","No self-hosted option","IgniteTech acquisition may bring strategic changes","90-day auto-renewal opt-out clause in contracts"],
    editorial:"Khoros remains the most feature-complete enterprise community platform on the market. If you're a large organisation with complex needs, multilingual requirements, and a big budget, it's hard to beat. The Salesforce connector is genuinely best-in-class. But the IgniteTech acquisition introduces uncertainty — we're watching closely to see whether the new ownership accelerates innovation or strips the product for efficiency. The pricing also puts it out of reach for most mid-market buyers. If you can afford it and need the depth, it delivers. If you're not a Fortune 500, look elsewhere."
  },
  {
    id:"gainsight",name:"Gainsight Customer Communities",category:"established",catLabel:"Established Platform",
    tagline:"Customer success-focused community platform (formerly inSided)",
    uxApproach:[{type:"forum",label:"Traditional Forum"},{type:"feed",label:"Product Updates Feed"}],
    pricing:"Custom (3 tiers: Professional, Business, Enterprise)",target:"Mid-Market / Enterprise",
    verdict:"Rising fast. Strong product momentum and analyst recognition",verdictType:"rising",website:"https://www.gainsight.com/customer-communities/",
    easeOfUse:7.5,qualityOfFeatures:8,integrations:8.5,dataPrivacySecurity:8,servicesSupport:8.5,reportsAnalytics:8,
    execution:{
      "Discussions":"Forum-style with threaded topics. Organised by categories. Focused on customer-to-customer support and peer engagement rather than general discussion.",
      "Q&A":"Integrated into forum topics. Less distinct from discussions than Khoros or Vanilla.",
      "Ideation":"Strong ideation workflow with voting, commenting, and real-time status tracking. Can filter ideas by account value (dollar impact) - unique for prioritising enterprise customer requests.",
      "Knowledge Base":"Drag-and-drop article organisation. Smart search suggestions. Content rating system.",
      "Content Format":"Forum-based with a dedicated Product Updates feed. The Product Updates hub is a distinct content type where companies publish release notes and announcements - unique to Gainsight CC.",
      "AI Approach":"Moderation AI Agent (via ModerateKit acquisition) auto-classifies posts as Approved/Pending/Trashed using your community's tone. AI Translations for one-click multilingual. AI Answers in open beta (Q1 2026).",
      "Events":"Basic built-in event management tools.",
      "Mobile":"No native mobile app. Mobile-responsive web only.",
      "Unique Features":"Product Updates hub for publishing release notes. Ideation filtered by account value. Deep Gainsight CS integration feeds community activity into customer health scores."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":true,"Knowledge Base":true,"Product Updates Hub":true,
      "Gamification":true,"Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":false,"Events":true,
      "AI Content Moderation":true,"AI Search / Answers":"Partial","Self-Hosted Option":false,"Multi-language":true
    },
    keyIntegrations:["Gainsight CS (customer health scoring)","Gainsight PX (in-app knowledge bots)","Salesforce (incl. Lightning Web Components)","Zendesk","Jira","Slack","Zapier","Skilljar"],
    examples:[
      {name:"Gainsight GameChanger Community",url:"https://community.gainsight.com",desc:"Their own community, powered by their own platform"},
      {name:"Figma Community",url:"https://forum.figma.com",desc:"Product feedback and peer support for design tool users"},
      {name:"Airtable Community",url:"https://community.airtable.com",desc:"Customer community for the no-code database platform"}
    ],
    recentNews:[
      {date:"Oct 2025",text:"Named Leader in IDC MarketScape: Worldwide Enterprise Community Applications 2025"},
      {date:"2025",text:"Launched Moderation AI Agent (via ModerateKit acquisition) - auto-classifies posts in real time"},
      {date:"2025",text:"AI Translations GA - one-click translation of posts into user's preferred language"},
      {date:"Q1 2026",text:"AI Answers enters open beta; new Subscription dashboards; categorised Ideas and Product Updates"},
      {date:"2025",text:"60+ new customers including Airtable, Figma, Payscale, and Zoom"}
    ],
    strengths:["Deep integration with Gainsight CS for customer health scoring","Strong product feedback and ideation workflow","AI Moderation Agent classifies posts automatically","IDC MarketScape Leader 2025","Product Updates hub is unique and useful"],
    considerations:["No native mobile app","AI Answers still in beta (Q1 2026)","Best value when paired with full Gainsight suite","Pricing not publicly disclosed","Community is one product in a larger CS platform"],
    editorial:"Gainsight CC is the platform we're most excited about right now. The inSided heritage gives it solid community fundamentals, and the Gainsight integration creates a genuinely unique value proposition — your community activity feeds directly into customer health scores. The IDC MarketScape recognition is well-deserved. The AI Moderation Agent is practical and already working in production. The main caveat: it's strongest when you're already in the Gainsight ecosystem. As a standalone community platform without the CS suite, the value proposition weakens. If you're a B2B SaaS company already using Gainsight, this should be your first call."
  },
  {
    id:"higherlogic",name:"Higher Logic Vanilla",category:"established",catLabel:"Established Platform",
    tagline:"Proven B2B community platform for support-driven engagement",
    uxApproach:[{type:"forum",label:"Traditional Forum"},{type:"hybrid",label:"Q&A Hybrid"}],
    pricing:"Custom (3 tiers: Corporate, Enterprise, Enterprise Plus)",target:"Mid-Market / Enterprise",
    verdict:"Solid and reliable. Steady performer in B2B support communities",verdictType:"steady",website:"https://www.higherlogic.com/vanilla/",
    easeOfUse:7.5,qualityOfFeatures:8,integrations:7.5,dataPrivacySecurity:8,servicesSupport:8,reportsAnalytics:7.5,
    execution:{
      "Discussions":"Traditional threaded forum with categories. Clean, focused interface. Strong for B2B support communities where searchability matters.",
      "Q&A":"Distinct Q&A content type with accepted answers and AI-suggested answers from historical content. The Q&A format is more differentiated from discussions than most platforms.",
      "Ideation":"Ideation boards with voting. Less sophisticated workflow than Gainsight CC's dollar-value filtering.",
      "Knowledge Base":"Structured KB for self-service. Integrates with forum Q&A so resolved questions can become KB articles.",
      "Content Format":"Forum-first with distinct Q&A. No native blogs. Widget Builder (React/TypeScript IDE with live preview) lets developers build completely custom content experiences - unique in the market.",
      "AI Approach":"AI Search Assistant using RAG - conversational answers sourced across community content, uploaded docs, and org knowledge with source attribution. AI Bot Shield detects and blocks bot activity. AI Suggested Tags and Sentiment Analysis.",
      "Events":"No native events. Zoom integration enables one-click event registration from within community.",
      "Mobile":"No native mobile app. Mobile-responsive web only.",
      "Unique Features":"Widget Builder is a built-in IDE using React + TypeScript with live preview, version control, and support for third-party APIs. 50+ prebuilt widgets. Best Zendesk integration of any platform (bi-directional, federated search, ticket escalation)."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":true,"Knowledge Base":true,"Blogs":false,
      "Gamification":true,"Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":false,"Events":false,
      "AI Content Moderation":true,"AI Search / Answers":true,"Self-Hosted Option":false,"Multi-language":"Partial"
    },
    keyIntegrations:["Zendesk (deep bi-directional integration)","Salesforce","Slack","Zoom (one-click event registration)","Zapier","ServiceNow","Jira","Aha!"],
    examples:[
      {name:"Airtable Community",url:"https://community.airtable.com",desc:"User community for the no-code platform (Vanilla-powered)"},
      {name:"DigitalOcean Community",url:"https://www.digitalocean.com/community",desc:"Developer tutorials and Q&A community"},
      {name:"Malwarebytes Forums",url:"https://forums.malwarebytes.com",desc:"Long-standing support community"}
    ],
    recentNews:[
      {date:"Jun 2025",text:"Launched AI Search Assistant using RAG - conversational answers from community content and docs"},
      {date:"Dec 2025",text:"Named Marius Ciortea (ex-IBM) as Chief Community Officer"},
      {date:"2025",text:"Widget Builder launched: built-in React/TypeScript IDE with live preview for custom components"},
      {date:"2025",text:"AI Bot Shield for detecting and blocking bot activity"},
      {date:"Mar 2026",text:"TLI selects Higher Logic for Autism Knowledge Gateway community"}
    ],
    strengths:["Best-in-class Zendesk integration for support communities","Widget Builder (React/TypeScript IDE) for deep customisation","AI Search Assistant with RAG technology","Dedicated Customer Success team on all plans","Strong in B2B support community use cases"],
    considerations:["No native mobile app","No built-in events feature","Limited multi-language vs Khoros","Analytics less advanced than competitors","No blog functionality built in"],
    editorial:"Higher Logic Vanilla is the quiet achiever in this space. It doesn't generate the most buzz, but organisations running it tend to be satisfied. The Zendesk integration is the best we've seen from any platform — if Zendesk is your support tool, this is probably your community platform. The Widget Builder is genuinely impressive for teams with developer resources — it's a real IDE, not a drag-and-drop toy. The AI Search Assistant with RAG is practical and well-implemented. Where it falls short: no mobile app, no events, and the analytics feel a generation behind Khoros or Salesforce. It's a workhorse, not a showpiece."
  },
  {
    id:"salesforce",name:"Salesforce Experience Cloud",category:"established",catLabel:"Established Platform",
    tagline:"CRM-native community for organisations deep in the Salesforce ecosystem",
    uxApproach:[{type:"hybrid",label:"Configurable (Forum/Portal/Feed)"}],
    pricing:"Per-login ($2-$15) or per-member ($5-$35/mo) by license type",target:"Enterprise",
    verdict:"Dominant if you're in the ecosystem. Overkill if you're not",verdictType:"steady",website:"https://www.salesforce.com/products/experience-cloud/",
    easeOfUse:5,qualityOfFeatures:7.5,integrations:9.5,dataPrivacySecurity:9,servicesSupport:7,reportsAnalytics:8.5,
    execution:{
      "Discussions":"Fully configurable - can be traditional forum, Chatter-style feed, or portal-style. Experience Builder lets you design any layout. The flexibility is powerful but means more setup complexity.",
      "Q&A":"Q&A available via Chatter Questions or custom Lightning components. Not as purpose-built as dedicated community Q&A.",
      "Ideation":"Ideas object with voting. Functional but not as refined as dedicated ideation platforms.",
      "Knowledge Base":"Salesforce Knowledge fully integrated. Articles surface in communities, cases, and search. Strongest when paired with Service Cloud.",
      "Content Format":"Completely configurable via Experience Builder (drag-drop). Can create forum, feed, portal, or hybrid layouts. Aura and LWR (Lightning Web Runtime) site types. The most flexible but most complex to set up.",
      "AI Approach":"Einstein AI for search, recommendations, and chatbots. Agentforce autonomous AI agents can handle multi-step workflows (case resolution, onboarding). Spring '26 adds GEO so community pages are discoverable by AI search engines. $2/conversation for Agentforce.",
      "Events":"Salesforce Scheduler integration. Events are a native Salesforce object. Can build full event management with custom development.",
      "Mobile":"Mobile Publisher creates native iOS/Android apps from Experience Cloud sites.",
      "Unique Features":"The only platform where community data lives natively alongside CRM data - no sync, no middleware. Every interaction can trigger sales, service, or marketing workflows. Experience Builder creates any layout without code. But: you're locked into the Salesforce ecosystem."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":true,"Knowledge Base":true,"Experience Builder (drag-drop)":true,
      "Gamification":true,"Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":true,"Events":true,
      "AI Search (Einstein)":true,"AI Bots (Agentforce)":true,"Self-Hosted Option":false,"Multi-language":true
    },
    keyIntegrations:["Sales Cloud","Service Cloud","Marketing Cloud","Data Cloud","Commerce Cloud","Slack","MuleSoft","AppExchange (thousands of apps)"],
    examples:[
      {name:"Salesforce Trailblazer Community",url:"https://trailblazer.salesforce.com",desc:"Massive community for Salesforce admins, devs, and users"},
      {name:"Sonos Community",url:"https://en.community.sonos.com",desc:"Customer support forums for audio products"},
      {name:"T-Mobile Community",url:"https://community.t-mobile.com",desc:"Customer support and discussion community"}
    ],
    recentNews:[
      {date:"Feb 2026",text:"Spring '26: Generative Engine Optimization (GEO) - community pages discoverable by ChatGPT, Perplexity, Gemini"},
      {date:"Feb 2026",text:"Spring '26: Dynamic redirects on Aura sites, session persistence for authenticated users"},
      {date:"Jul 2025",text:"Summer '25: Major platform upgrades alongside Agentforce rollout"},
      {date:"2025-26",text:"Agentforce live with 12,000+ customers - AI agents for community workflows at $2/conversation"}
    ],
    strengths:["Unmatched integration depth within Salesforce ecosystem","Flexible licensing (per-login or per-member)","Native CRM data access without middleware","Agentforce AI agents for workflow automation","Experience Builder for no-code page creation"],
    considerations:["Requires deep Salesforce ecosystem commitment","Community is one module in a massive platform - complexity overhead","Community-specific UX lags dedicated vendors","Implementation typically requires SI partners","Services and support can feel impersonal"],
    editorial:"Salesforce Experience Cloud is the most polarising platform in this comparison. If your organisation lives in Salesforce, the native data integration is transformative — community interactions flow into cases, opportunities, and reports without any middleware. But the total cost of ownership is brutal: licensing, implementation (you'll almost certainly need an SI partner), and ongoing maintenance add up fast. The community-specific UX also lags dedicated vendors — it feels like a CRM that happens to have a community module, because that's exactly what it is. We recommend it only when deep CRM integration is a non-negotiable requirement. Otherwise, a dedicated platform will serve your community members better."
  },
  {
    id:"verint",name:"Verint Community",category:"established",catLabel:"Established Platform",
    tagline:"Enterprise community with strong moderation and CX suite integration",
    uxApproach:[{type:"forum",label:"Traditional Forum"}],
    pricing:"Custom enterprise quotes only",target:"Enterprise",
    verdict:"Declining momentum. Falling behind on innovation and market presence",verdictType:"declining",website:"https://www.verint.com/engagement-channels/communities/",
    easeOfUse:6,qualityOfFeatures:7.5,integrations:7,dataPrivacySecurity:8.5,servicesSupport:7.5,reportsAnalytics:8,
    execution:{
      "Discussions":"Traditional threaded forum inherited from Telligent. Category-based boards. Mature forum infrastructure but older UX patterns.",
      "Q&A":"Q&A built into forum structure. Less distinct from general discussions than newer platforms.",
      "Ideation":"Idea exchange with voting and submission. Functional but not the primary strength.",
      "Knowledge Base":"Strong KB integrated with Verint's broader Knowledge Management suite. Articles, FAQs, how-tos.",
      "Content Format":"Forum-first with blogs, Q&A, and group spaces. Traditional feel. Content is structured but UX feels older than newer entrants.",
      "AI Approach":"Da Vinci AI engine provides intelligent search, auto-tagging, content classification, sentiment analysis, and chatbots that surface community answers. Open platform strategy lets you plug in multiple AI models rather than being locked to one vendor - unique approach.",
      "Events":"No native events feature.",
      "Mobile":"Native mobile app available.",
      "Unique Features":"Open AI model strategy (not locked to one vendor). Strongest case deflection analytics - measures exactly how community content reduces support tickets with ROI attribution. Part of broader Verint CX suite (WFM, engagement management)."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":true,"Knowledge Base":true,"Blogs":true,
      "Gamification":true,"Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":true,"Events":false,
      "AI Content Moderation":true,"AI Search / Answers":true,"Self-Hosted Option":false,"Multi-language":true
    },
    keyIntegrations:["Verint CX suite (WFM, Knowledge Mgmt, Engagement Mgmt)","Salesforce","Microsoft Dynamics","REST APIs"],
    examples:[
      {name:"Verint Connect",url:"https://community.verint.com",desc:"Verint's own customer community on their own platform"},
      {name:"Microsoft Tech Community",url:"https://techcommunity.microsoft.com",desc:"Used Verint/Telligent technology for technical community infrastructure"},
      {name:"Verizon Community",url:"https://community.verizon.com",desc:"Customer engagement and support forums"}
    ],
    recentNews:[
      {date:"2024-25",text:"Verint Da Vinci AI expanded - intelligent search, auto-tagging, sentiment analysis in community"},
      {date:"2025",text:"Open platform AI strategy: plug in multiple AI models, not locked to one vendor"},
      {date:"2025",text:"Continued investment in case deflection analytics measuring community ROI on ticket reduction"}
    ],
    strengths:["Part of broader Verint CX ecosystem","Strong moderation and compliance tools","Da Vinci AI for sentiment analysis and auto-tagging","Good case deflection analytics and ROI measurement","Open AI strategy - not locked to one AI vendor"],
    considerations:["No public pricing - enterprise sales process only","Fewer third-party integrations than competitors","Innovation pace slower than newer entrants","No native events feature","Telligent heritage means older underlying architecture"],
    editorial:"We have to be honest: Verint Community is losing ground. The Telligent heritage shows in an aging UX that hasn't kept pace with modern expectations. The Da Vinci AI capabilities are genuinely interesting — especially the open AI model strategy — and the case deflection analytics remain strong. But the broader platform feels like it's receiving less investment than the competition. If you're already in the Verint CX ecosystem, it still makes sense as part of that stack. But we wouldn't recommend starting a new community on Verint today unless the CX suite integration is the primary driver. The market has moved on."
  },
  {
    id:"bettermode",name:"Bettermode",category:"newgen",catLabel:"New Generation",
    tagline:"Modern, API-first community with flexible content types and feed-style UX",
    uxApproach:[{type:"feed",label:"Social Feed / Wall"}],
    pricing:"From $399/mo (Starter) to $1,500/mo (Growth); Premium custom",target:"SMB / Mid-Market",
    verdict:"Watch this space. Modern approach but needs to prove enterprise readiness",verdictType:"watch",website:"https://www.bettermode.com",
    easeOfUse:8.5,qualityOfFeatures:8,integrations:7.5,dataPrivacySecurity:7,servicesSupport:7,reportsAnalytics:7,
    execution:{
      "Discussions":"Social feed/wall-style. Content appears in a scrolling feed like LinkedIn or Facebook rather than threaded forum topics. Feels modern and drives casual engagement but content is harder to find months later.",
      "Q&A":"Q&A built into the feed. Users can post questions and receive answers, but it lives within the same feed UI rather than a dedicated Q&A section.",
      "Ideation":"Ideas as a content type within the feed. Voting and commenting. Less structured than Gainsight CC or Khoros ideation boards.",
      "Knowledge Base":"KB as a content space. Articles and resources. Organised by 'Spaces' rather than traditional categories.",
      "Content Format":"This is the key differentiator. Everything is a feed/wall. Spaces can be configured as Feeds, Q&A, Podcasts, Job Listings, Reviews, or Events. Liquid template engine for deep customisation. Design Studio for visual no-code layout. Very different from forum-based platforms.",
      "AI Approach":"AI-Powered Search and Ask AI (launched Mar 2025). Natural language questions answered from community content. AI content moderation and spam detection. Less mature than established vendors.",
      "Events":"Events as a content type within spaces. Basic event management with calendar.",
      "Mobile":"No native mobile app. Mobile-responsive web.",
      "Unique Features":"The only platform built entirely around a social feed/wall paradigm rather than forums. GraphQL API (not REST) for developer flexibility. Flexible content types mean you can create podcast directories, job boards, review sites, etc. within your community. Most affordable entry point ($399/mo)."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":true,"Knowledge Base":true,"Polls & Events":true,
      "Gamification":true,"Moderation Tools":true,"SSO (OAuth/JWT)":true,"GraphQL API":true,
      "Custom Branding":true,"Native Mobile App":false,"Events":true,
      "AI Content Moderation":true,"AI Search / Ask AI":true,"Self-Hosted Option":false,"Multi-language":true
    },
    keyIntegrations:["Zapier (8,000+ apps)","Make (Integromat)","Salesforce","Intercom","Slack","Shopify","Stripe","Google Analytics","Mixpanel"],
    examples:[
      {name:"Pipedrive Community",url:"https://community.pipedrive.com",desc:"CRM user community for peer support and discussion"},
      {name:"Bettermode Community",url:"https://bettermode.com/community",desc:"Their own community, showcasing the platform"},
      {name:"Outgrow Community",url:"https://community.outgrow.co",desc:"Customer community for the marketing tool"}
    ],
    recentNews:[
      {date:"Mar 2025",text:"Launched AI-Powered Search and Ask AI - natural language answers from community content"},
      {date:"2025",text:"New pricing tiers (Starter $399/mo, Growth $1,500/mo, Premium custom) replacing old structure"},
      {date:"Mar 2026",text:"Free plan sunset - all free communities removed; users must upgrade or export content"}
    ],
    strengths:["Most affordable entry point of all platforms reviewed","Modern social feed UX (wall-style, not forum-style)","GraphQL API for developer flexibility","Design Studio for no-code visual customisation","Flexible content types: feeds, podcasts, jobs, reviews, polls"],
    considerations:["No native mobile app","Smaller company with less enterprise track record","Free plan being discontinued (Mar 2026)","Data privacy and security less mature than enterprise vendors","Smaller customer base than established players"],
    editorial:"Bettermode represents a genuine philosophical alternative to the forum-based platforms that dominate this space. The feed/wall approach feels more like a modern social network than a traditional community — and for some use cases, that's exactly right. The GraphQL API and Design Studio give technical teams real flexibility. The pricing is the most accessible in this comparison. But the feed-first approach has a real trade-off: content discoverability suffers over time. Great for engagement, less great for building a searchable knowledge repository. Best suited for product communities where engagement matters more than deep knowledge management. Not yet proven at enterprise scale."
  },
  {
    id:"bevy",name:"Bevy",category:"newgen",catLabel:"New Generation",
    tagline:"Community events platform expanding into all-in-one community management",
    uxApproach:[{type:"events",label:"Events-First"},{type:"feed",label:"Community Hub Feed"}],
    pricing:"Custom enterprise pricing (estimated mid-five figures/yr)",target:"Mid-Market / Enterprise",
    verdict:"Rising in events. Still proving itself as a full community platform",verdictType:"rising",website:"https://www.bevy.com",
    easeOfUse:7,qualityOfFeatures:7.5,integrations:7.5,dataPrivacySecurity:7.5,servicesSupport:8,reportsAnalytics:7.5,
    execution:{
      "Discussions":"Community Hub discussions are newer and still maturing. Not the core strength - events are. Forum/discussion features are functional but lack the depth of dedicated forum platforms.",
      "Q&A":"Basic Q&A within community hub. Not a primary capability.",
      "Ideation":"No native ideation features.",
      "Knowledge Base":"Basic content/resource sharing within community hub. Not a structured KB.",
      "Content Format":"Events-first. The primary experience is browsing, registering for, and attending events. Community Hub adds feed-style discussions and content sharing on top. Chapter pages organise local groups.",
      "AI Approach":"AI-powered community insights and analytics. Engagement scoring and ROI measurement. Less focused on content AI (search, moderation) and more on strategic insights for community managers.",
      "Events":"This is where Bevy dominates. Full virtual, hybrid, and in-person event management. Chapter-based programme management across hundreds of cities. Speaker management, session scheduling, ticketing, branded event pages. Virtual events with breakout rooms, networking lounges, expo booths. Unmatched at scale.",
      "Mobile":"No native mobile app. Mobile-responsive web.",
      "Unique Features":"Chapter/local group management at massive scale (Google runs 1,000+ GDG chapters on Bevy). Owns CMX, the community industry body. Event ROI attribution analytics. The only platform purpose-built for community-led events programmes. Expanding into broader community management."
    },
    communityFeatures:{
      "Discussion Forums":"Partial","Q&A":"Partial","Ideation / Ideas":false,"Knowledge Base":"Partial","Event Management":true,
      "Gamification":"Partial","Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":false,"Virtual Events":true,
      "AI Community Insights":true,"Chapter / Local Groups":true,"Self-Hosted Option":false,"Multi-language":"Partial"
    },
    keyIntegrations:["Salesforce","HubSpot","Slack","Marketo","Zapier","Okta","Google Analytics","Zoom","Eloqua"],
    examples:[
      {name:"Salesforce Trailblazer Community Groups",url:"https://trailblazercommunitygroups.com",desc:"Massive global chapter-based events programme across hundreds of cities"},
      {name:"Atlassian Community Events",url:"https://ace.atlassian.com",desc:"Global user groups for Jira, Confluence, and other products"},
      {name:"Google Developer Groups (GDG)",url:"https://gdg.community.dev",desc:"1,000+ chapters globally for developer meetups and events"}
    ],
    recentNews:[
      {date:"2024-25",text:"Expanding from events-only to all-in-one community platform with discussions, content, and member directories"},
      {date:"2025",text:"AI-powered community insights and analytics for ROI measurement"},
      {date:"2025",text:"Continued enterprise focus on security, compliance, and scalability"}
    ],
    strengths:["Dominant platform for community-led events at scale","Owns CMX (the community industry body) - unique strategic position","Proven with world's largest community programmes (Salesforce, Google, Atlassian)","Chapter/local group management is unmatched","Strong event ROI and attribution analytics"],
    considerations:["Forum/discussion features are newer and less mature than dedicated platforms","Not yet a full community platform - events DNA still dominant","No native ideation or knowledge base features","Custom pricing only - no self-serve","Expanding scope may stretch focus"],
    editorial:"Bevy is the undisputed champion of community events at scale. The fact that Salesforce, Google, and Atlassian all run their community events programmes on Bevy tells you everything about its events capability. The CMX ownership is strategically brilliant — they own the community profession's industry body while selling the tools. But let's be clear: Bevy is still primarily an events platform. The community hub features (discussions, content) are functional but years behind dedicated community platforms. If events are your primary community strategy, Bevy is the obvious choice. If you need a forum or knowledge base with events bolted on, look elsewhere and integrate Bevy for events."
  },
  {
    id:"hivebrite",name:"Hivebrite",category:"newgen",catLabel:"New Generation",
    tagline:"Alumni and membership community platform expanding into enterprise",
    uxApproach:[{type:"hybrid",label:"Member Directory + Feed"},{type:"events",label:"Events-Centric"}],
    pricing:"Custom (~$5,000 - $30,000+/yr based on members)",target:"Mid-Market / Enterprise",
    verdict:"Strong in its niche. Best choice for alumni and membership orgs",verdictType:"steady",website:"https://www.hivebrite.com",
    easeOfUse:7.5,qualityOfFeatures:7.5,integrations:6.5,dataPrivacySecurity:8,servicesSupport:7,reportsAnalytics:7,
    execution:{
      "Discussions":"Discussion forums available but less sophisticated than dedicated community platforms. Not the primary use case - member networking is.",
      "Q&A":"Basic Q&A within discussions. Not a distinct content type.",
      "Ideation":"No dedicated ideation features.",
      "Knowledge Base":"Content management / CMS for news, articles, and newsletters. More of a publishing tool than a structured KB.",
      "Content Format":"Member directory-centric. The primary experience is finding and connecting with other members (alumni, peers). Discussions, events, and content sit alongside a rich member directory with professional profiles. Very different from forum-first or feed-first platforms.",
      "AI Approach":"AI for content suggestions, engagement insights, and smart mentoring matching. Less mature than enterprise-focused AI but practical for membership use cases.",
      "Events":"Native event management with ticketing, registration, and virtual/hybrid support. Events are a core part of the alumni/membership experience, not a bolt-on.",
      "Mobile":"Native branded iOS and Android apps included. Strongest white-labelling of any platform - no 'powered by' branding.",
      "Unique Features":"Purpose-built membership features no other platform has: structured mentoring programme matching, fundraising/donation campaigns, integrated job board, and member directory with professional networking. All native, not bolt-on. Originated in French business school alumni networks (INSEAD, HEC Paris)."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":"Partial","Member Directory":true,"Knowledge Base":"Partial","Event Management":true,
      "Gamification":"Partial","Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":true,"Job Board":true,
      "Mentoring Programmes":true,"Fundraising / Donations":true,"Self-Hosted Option":false,"Multi-language":true
    },
    keyIntegrations:["Salesforce","HubSpot","SSO providers","Payment gateways","Custom APIs"],
    examples:[
      {name:"INSEAD Alumni Network",url:"https://community.insead.edu",desc:"Global alumni network for one of the world's top business schools"},
      {name:"HEC Paris Alumni",url:"https://www.hecalumni.fr",desc:"Alumni engagement for the leading French business school"},
      {name:"WWF (World Wildlife Fund)",url:"https://www.wwf.org.uk",desc:"Supporter and volunteer community management"}
    ],
    recentNews:[
      {date:"2025",text:"AI-powered features for content suggestions, engagement insights, and smart mentoring matching"},
      {date:"2025",text:"Enhanced native mobile apps with push notifications"},
      {date:"2025",text:"Expanded beyond Europe into North America and Asia-Pacific markets"},
      {date:"2025",text:"Positioning shift from 'alumni platform' to general 'community management platform'"}
    ],
    strengths:["Purpose-built for alumni/membership organisations - features like mentoring, fundraising, job boards are native","Strongest white-labelling of any platform (fully branded apps, no 'powered by')","All-in-one for membership orgs: CMS + CRM + events + fundraising + jobs","GDPR-compliant European origins","Native mobile apps included"],
    considerations:["Forum/discussion features less sophisticated than dedicated community platforms","Fewer third-party integrations than competitors","Academic/alumni DNA may not suit all enterprise use cases","Smaller engineering team than established vendors","Analytics less advanced"],
    editorial:"Hivebrite is the clear winner for alumni networks, associations, and membership organisations. Features like mentoring programme management, fundraising, and job boards are native — not afterthoughts. The white-labelling is the best in the market, and the branded mobile apps are a genuine differentiator. However, we see Hivebrite trying to position itself as a general-purpose community platform, and that's a stretch. The discussion and content features lag behind dedicated community vendors. If you're a university, professional association, or membership organisation, Hivebrite is purpose-built for you. If you're a SaaS company looking for customer community, there are better options."
  },
  {
    id:"discourse",name:"Discourse",category:"opensource",catLabel:"Open Source",
    tagline:"The most popular open-source forum platform, used by developer and tech communities worldwide",
    uxApproach:[{type:"forum",label:"Modern Forum"},{type:"hybrid",label:"Chat Hybrid"}],
    pricing:"Free (self-hosted) or $50-$300/mo hosted; Enterprise from $8,000/yr",target:"All sizes",
    verdict:"Rising. The open-source leader with real AI momentum",verdictType:"rising",website:"https://www.discourse.org",
    easeOfUse:7,qualityOfFeatures:8.5,integrations:7,dataPrivacySecurity:8,servicesSupport:6.5,reportsAnalytics:6.5,
    execution:{
      "Discussions":"Modern threaded forum with infinite scroll, real-time updates, and a flat-ish threading model (replies quote parent context rather than deep nesting). Feels contemporary compared to traditional phpBB-style forums. Categories and tags for organisation. Trust levels auto-promote active members.",
      "Q&A":"Dedicated Q&A plugin with accepted answers and voting. Can be enabled per category. Functional but not as central as in Vanilla.",
      "Ideation":"No native ideation. Can be approximated with voting plugins but not purpose-built.",
      "Knowledge Base":"Docs-style knowledge base available. Wiki-mode lets any post become collaboratively editable. Not as structured as dedicated KB platforms.",
      "Content Format":"Forum-first but modernised. Infinite scroll, real-time presence indicators, and live updates make it feel more dynamic than traditional forums. Chat channels add real-time messaging alongside async discussion. Rich markdown editor with drag-drop uploads.",
      "AI Approach":"AI-powered features include AI search, AI-generated topic summaries, AI-suggested post improvements, AI auto-tagging, and AI-powered spam detection. Built-in AI bot that can answer questions from community content. Active AI development roadmap.",
      "Events":"No native events. Plugin ecosystem can add basic event functionality.",
      "Mobile":"Progressive Web App (PWA) with native-like mobile experience. Discourse Hub app available for iOS/Android to manage multiple Discourse communities.",
      "Unique Features":"Fully open source (GPL v2) - you own your data and can modify anything. Trust level system auto-promotes engaged members through 4 tiers, reducing moderation burden. Plugin ecosystem with 100+ community plugins. Chat channels alongside forum. Can self-host on any infrastructure. Massive community of developers extending the platform."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":"Partial","Knowledge Base":"Partial","Chat Channels":true,
      "Gamification":true,"Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":"Partial","Events":"Partial",
      "AI Content Moderation":true,"AI Search / Answers":true,"Self-Hosted Option":true,"Multi-language":true
    },
    keyIntegrations:["WordPress","Slack","GitHub","Zendesk","Zapier","OAuth/SAML SSO providers","Patreon","Custom via plugin API"],
    examples:[
      {name:"Meta Community Forums",url:"https://community.meta.discourse.org",desc:"Discourse's own community - the largest Discourse instance"},
      {name:"Docker Community Forums",url:"https://forums.docker.com",desc:"Developer community for container platform"},
      {name:"Figma Community Forum",url:"https://forum.figma.com",desc:"Design tool community for support and discussion"}
    ],
    recentNews:[
      {date:"2025",text:"Major AI feature rollout: AI search, topic summaries, suggested improvements, auto-tagging, and AI bot for answering questions"},
      {date:"2025",text:"Chat channels matured as first-class feature alongside async forum discussions"},
      {date:"2025",text:"Continued growth in developer and tech community adoption"},
      {date:"2025",text:"Discourse for Teams (managed enterprise) expanding with SLA and priority support"}
    ],
    strengths:["Fully open source - own your data, modify anything, no vendor lock-in","Most modern forum UX of any open-source option (infinite scroll, real-time, markdown)","Trust level system reduces moderation workload automatically","Active AI development with practical features already shipped","Massive plugin ecosystem and developer community","Can self-host on your own infrastructure for full control","Free to self-host - only pay for hosting costs"],
    considerations:["Self-hosted requires technical team for maintenance, upgrades, and security","Hosted pricing can add up for larger communities","No native ideation or structured knowledge base","Analytics/reporting less sophisticated than enterprise platforms","Services and support weaker than commercial vendors (unless on Enterprise plan)","Plugin quality varies - some community plugins are unmaintained"],
    editorial:"Discourse is the most interesting platform in this comparison for a specific reason: it's the only open-source option that genuinely competes with commercial vendors on quality. The UX is modern, the AI features are practical (not vapourware), and the trust level system is an elegant solution to moderation scaling. The plugin ecosystem means you can extend it in ways commercial vendors won't allow. Self-hosting gives you full data sovereignty. The trade-off is clear: you need technical resources to run it. If you have a dev team and want control, Discourse gives you more for less than any commercial alternative. If you want a managed service with hand-holding, the enterprise tier works but you're paying commercial prices for open-source software."
  },
  {
    id:"flarum",name:"Flarum",category:"opensource",catLabel:"Open Source",
    tagline:"Lightweight, elegant open-source forum for simple, fast community discussions",
    uxApproach:[{type:"forum",label:"Modern Minimal Forum"}],
    pricing:"Free (self-hosted only)",target:"SMB / Developer communities",
    verdict:"Niche option. Best for small communities wanting simplicity over features",verdictType:"watch",website:"https://flarum.org",
    easeOfUse:8,qualityOfFeatures:7,integrations:5,dataPrivacySecurity:7,servicesSupport:4,reportsAnalytics:4.5,
    execution:{
      "Discussions":"Clean, modern single-page app forum. Two-pane layout: discussion list on the left, conversation on the right. Fast and responsive. Feels like a lightweight, elegant forum stripped to essentials. Tags instead of categories (flat, not hierarchical).",
      "Q&A":"No native Q&A format. Discussions only. Community extensions can add basic Q&A features.",
      "Ideation":"No ideation features.",
      "Knowledge Base":"No knowledge base. Forum discussions only.",
      "Content Format":"Forum-only, deliberately minimal. Tag-based organisation (no nested categories). Single-page app architecture makes navigation fast. Markdown editor. The simplicity is the feature - no bloat, no feature creep. Very different philosophy from enterprise platforms.",
      "AI Approach":"No native AI features. Being open source, third-party AI integrations are possible via extensions but nothing official.",
      "Events":"No events features.",
      "Mobile":"Mobile-responsive web design. No native app. The SPA architecture works well on mobile.",
      "Unique Features":"Extreme simplicity and speed. Built on modern stack (PHP/Laravel backend, Mithril.js frontend). Extension-based architecture - core is minimal, add only what you need. Very fast page loads. Beautiful default design with minimal configuration. Lower resource requirements than Discourse for self-hosting. Best option when you want a clean, fast forum without enterprise complexity."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":false,"Ideation / Ideas":false,"Knowledge Base":false,"Blogs":false,
      "Gamification":"Partial","Moderation Tools":true,"SSO (SAML/OAuth)":"Partial","API Access":true,
      "Custom Branding":true,"Native Mobile App":false,"Events":false,
      "AI Content Moderation":false,"AI Search / Answers":false,"Self-Hosted Option":true,"Multi-language":true
    },
    keyIntegrations:["OAuth SSO","WordPress (via extension)","Mailgun/SMTP","Custom via extension API"],
    examples:[
      {name:"Flarum Community",url:"https://discuss.flarum.org",desc:"Flarum's own community and support forum"},
      {name:"NixOS Discourse Alternative",url:"https://discourse.nixos.org",desc:"Some NixOS community discussion moved to lighter alternatives"},
      {name:"Various indie/gaming communities",url:"https://discuss.flarum.org/d/22228",desc:"Used by smaller gaming, tech, and hobbyist communities"}
    ],
    recentNews:[
      {date:"2025",text:"Continued development of v2.0 with improved extension API and performance"},
      {date:"2025",text:"Growing extension ecosystem with community-contributed plugins"},
      {date:"2024",text:"Stable 1.x releases with focus on reliability and performance"}
    ],
    strengths:["Simplest, cleanest forum UX - deliberately minimal and fast","Fully open source and free - no licensing costs","Modern tech stack (Laravel + Mithril.js) - easy for developers to extend","Lower server requirements than Discourse for self-hosting","Beautiful default design out of the box","Extension architecture keeps core lean - add only what you need"],
    considerations:["No enterprise features (analytics, AI, ideation, KB, events)","Smaller community and ecosystem than Discourse","Self-hosted only - no managed hosting option from Flarum","Fewer extensions and less mature plugin ecosystem","No commercial support - community support only","Not suitable for large enterprise deployments","No native SSO/SAML without extensions"],
    editorial:"Flarum is the minimalist's choice. In a market where every vendor is adding features, Flarum strips back to essentials and does them beautifully. The two-pane SPA interface is fast and elegant. If you need a simple discussion forum without the enterprise overhead — for an internal team, a small product community, or a hobbyist group — Flarum delivers a better out-of-the-box experience than Discourse with far less server overhead. But it's not for enterprise use. No native AI, limited analytics, community-only support, and a smaller ecosystem. Think of it as the indie alternative: perfect for its niche, wrong for enterprise procurement."
  },
  {
    id:"circle",name:"Circle",category:"creator",catLabel:"Creator / Membership",
    tagline:"All-in-one community, courses, and monetisation platform for creators and brands",
    uxApproach:[{type:"feed",label:"Social Feed"},{type:"hybrid",label:"Courses + Chat"}],
    pricing:"From $49/mo (Basic) to $219/mo (Business); Enterprise custom",target:"Creators / SMB / Mid-Market",
    verdict:"Strong in the creator space. Increasingly competing for SaaS communities too",verdictType:"rising",website:"https://circle.so",
    easeOfUse:8.5,qualityOfFeatures:7.5,integrations:7,dataPrivacySecurity:6.5,servicesSupport:7,reportsAnalytics:6.5,
    execution:{
      "Discussions":"Feed/wall-style within Spaces. Posts appear in a social timeline, not threaded forum topics. Comments are nested but shallow. Feels like a modern social platform rather than a knowledge base.",
      "Q&A":"Not a dedicated format. Q&A happens within the feed. No accepted answers or voting system like dedicated Q&A platforms.",
      "Ideation":"No native ideation features.",
      "Knowledge Base":"No structured KB. Course content and pinned posts serve as reference material but there's no dedicated knowledge base module.",
      "Content Format":"Hybrid: feed/wall for discussions, structured modules for courses, real-time chat channels, and event pages. Spaces can be configured as different types (discussion, chat, event, course). The mix of async feed + real-time chat + courses in one platform is the key differentiator.",
      "AI Approach":"AI-powered search and content summarisation. AI copilot for admins helps with writing posts, moderation, and community reports. Smart activity feeds surface relevant content. AI is practical but less advanced than enterprise vendors.",
      "Events":"Native event scheduling with RSVP, live rooms, and streaming built in. Events are a core feature, not a bolt-on.",
      "Mobile":"iOS and Android apps. Custom-branded mobile app available on Enterprise tier.",
      "Unique Features":"The community + courses + monetisation combo in one platform. Native paywalls and membership tiers. Headless/embedded options for SaaS companies wanting to embed community into their own product. Spaces architecture lets you mix discussion, chat, courses, and events in one community."
    },
    communityFeatures:{
      "Discussion Spaces (Feed)":true,"Real-time Chat":true,"Course Builder":true,"Event Management":true,"Member Directory":true,
      "Monetisation / Paywalls":true,"Moderation Tools":true,"SSO (SAML/OAuth)":"Partial","API Access":"Partial",
      "Custom Branding":true,"Native Mobile App":true,"Gamification":false,
      "AI Search / Summaries":true,"Workflow Automations":true,"Self-Hosted Option":false,"White-label App":"Partial"
    },
    keyIntegrations:["Zapier","Stripe","Zoom","Slack","Mailchimp","ConvertKit","WordPress","Google Analytics","Meta Pixel","Webhooks"],
    examples:[
      {name:"SPI Pro (Pat Flynn)",url:"https://www.smartpassiveincome.com/community",desc:"Smart Passive Income creator community"},
      {name:"FWFG (Yoga With Adriene)",url:"https://fwfg.com",desc:"Find What Feels Good wellness community"},
      {name:"Teachable Creators",url:"https://circle.so",desc:"Teachable's creator community built on Circle"}
    ],
    recentNews:[
      {date:"2025",text:"Continued AI feature rollout: admin copilot, content summarisation, smart feeds"},
      {date:"2025",text:"Custom-branded mobile apps becoming accessible on lower tiers"},
      {date:"2025",text:"Headless/API-first capabilities expanded for SaaS embedding"},
      {date:"2025",text:"Increasingly competing with Bettermode and community platforms for SaaS use cases"}
    ],
    strengths:["All-in-one: community + courses + events + monetisation in one platform","Native paywalls and membership tiers — built for revenue","Modern, clean UX that non-technical users can manage","Mobile apps included (custom-branded on Enterprise)","Headless/embedded options for SaaS companies","Self-serve pricing — can start today without a sales call"],
    considerations:["Not a forum — poor for deep technical support or knowledge retention","No structured knowledge base","Limited SSO and API on lower tiers","Analytics less sophisticated than enterprise platforms","Creator-focused brand may not suit enterprise procurement","No native ideation or product feedback features"],
    editorial:"Circle has carved out a strong position as the platform where community meets commerce. If you're a creator, educator, or membership organisation that wants to charge for access, run courses, and build community in one place, Circle is the most polished option. The Spaces architecture is genuinely well-designed. But it's not an enterprise community platform — don't try to run a customer support community or a product feedback forum on Circle. It doesn't have the depth. Where Circle gets interesting is the headless/embedded play for SaaS companies. If that matures, it could compete with Bettermode and even Gainsight CC. Worth watching."
  },
  {
    id:"mighty",name:"Mighty Networks",category:"creator",catLabel:"Creator / Membership",
    tagline:"Community-powered courses and memberships with branded mobile apps and AI",
    uxApproach:[{type:"feed",label:"Social Feed"},{type:"hybrid",label:"Courses + Events"}],
    pricing:"From $41/mo (Community) to $179/mo (Business); Pro from ~$3,000/mo",target:"Creators / Educators / SMB",
    verdict:"Established in creator space. Mighty AI is a genuine differentiator",verdictType:"steady",website:"https://www.mightynetworks.com",
    easeOfUse:8,qualityOfFeatures:7,integrations:5.5,dataPrivacySecurity:6,servicesSupport:6.5,reportsAnalytics:5.5,
    execution:{
      "Discussions":"Social feed/wall within each Space. Activity feed similar to Facebook Groups. Not threaded — posts in a timeline with nested comments. Mobile-first design makes it feel more like a social app than a community platform.",
      "Q&A":"Q&A as a content type within the feed. No dedicated Q&A module with accepted answers.",
      "Ideation":"No ideation features.",
      "Knowledge Base":"No structured KB. Course content serves as the knowledge repository. Resources can be pinned but there's no dedicated knowledge base.",
      "Content Format":"Feed-first with structured courses layered in. Each Space has its own activity feed. Course Spaces have modules, lessons, quizzes, and certificates. Events can be virtual (with native live streaming) or in-person. The blend of social feed + structured learning is the core proposition.",
      "AI Approach":"Mighty AI (formerly Co-Host) is one of the most developed AI implementations in the creator platform space. Generates discussion prompts, drafts posts, answers member questions from existing content, summarises threads, suggests content, generates landing page copy, and provides engagement nudges for inactive members. AI is a strategic differentiator, not a checkbox.",
      "Events":"Native event hosting with RSVP, live video/streaming, and Zoom integration. Virtual and in-person. Events are a core feature.",
      "Mobile":"Native iOS and Android apps. Mighty Pro tier provides fully white-labeled apps published under the creator's own brand name in app stores — this is unique and a major differentiator.",
      "Unique Features":"The branded mobile app play is unique — on Pro tier, your community appears as its own app in the App Store, not 'Mighty Networks'. Combined with courses, monetisation, and AI, it's the most feature-rich creator platform. Gina Bianchini's 'anti-social-media' positioning (you own the audience, no algorithm manipulation) resonates with creators burned by platform dependence."
    },
    communityFeatures:{
      "Discussion Spaces (Feed)":true,"Real-time Chat":"Partial","Course Builder":true,"Event Management":true,"Member Directory":true,
      "Monetisation / Paywalls":true,"Moderation Tools":true,"SSO (SAML/OAuth)":"Partial","API Access":"Partial",
      "Custom Branding":true,"Branded Mobile App":true,"Gamification":"Partial",
      "Mighty AI":true,"Workflow Automations":true,"Self-Hosted Option":false,"Live Streaming":true
    },
    keyIntegrations:["Zoom","Zapier","Stripe","Google Analytics","Meta Pixel","WordPress","API (Business tier)"],
    examples:[
      {name:"FWFG (Yoga With Adriene)",url:"https://fwfg.com",desc:"Find What Feels Good wellness community and courses"},
      {name:"Marie Forleo's B-School",url:"https://www.marieforleo.com",desc:"Business education community for entrepreneurs"},
      {name:"TED Circles",url:"https://www.ted.com",desc:"TED's small-group discussion community programme"}
    ],
    recentNews:[
      {date:"2025",text:"Mighty AI expanded with Q&A answering from community content, discussion prompts, and landing page generation"},
      {date:"2025",text:"Mighty Pro custom-branded apps with more customisation options"},
      {date:"2025",text:"Course builder upgrades: better analytics, cohort management, certificates"},
      {date:"2025",text:"Increasingly competing with Circle and Skool in the creator platform space"}
    ],
    strengths:["Custom-branded mobile apps published under your own name in app stores (Pro tier)","Most developed AI for creator communities (Mighty AI)","All-in-one: community + courses + events + monetisation + live streaming","Mobile-first design with strong native app experience","Strong creator community and brand with Gina Bianchini's thought leadership","Course builder is more robust than Circle's for structured learning"],
    considerations:["Limited integrations — Zapier is the bridge for most workflows","No native deep CRM or support tool integrations","Analytics are basic compared to enterprise platforms","Not suited for enterprise support or product communities","API access only on Business tier and above","Pro tier (branded apps) is expensive (~$3,000+/mo)","Smaller developer ecosystem than open-source alternatives"],
    editorial:"Mighty Networks and Circle are the two leading platforms in the creator/membership community space, and they overlap significantly. Mighty's edge is the branded mobile app (your name in the App Store, not theirs) and Mighty AI, which is genuinely well-implemented. Circle's edge is cleaner UX and better embedding/API options. If mobile app presence matters to your community, Mighty wins. If you need a sleeker web experience and want to embed community into your own product, Circle wins. Neither is suited for enterprise customer support or product communities — they're purpose-built for creator businesses, educators, and membership organisations."
  },
  {
    id:"gradual",name:"Gradual",category:"newgen",catLabel:"New Generation",
    tagline:"All-in-one community platform unifying events, content, courses, and discussions in a single white-labeled experience",
    uxApproach:[{type:"feed",label:"Feed + Forums"},{type:"events",label:"Events-Native"}],
    pricing:"Custom quotes only (Pre-Seed stage, likely lower than established enterprise vendors). Courses as paid add-on.",target:"Mid-Market / Enterprise (associations, B2B communities)",
    verdict:"Compelling event-centric proposition. Very early stage — watch the trajectory",verdictType:"watch",website:"https://www.gradual.com",
    easeOfUse:7.5,qualityOfFeatures:7,integrations:5.5,dataPrivacySecurity:8,servicesSupport:7,reportsAnalytics:6.5,
    execution:{
      "Discussions":"Forum-based discussions organised into up to 20 boards. Posts appear in two feeds: 'Hot' (most engagement) and 'New' (chronological). Threaded comments. In-club forum boards allow discussions within chapters and interest groups. Not a traditional threaded forum — more of a modern feed-style approach with forum structure layered on top.",
      "Q&A":"No dedicated Q&A module for the community. Q&A exists only within livestream and meeting events, where hosts can facilitate moderated or open Q&A sessions. No persistent Q&A with accepted answers or voting.",
      "Ideation":"No ideation or feature-request capability. No voting boards or status tracking.",
      "Knowledge Base":"No structured knowledge base. Content is organised through blogs, resources, and video libraries — content publishing rather than knowledge management.",
      "Content Format":"Content hub approach. Organises content across blogs, podcasts, videos, resources, event recordings, and courses. Courses available as a paid add-on with up to 30 categories. Positions itself as unified content + community rather than discussion-first.",
      "AI Approach":"No meaningful AI capabilities. No AI-powered search, moderation, auto-answers, or content generation. A notable gap compared to competitors investing heavily in AI.",
      "Events":"This is Gradual's standout strength. Native meetings, webinars (350 attendee cap), livestreams (via RTMP), and multi-day conferences with multiple tracks. In-person, virtual, and hybrid. Every event connects with content, discussions, and member profiles to create a post-event engagement loop. Recordings publish to the content library. Webinars combine livestream and meeting — present and stream natively while bringing attendees on stage. Livestreams require external RTMP source (OBS, StreamYard) and are not natively recorded.",
      "Mobile":"Native iOS and Android apps ('Gradual - Community Platform'). White-labeled experience consistent with web platform.",
      "Unique Features":"Clubs, Chapters & Interest Groups: location-based chapters (Google Maps powered) and interest groups, each with their own forum boards, member lists, and leaders. Member matching and curated introductions. Powerful member segmentation for personalisation. The unified event-to-community pipeline is genuinely integrated rather than bolted on — events, recordings, content, courses, and discussions all live in one branded environment. Full white-label with custom domains as standard."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A (events only)":"Partial","Ideation / Ideas":false,"Knowledge Base":false,"Blogs / Content Library":true,
      "Gamification":false,"Moderation Tools":"Partial","SSO (SAML/OAuth)":true,"API Access":"Partial",
      "Custom Branding":true,"Native Mobile App":true,"Events (meetings/webinars/livestreams)":true,
      "AI Features":false,"Courses (paid add-on)":true,"Clubs / Chapters / Groups":true,"Self-Hosted Option":false
    },
    keyIntegrations:["CRM integrations (specifics unconfirmed)","RTMP streaming (OBS, StreamYard, Restream)","Google Maps (chapter locations)","Enterprise SSO providers"],
    examples:[
      {name:"Zwift Community",url:"https://www.zwift.com",desc:"Used Gradual for Summer Zwifterns intern programme"},
      {name:"Gradual Community",url:"https://community.gradual.com",desc:"Gradual's own community — live platform showcase"},
      {name:"23,000-person virtual conference",url:"https://www.gradual.com",desc:"Enterprise customer hosted large-scale virtual event with post-event engagement"}
    ],
    recentNews:[
      {date:"Jul 2025",text:"Major product update: new courses module, enhanced forums (comments, reactions, viewership data), improved analytics"},
      {date:"Oct 2025",text:"Q3 product showcase with new features and year-end roadmap preview"},
      {date:"2025",text:"Clubs and groups feature made available to all customers. Segments introduced for member personalisation"},
      {date:"2025",text:"iOS and Android mobile apps published"}
    ],
    strengths:["Best-in-class native event capabilities — meetings, webinars, livestreams, and multi-day conferences all connected to community","Genuine all-in-one unification: events, content, courses, discussions, and member directory in a single platform","Full white-label with custom domains as standard — community genuinely looks like your own product","Strong clubs/chapters/interest groups with location-based chapters and dedicated forums","SOC 2 Type II certified — enterprise-grade security","Member matching and curated introductions built in","Active product development with visible monthly/quarterly cadence"],
    considerations:["No dedicated Q&A, ideation, or knowledge base — missing table stakes for many B2B support communities","No gamification mechanics","No AI capabilities — a growing gap as competitors invest heavily in AI","Pre-Seed company with 1-10 employees — risk of limited support, slower feature development, uncertain long-term viability","Opaque pricing with no public information","Weak integration story — no public API docs, no confirmed Zapier/Salesforce/HubSpot connectors","Livestreams require external RTMP source and aren't natively recorded","Courses are a paid add-on, not core","Limited public social proof — few named customers"],
    editorial:"Gradual's core proposition is compelling: unify events, content, courses, and community in one white-labeled platform so organisations stop juggling separate tools. And on that specific promise, it delivers well — the event capabilities are genuinely strong, the white-labeling is thorough, and the clubs/chapters structure is thoughtful for association-style communities. But the platform has significant gaps that matter for most enterprise community use cases. No Q&A, ideation, knowledge base, gamification, or AI means Gradual is missing capabilities established platforms consider table stakes. The elephant in the room is company maturity: Pre-Seed with 1-10 employees is significantly earlier-stage than every other platform in this comparison. A strong choice for event-driven, white-labeled communities — especially associations. Not yet ready for traditional enterprise support/feedback communities. Watch for how quickly they close the AI and integration gaps."
  },
  {
    id:"thrive",name:"Higher Logic Thrive",category:"established",catLabel:"Established Platform",
    tagline:"Association engagement suite combining community, email automation, and deep AMS integrations",
    uxApproach:[{type:"forum",label:"Forum + Portal"},{type:"hybrid",label:"Member Portal"}],
    pricing:"Custom (~$20,000 - $100,000+/yr based on modules and member count)",target:"Associations / Nonprofits / Membership Orgs",
    verdict:"Dominant in associations. The AMS integration depth is unmatched",verdictType:"steady",website:"https://www.higherlogic.com/thrive/",
    easeOfUse:6,qualityOfFeatures:7,integrations:9,dataPrivacySecurity:8,servicesSupport:8,reportsAnalytics:7.5,
    execution:{
      "Discussions":"Traditional threaded forum with discussions organised by topic, community, and interest group. Structured, searchable, persistent. More utilitarian than modern — the UX leans functional over beautiful. Has been improving but still feels a generation behind Vanilla or Discourse in polish.",
      "Q&A":"Q&A supported within forum discussions. Not as distinct or well-executed as Vanilla's dedicated Q&A format with accepted answers.",
      "Ideation":"Ideation boards available for member feedback and feature requests. Less sophisticated than Gainsight CC but functional for association use cases.",
      "Knowledge Base":"Resource libraries and document sharing. Curated content areas for best practices and institutional knowledge. More of a portal-style resource centre than a structured KB.",
      "Content Format":"Forum-first with a portal overlay. Threaded discussions are the core, surrounded by resource libraries, member directory, groups/chapters, and events. When embedded in an association website with SSO, it functions as part of a broader member portal. Not a social feed — structured and organised.",
      "AI Approach":"AI Search Assistant launched in 2025 — natural language search across community discussions, resource libraries, and knowledge content. AI-assisted email subject line optimisation and engagement predictions in Thrive Marketing. Engagement scoring with ML-driven insights. The AI story is practical but earlier than Vanilla's RAG-based search.",
      "Events":"Not a native event platform. Integrates with event tools and surfaces event content within the community. Events drive community engagement but you need a separate event tool (unlike Bevy or Gradual).",
      "Mobile":"Mobile-responsive web design. No dedicated native mobile app. The mobile experience has been an area of investment but historically lags behind mobile-first platforms.",
      "Unique Features":"The AMS integration ecosystem is the defining differentiator. Deep, native, bi-directional integrations with iMIS, Personify, Nimble AMS, Aptify, Fonteva, netFORUM, and MemberSuite. Community engagement data flows into the AMS for renewal predictions, member health scoring, and targeted outreach. Thrive Marketing adds email automation driven by community + AMS data. Engagement scoring unifies community activity with membership data. No other platform in this comparison comes close on AMS integration depth."
    },
    communityFeatures:{
      "Discussion Forums":true,"Q&A":true,"Ideation / Ideas":true,"Resource Libraries":true,"Member Directory":true,
      "Gamification":"Partial","Moderation Tools":true,"SSO (SAML/OAuth)":true,"API Access":true,
      "Custom Branding":true,"Native Mobile App":false,"Events":"Partial",
      "AI Search Assistant":true,"Email Automation (Thrive Marketing)":true,"Groups / Chapters / Committees":true,"Self-Hosted Option":false
    },
    keyIntegrations:["iMIS (deep native integration)","Personify","Nimble AMS (Salesforce-native)","Aptify","Fonteva","netFORUM","MemberSuite","Salesforce","SSO/SAML providers","LMS platforms","Event platforms"],
    examples:[
      {name:"ASAE Collaborate",url:"https://collaborate.asaecenter.org",desc:"The 'association of associations' — 45,000+ association professionals"},
      {name:"HIMSS Community",url:"https://www.himss.org",desc:"Healthcare IT professionals — 120,000+ members globally"},
      {name:"ANA (Association of National Advertisers)",url:"https://www.ana.net",desc:"Marketing and advertising industry association"}
    ],
    recentNews:[
      {date:"Jun 2025",text:"Launched AI Search Assistant for Thrive Community — natural language search across discussions, resources, and knowledge content"},
      {date:"2025",text:"Tighter integration between Thrive Community and Thrive Marketing for unified engagement data and cross-channel automation"},
      {date:"2025",text:"UX modernisation updates for improved mobile experience and contemporary look"},
      {date:"2025",text:"Enhanced analytics dashboards for community health, engagement scoring, and ROI measurement"}
    ],
    strengths:["Deepest AMS integration ecosystem of any community platform — iMIS, Personify, Nimble AMS, Aptify, Fonteva, netFORUM, MemberSuite","Combined community + email automation suite (Thrive Marketing) driven by membership data","Engagement scoring unifies community activity with AMS data for renewal predictions","3,000+ association and nonprofit customers — proven at scale in this vertical","ASAE-endorsed — used by the association industry's own professional body","Groups, chapters, and committees built for association governance structures"],
    considerations:["UX feels dated compared to modern platforms — functional but not beautiful","No native mobile app","Not suited for B2B SaaS or product communities (use Vanilla for that)","Pricing is premium — can be prohibitive for smaller associations","Implementation can be complex, especially with AMS integrations","Portal-style UX doesn't drive the casual engagement that feed-based platforms achieve","Email automation (Thrive Marketing) is a separate module with separate pricing"],
    editorial:"Higher Logic Thrive dominates the association community market for one reason: AMS integrations. No other platform comes close to the depth of connection with iMIS, Personify, Nimble AMS, and the rest of the association management ecosystem. When community engagement data flows into your AMS and drives renewal predictions, targeted email campaigns, and member health scoring — that's genuinely transformative for association operations. The addition of Thrive Marketing creates a community + email automation combo that's hard to replicate with separate tools. But let's be honest about the trade-offs: the UX is functional rather than inspiring. If you showed a Thrive community next to a Circle or Discourse community, the design gap is obvious. For associations, that usually doesn't matter — the data integration value outweighs the UX gap. For anyone outside the association world, Thrive isn't the right platform. It's purpose-built for a specific market and it owns that market."
  }
];

const criteria = [
  {key:"easeOfUse",label:"Ease of Setup & Use"},
  {key:"qualityOfFeatures",label:"Quality of Features"},
  {key:"integrations",label:"Integrations"},
  {key:"dataPrivacySecurity",label:"Data Privacy & Security"},
  {key:"servicesSupport",label:"Services & Support"},
  {key:"reportsAnalytics",label:"Reports & Analytics"}
];

const tableStakes = [
  "Discussion forums or spaces","User profiles and accounts","Content moderation tools",
  "Single Sign-On (SSO)","Search functionality","Admin dashboard",
  "Basic analytics / reporting","Custom branding / theming","Email notifications",
  "Role-based permissions","Mobile-responsive design","API access",
  "User registration flows","Content flagging / reporting","GDPR / privacy controls"
];

const differentiators = [
  {id:"ux",title:"Discussion Style",
   desc:"How do members interact? Traditional forums suit deep technical support. Social feeds drive casual engagement but content is harder to find later.",
   options:[
     {id:"forum",label:"Forum-style (threaded, topic-based)",detail:"Best for: support communities, knowledge retention, searchable archives",tags:["Khoros","Gainsight CC","Higher Logic Vanilla","Higher Logic Thrive","Verint","Discourse","Flarum"]},
     {id:"feed",label:"Feed/Wall-style (social, chronological)",detail:"Best for: engagement, casual community, modern feel",tags:["Bettermode","Bevy Hub","Circle","Mighty Networks","Gradual"]},
     {id:"config",label:"Configurable (can do either)",detail:"Best for: organisations wanting flexibility",tags:["Salesforce","Hivebrite"]}
   ]},
  {id:"events",title:"Events Capability",
   desc:"How important are events to your community strategy? Some platforms treat events as core, others don't have them at all.",
   options:[
     {id:"native",label:"Events-native (core feature, built in)",detail:"Native meetings, webinars, livestreams, conferences",tags:["Bevy","Hivebrite","Mighty Networks","Gradual"]},
     {id:"builtin",label:"Built-in events (functional, not the focus)",detail:"Basic event management alongside community",tags:["Gainsight CC","Bettermode","Salesforce","Circle"]},
     {id:"none",label:"No native events (integrate separately)",detail:"Use Zoom, Eventbrite, etc. alongside the community",tags:["Khoros","Higher Logic Vanilla","Higher Logic Thrive","Verint","Discourse","Flarum"]}
   ]},
  {id:"focus",title:"Vendor Focus",
   desc:"Is the community product the vendor's primary focus or one module in a larger suite?",
   options:[
     {id:"dedicated",label:"Community is the entire product",detail:"Faster iteration on community features, deeper community expertise",tags:["Higher Logic Vanilla","Bettermode","Bevy","Hivebrite","Discourse","Flarum","Circle","Mighty Networks","Gradual"]},
     {id:"suite",label:"Part of a larger platform suite",detail:"Deeper integration with CRM, support, marketing tools",tags:["Salesforce","Gainsight CC","Verint","Khoros","Higher Logic Thrive"]}
   ]},
  {id:"ai",title:"AI Capabilities",
   desc:"Do you need AI-powered search, moderation, content generation, or analytics?",
   options:[
     {id:"production",label:"Production AI (shipped and working)",detail:"AI moderation, search, summaries, auto-tagging in production",tags:["Khoros","Gainsight CC","Higher Logic Vanilla","Higher Logic Thrive","Salesforce","Discourse","Mighty Networks"]},
     {id:"emerging",label:"Emerging AI (in development or beta)",detail:"AI features announced but still maturing",tags:["Bettermode","Verint","Bevy","Circle"]},
     {id:"none",label:"No AI needed / not a priority",detail:"Happy to manage without AI features",tags:["Hivebrite","Flarum","Gradual"]}
   ]},
  {id:"support",title:"Support & Services Model",
   desc:"What level of vendor support do you need? This varies dramatically between platforms.",
   options:[
     {id:"enterprise",label:"Enterprise support (dedicated CSM, SLAs, implementation)",detail:"Named account manager, guaranteed response times, onboarding support",tags:["Khoros","Salesforce","Verint","Gainsight CC","Higher Logic Thrive"]},
     {id:"managed",label:"Managed support (CSM on higher tiers, good docs)",detail:"Customer success team available, knowledge base, regular check-ins",tags:["Higher Logic Vanilla","Bevy","Hivebrite","Gradual"]},
     {id:"selfserve",label:"Self-serve (documentation, community support)",detail:"Help docs, community forums, email support — you figure it out",tags:["Bettermode","Circle","Mighty Networks","Discourse","Flarum"]}
   ]},
  {id:"membership",title:"Monetisation & Membership",
   desc:"Do you need to charge members, sell courses, or manage paid memberships?",
   options:[
     {id:"native",label:"Native monetisation (paywalls, subscriptions, courses)",detail:"Built-in payments, membership tiers, course sales",tags:["Circle","Mighty Networks","Hivebrite"]},
     {id:"some",label:"Some membership features",detail:"Member management but limited payment/commerce",tags:["Bevy","Gradual"]},
     {id:"notneeded",label:"Not needed (enterprise/support community)",detail:"Members don't pay — it's a customer or internal community",tags:["Khoros","Gainsight CC","Higher Logic Vanilla","Higher Logic Thrive","Verint","Bettermode","Salesforce","Discourse","Flarum"]}
   ]},
  {id:"hosting",title:"Hosting & Data Control",
   desc:"Do you need to self-host for data sovereignty, or is cloud SaaS acceptable?",
   options:[
     {id:"selfhost",label:"Self-hosted / open source (full control)",detail:"You own and run the infrastructure. Full data sovereignty.",tags:["Discourse","Flarum"]},
     {id:"saas",label:"SaaS / cloud-hosted (vendor managed)",detail:"Vendor handles hosting, updates, security, uptime.",tags:["Khoros","Gainsight CC","Higher Logic Vanilla","Higher Logic Thrive","Bettermode","Bevy","Hivebrite","Verint","Salesforce","Circle","Mighty Networks","Gradual"]}
   ]},
  {id:"pricing",title:"Buying Process",
   desc:"How quickly do you need to get started? Self-serve means today. Enterprise sales means months.",
   options:[
     {id:"free",label:"Free / open source",detail:"Download and run today. No vendor relationship needed.",tags:["Discourse (self-hosted)","Flarum"]},
     {id:"selfserve",label:"Self-serve (sign up with a credit card)",detail:"Published pricing. Start in minutes/hours.",tags:["Bettermode","Discourse (hosted)","Circle","Mighty Networks"]},
     {id:"quote",label:"Quote-based (talk to sales)",detail:"Customised pricing. Days to weeks to get started.",tags:["Gainsight CC","Higher Logic Vanilla","Higher Logic Thrive"]},
     {id:"enterprise",label:"Enterprise sales process",detail:"RFP, procurement, legal. Weeks to months.",tags:["Khoros","Salesforce","Verint","Bevy","Hivebrite","Gradual"]}
   ]}
];
const weightHints={
  easeOfUse:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor factor",4:"Minor factor",
    5:"Moderate priority — we'd like a reasonable setup",
    6:"Important — we need something our team can manage without devs",
    7:"High priority — non-technical admins must be able to run it day-to-day",
    8:"Very high — must be intuitive out of the box with minimal training",
    9:"Critical — ease of use is a dealbreaker for us",
    10:"Our top priority — we'll sacrifice features for simplicity"
  },
  qualityOfFeatures:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor factor — basic features are fine",4:"Minor factor",
    5:"Moderate — we need solid core features that work well",
    6:"Important — feature polish and depth matter to us",
    7:"High priority — we need best-in-class execution, not just checkboxes",
    8:"Very high — poorly implemented features are worse than missing ones",
    9:"Critical — we'd rather have fewer features done excellently",
    10:"Our top priority — quality of execution is everything"
  },
  integrations:{
    0:"Not important — standalone is fine",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — maybe one or two connections",4:"Minor factor",
    5:"Moderate — needs to connect to our main tools (CRM, support)",
    6:"Important — deep integration with our existing stack matters",
    7:"High priority — bi-directional data flow with CRM/support tools essential",
    8:"Very high — community must be deeply embedded in our tech ecosystem",
    9:"Critical — data must flow seamlessly across our entire stack",
    10:"Our top priority — integration depth trumps everything else"
  },
  dataPrivacySecurity:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — basic security is sufficient",4:"Minor factor",
    5:"Moderate — standard enterprise security (SSO, encryption)",
    6:"Important — we're in a regulated industry or handle sensitive data",
    7:"High priority — GDPR compliance, data residency, audit trails needed",
    8:"Very high — strict security requirements from our compliance team",
    9:"Critical — healthcare, finance, or government-level requirements",
    10:"Our top priority — security and privacy override all other factors"
  },
  servicesSupport:{
    0:"Not important — we're self-sufficient",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — documentation is enough",4:"Minor factor",
    5:"Moderate — we'd like responsive support when we need it",
    6:"Important — dedicated account manager or CSM preferred",
    7:"High priority — we need proactive guidance, not just reactive support",
    8:"Very high — strategic partnership with the vendor matters enormously",
    9:"Critical — implementation support and ongoing strategic advice essential",
    10:"Our top priority — vendor relationship and service quality above all"
  },
  reportsAnalytics:{
    0:"Not important",
    1:"Barely matters",2:"Barely matters",
    3:"Minor — basic metrics are fine",4:"Minor factor",
    5:"Moderate — we need standard engagement and activity dashboards",
    6:"Important — leadership requires regular community ROI reporting",
    7:"High priority — we need to prove business impact with data",
    8:"Very high — advanced analytics, custom reports, and API data access needed",
    9:"Critical — case deflection metrics, revenue attribution required",
    10:"Our top priority — data and reporting drive all our decisions"
  }
};
