export interface FollowUp {
  q: string;
  a: string;
}

export interface Question {
  id: string;
  timecode: string;
  kind: string;
  q: string;
  a: string[];
  stats?: string[];
  followUps?: FollowUp[];
}

export interface Chapter {
  id: string;
  index: string;
  timecode: string;
  titleLines: [string, string];
  leadIn: string;
  takeaway: string;
  questions: Question[];
}

export const chapters: Chapter[] = [
  {
    id: 'parade-deck',
    index: '01',
    timecode: 'ORIGINS',
    titleLines: ['From the Parade Deck', 'to the Terminal'],
    leadIn:
      'Most developer origin stories start with a computer science degree or a childhood spent modding games. Andrew\u2019s starts with twelve years of Marine Corps logistics, two combat tours, and a recruiting desk. That\u2019s exactly what makes it worth hearing.',
    takeaway:
      'The military and recruiting years weren\u2019t a detour. They were the training set for everything after.',
    questions: [
      {
        id: 'c1q1',
        timecode: '02:30',
        kind: 'USMC',
        q: 'Twelve years in the Marine Corps: logistics, dispatch, maintenance recovery, recruiting. When you look back now, what did the Corps teach you that you still use every day as an engineer?',
        a: [
          'Logistics is state management. I just didn\u2019t have the vocabulary yet. Every dispatch, every maintenance recovery, every piece of gear moving between two points is a state transition that has to be tracked, validated, and accounted for. When I eventually met Redux and event sourcing, it felt less like learning and more like finally getting names for things I\u2019d already done with a clipboard.',
          'The other half is communication. Briefing a room of Marines and briefing a client are the same skill: know what matters, say it plainly, and never hide behind jargon. And underneath all of it is the discipline. The real curriculum behind teaching yourself to code isn\u2019t a course, it\u2019s showing up every day whether you feel like it or not.',
        ],
        stats: ['12 yrs USMC', '2 combat tours', 'Logistics \u2192 state management'],
        followUps: [
          {
            q: 'The recruiting numbers are wild: 60 contracts, $3M in contract value, under 3% retention loss. Was that a sales job or an engineering job?',
            a: 'It was an engineering job wearing a sales uniform. Recruiting is a pipeline problem: sourcing, qualification, conversion, retention. I ran it like one. Measured every stage, found the leaks, fixed the process instead of pushing harder. The retention number is the one I\u2019m proud of: anyone can close, keeping people is a systems outcome.',
          },
          {
            q: 'Was there a single moment in the Corps where you realized you were wired for systems?',
            a: 'No single moment. More a slow realization that I kept getting handed the messy processes. If a workflow was broken, it landed on my desk. I thought everyone enjoyed untangling that stuff. Turns out that\u2019s a personality trait, and it has a job title.',
          },
        ],
      },
      {
        id: 'c1q2',
        timecode: '04:30',
        kind: 'KES',
        q: 'After the Corps you spent three years as a technical recruiter at KES, supporting Navy combat and communications systems, and you basically digitized a paper process from the inside. What did that teach you about how broken most workflows actually are?',
        a: [
          'Most offices don\u2019t run on software. They run on paper, tribal knowledge, and one person who \u201cknows how it works.\u201d At KES I watched compliance paperwork move by hand between desks, so I started automating it from the inside. That work cut vendor spend by 15%, but the bigger lesson was the leverage: a few scripts beat a whole layer of manual process.',
          'And there was a strange symmetry to it: I was sourcing engineers for Navy systems while teaching myself to become one at night. Recruiting made me the translator between technical and non-technical people. Everything I build now is still that same translation job.',
        ],
        stats: ['3 yrs @ KES', '\u221215% vendor spend', 'Paper \u2192 digital'],
        followUps: [
          {
            q: 'You were sourcing engineers while teaching yourself to become one. Was that deliberate?',
            a: 'Honest answer? Half deliberate, half osmosis. Reading hundreds of engineering r\u00e9sum\u00e9s is a weirdly good curriculum: you see which skills actually get people hired, which projects matter, which keywords are noise. I reverse-engineered my own learning path from other people\u2019s careers.',
          },
        ],
      },
      {
        id: 'c1q3',
        timecode: '06:45',
        kind: 'GITHUB',
        q: 'October 2016, you create a GitHub account. By mid-2017 there\u2019s pong-game, hangman-app, a React Native jokes app, a Twitter bot: a very public learning log. Walk us through that first year of learning to code in the open.',
        a: [
          'The curriculum was: build small, ship ugly, repeat. Tutorials give you the feeling of progress; shipping gives you actual progress. A pong game that works teaches you more than ten hours of video about pong games. Every repo was small enough to finish and public enough to keep me honest.',
          'Building in public was a strategy, not an accident. In July 2017 I wrote a Medium post telling junior devs to put their work on GitHub Pages, because a public trail is proof of work no r\u00e9sum\u00e9 bullet can fake. Career-switching in your early thirties is terrifying; the commit history was my answer to \u201cwhy should anyone take a chance on you?\u201d',
        ],
        stats: ['GitHub est. Oct 2016', 'pong-game, hangman-app, Twitter bot', 'Medium, Jul 2017'],
        followUps: [
          {
            q: 'What did you build that you\u2019re embarrassed by now, and what still holds up?',
            a: 'The CSS in those early apps should be preserved in a museum of warnings. But the instinct holds up: small, finished, public things. I still ship that way; the projects just got bigger.',
          },
          {
            q: 'What would you tell someone starting that same year of learning in 2026, in the AI era?',
            a: 'Same advice, higher stakes. AI can write the code, but it can\u2019t build your judgment, and judgment is what you\u2019re actually selling. Ship small things in public, use AI as a mentor that never sleeps, and never let it finish a project you don\u2019t understand.',
          },
        ],
      },
    ],
  },
  {
    id: 'build-years',
    index: '02',
    timecode: '2017-2024',
    titleLines: ['Building in Public', 'Startup, Freelance, Serverless at Scale'],
    leadIn:
      'From 2017 to 2024 Andrew moved through three very different arenas: a peer-to-peer rental startup, a decade of freelance client work, and a product engineering role building serverless infrastructure at serious scale. Each one upgraded a different part of the toolkit.',
    takeaway: 'Each arena added a layer: startup shipped, freelance scoped, ADZZ scaled.',
    questions: [
      {
        id: 'c2q1',
        timecode: '10:15',
        kind: 'LENDIT',
        q: 'Lendit, 2017\u20132018: a small peer-to-peer rental startup, your first real dev job. You\u2019re maybe a year into coding and suddenly you\u2019re designing and deploying a mobile-responsive front end and helping with REST API architecture. How deep was the imposter syndrome?',
        a: [
          'Chest-deep, daily. The cure was that startups don\u2019t have time for your imposter syndrome: the feature has to ship Friday, so you learn React by shipping React, not by studying it. Working beside a senior engineer was forced mentorship: every code review was a lesson I hadn\u2019t paid tuition for.',
          'The lesson that stuck was reusable components. Building the same button twice felt wrong; building a system of components felt like real engineering for the first time. I\u2019ve been chasing that feeling ever since.',
        ],
        stats: ['2017\u20132018', 'First dev job', 'React by shipping'],
      },
      {
        id: 'c2q2',
        timecode: '12:30',
        kind: 'FREELANCE',
        q: 'You\u2019ve freelanced from 2016 to today: life coaches, tax doctors, AI day traders. The r\u00e9sum\u00e9 mentions Core Web Vitals rescues and a Yahoo Finance stock-data aggregator feeding a custom-trained day-trading model. What did freelance teach you that employment never could?',
        a: [
          'That performance is a business metric, not a vanity metric. When a client\u2019s revenue moves because you fixed their Core Web Vitals, you stop thinking of milliseconds as engineering taste and start thinking of them as money.',
          'Freelance is also the best scoping education that exists. A client walks in with a business problem and walks out with a technical spec, and you\u2019re the translation layer in between. Life coaches, tax doctors, day traders: every client type taught me a different way people think about value.',
        ],
        stats: ['2016 \u2192 today', 'Core Web Vitals \u2192 revenue', 'Yahoo Finance aggregator'],
        followUps: [
          {
            q: 'The stock-data aggregator for a day trader: how do you spec a project when the client\u2019s \u201cspec\u201d is a trading hunch?',
            a: 'You spec the data, not the hunch. The hunch is their job; my job was a pipeline that pulled, cleaned, and structured market data reliably enough that a model could learn from it. Hunches change weekly; the pipeline has to be boring and correct.',
          },
          {
            q: 'What\u2019s your rule for saying no to a client?',
            a: 'If I can\u2019t explain how the project makes them money or saves them time, I say no. Software for its own sake is how clients end up resenting invoices.',
          },
        ],
      },
      {
        id: 'c2q3',
        timecode: '14:30',
        kind: 'ADZZ',
        q: 'ADZZ, 2023\u20132024: Product Engineer at an affiliate-marketing company. This is where the scale numbers show up: subscriber services across 30+ domains, IP geolocation on AWS Lambda, a retroactive update script touching 200,000+ subscribers. Pick one and walk us through how you architected it.',
        a: [
          'The serverless event pipeline is the one. Affiliate marketing is pure event flow: registrations, deposits, postbacks firing in real time across 30+ domains. Lambda fit it perfectly: no idle servers, every event triggers exactly the compute it needs, and the cost scales with reality instead of with your anxiety.',
          'Around it we built validation chains (DNS and SMTP checks on emails, IP geolocation for geo-cloaking, PPC data ingestion) so junk died at the edge instead of polluting the database. Then came the war story: a retroactive update across 200,000+ subscriber records. Measure twice, run once. Dry runs, sampling, batched execution, rollback plan. At that scale a bad script isn\u2019t a bug, it\u2019s an incident report.',
        ],
        stats: ['30+ domains', '200k+ subscriber migration', 'AWS Lambda pipelines'],
        followUps: [
          {
            q: 'What broke at scale that worked perfectly at 1,000 subscribers?',
            a: 'Everything synchronous. At 1,000 records you can afford to be casual: loop, call, wait. At 200,000, every assumption about timing, rate limits, and retries shows up to collect. Scale doesn\u2019t create new bugs; it gives your old assumptions an audience.',
          },
          {
            q: 'Affiliate marketing has a sketchy reputation. How did you think about the ethics of the plumbing you built?',
            a: 'Honestly? It\u2019s part of why my current work looks the way it does. Building pipes that optimize for engagement and conversion teaches you exactly how the attention machine works. I didn\u2019t leave with less skill; I left with a clearer opinion about what the skill should be for.',
          },
        ],
      },
      {
        id: 'c2q4',
        timecode: '16:30',
        kind: 'CRAFT',
        q: 'You\u2019ve now seen startup, freelance, and scale-up engineering from the inside. Which one actually makes someone a better engineer, and which one is overrated?',
        a: [
          'Each one teaches a different layer, and no single path is sufficient. Freelance teaches scoping and communication: you learn to price uncertainty. Startups teach shipping speed: you learn what \u201cdone\u201d actually means. Scale work teaches discipline: you learn that cleverness is a liability when 200,000 records are watching.',
          'The overrated one? Probably the idea that any single prestigious job makes you. The compounding is the point: doing all three, in public, is what turned each lesson into the next one\u2019s foundation.',
        ],
        stats: ['Ship, Scope, Scale'],
      },
    ],
  },
  {
    id: 'the-mission',
    index: '03',
    timecode: 'NOW',
    titleLines: ['The Mission', 'AI Tools for Non-Technical People'],
    leadIn:
      'Andrew\u2019s current positioning is explicit: build AI-powered, local-first tools that put real capability in the hands of non-technical people. Software that\u2019s \u201chelpful, not addictive.\u201d And unlike most mission statements, this one has shipping artifacts behind it.',
    takeaway:
      'The mission is translation one last time: turning AI complexity into tools ordinary people can actually wield.',
    questions: [
      {
        id: 'c3q1',
        timecode: '18:00',
        kind: 'LLMATE',
        q: 'Let\u2019s talk llmate, your CLI for analyzing, summarizing, and ingesting code repositories, published on JSR. What itch were you scratching when you built it?',
        a: [
          'The \u201chow do I feed my codebase to a model\u201d problem. Every AI workflow starts with context, and getting a real repository into a prompt is weirdly annoying: binary files, node_modules, giant lockfiles, size limits. llmate handles include/exclude patterns, branch checkout, and size caps so the context you hand an agent is the code that matters.',
          'Why a CLI on JSR? Because that\u2019s where developers already live, and because good plumbing should be boring to install and instant to run. Building ingestion tooling also changed how I structure my own projects: you start writing repos for two audiences, humans and models.',
        ],
        stats: ['llmate v1.0.x on JSR', 'Repo \u2192 LLM context', 'CLI-first'],
      },
      {
        id: 'c3q2',
        timecode: '20:00',
        kind: 'LOCAL-FIRST',
        q: 'The through-line of your recent work is local-first: swift-pass managing macOS Keychain secrets from the terminal, data-smith exploring file-based local data layers, Hugging Face experiments with small models, learning Swift and SwiftUI. Why local-first? What\u2019s wrong with cloud-everything AI?',
        a: [
          'Privacy and ownership, first. Your data and your models on your machine means nobody\u2019s terms-of-service update can take your tools away. Then the practical layer: local is fast, works offline, and has no meter running. Latency and reliability aren\u2019t abstractions when the tool is part of your daily workflow.',
          'But honestly it\u2019s a philosophical stance before it\u2019s an architecture. Cloud-everything AI makes capability a subscription; local-first makes it a possession. I\u2019m on the possession side: empowerment over dependence. That\u2019s why swift-pass keeps your secrets in your Keychain, why data-smith treats your files as the database, and why I\u2019m compressing small models for on-device use on iPhone.',
        ],
        stats: ['swift-pass, data-smith', 'On-device AI, iOS', 'Own your tools'],
        followUps: [
          {
            q: 'On-device AI on an iPhone still has real constraints. Where\u2019s the honest ceiling today?',
            a: 'Memory and thermals. A phone can\u2019t run the frontier models, full stop. But quantized small models are getting genuinely useful for focused tasks: summarization, extraction, classification. The ceiling isn\u2019t intelligence, it\u2019s scope. Design for a small job done instantly and privately, and the hardware is already there.',
          },
          {
            q: 'Is local-first a bet on where hardware is going, or a statement about how software should treat people?',
            a: 'Both, but if I had to pick: the statement. Hardware trends might flip; the principle doesn\u2019t. Software should leave the user more capable, not more dependent.',
          },
        ],
      },
      {
        id: 'c3q3',
        timecode: '22:00',
        kind: 'ETHICS',
        q: 'Your site says you want to build software that\u2019s \u201chelpful, not addictive.\u201d Concretely, what does a design decision look like when you\u2019re optimizing for helpful instead of engaging?',
        a: [
          'It looks like software that finishes its job and gets out of the way. No feeds, no streaks, no notification loops. The success metric is how quickly you leave, not how long you stay. An engagement-optimized tool asks \u201chow do we bring them back?\u201d A helpful one asks \u201cwhy would they need to come back?\u201d',
          'In my tools the addictive default gets deliberately rejected: llmate prints its output and exits. swift-pass gives you the secret and closes. The value is automation and simplification: the product is the time you get back, not the time you spend.',
        ],
        stats: ['No feeds, no streaks', 'Success = leaving quickly'],
      },
      {
        id: 'c3q4',
        timecode: '23:30',
        kind: 'THE BET',
        q: 'The big claim: you want to put real AI capability in the hands of non-technical people. Every wave of \u201cno-code\u201d has overpromised. Why is this time actually different?',
        a: [
          'Because LLMs are the first interface that meets people in natural language. Every previous democratization wave asked normal people to think like machines: drag these blocks, learn this logic. This time the machine learned to meet them. The gap isn\u2019t capability anymore; it\u2019s packaging and trust.',
          'That\u2019s the work: packaging raw capability into tools a non-technical person can wield without a manual, and making them trustworthy enough to depend on. My projects are small proofs of the pattern: each one takes something that required a developer and hands it to someone who isn\u2019t one.',
        ],
        stats: ['Capability \u2713 \u2192 packaging + trust'],
        followUps: [
          {
            q: 'What could still kill this vision?',
            a: 'Trust failures. One wave of AI tools that leak data or confidently wreck someone\u2019s work, and non-technical users retreat, reasonably. That\u2019s another argument for local-first: when the data never leaves the machine, trust is architecture, not a promise.',
          },
        ],
      },
    ],
  },
];

export interface Checkpoint {
  year: string;
  title: string;
  detail: string;
  tag: string;
}

export const journey: Checkpoint[] = [
  {
    year: '2004',
    title: 'The Parade Deck',
    detail: 'Twelve years of Marine Corps logistics begin: dispatch, maintenance recovery, two combat tours. State management before the term existed.',
    tag: 'USMC',
  },
  {
    year: '2013',
    title: 'The Recruiting Desk',
    detail: 'Marine Corps recruiting run like an engineering pipeline: 60 contracts, $3M in contract value, under 3% retention loss.',
    tag: 'PIPELINE',
  },
  {
    year: '2014',
    title: 'The Translator',
    detail: 'Technical recruiter at KES supporting Navy combat & comms systems. Digitizes a paper process from the inside; cuts vendor spend 15%. Starts teaching himself to code.',
    tag: 'KES',
  },
  {
    year: '2016',
    title: 'First Commit',
    detail: 'October 2016, the GitHub account opens. pong-game, hangman-app, a React Native jokes app, a Twitter bot. A decade-long public learning log begins.',
    tag: 'GITHUB',
  },
  {
    year: '2017',
    title: 'First Paycheck',
    detail: 'Lendit, a peer-to-peer rental startup. First real dev job: mobile-responsive front end, REST API architecture, React learned by shipping.',
    tag: 'STARTUP',
  },
  {
    year: '2016\u2192',
    title: 'The Freelance Decade',
    detail: 'Life coaches, tax doctors, AI day traders. Core Web Vitals rescues tied to revenue; a Yahoo Finance aggregator feeding a custom trading model.',
    tag: 'CLIENTS',
  },
  {
    year: '2023',
    title: 'Serverless at Scale',
    detail: 'ADZZ, Product Engineer. Subscriber services across 30+ domains, AWS Lambda geolocation, real-time postbacks, a 200k+ subscriber migration.',
    tag: 'SCALE',
  },
  {
    year: 'NOW',
    title: 'The Mission',
    detail: 'Independent builder. llmate, swift-pass, data-smith: local-first AI tools for people who can\u2019t code. Software that\u2019s helpful, not addictive.',
    tag: 'LOCAL-FIRST',
  },
];

export interface Project {
  cmd: string;
  name: string;
  desc: string;
  meta: string[];
  url: string;
}

export const projects: Project[] = [
  {
    cmd: '> jsr add @arobida/llmate',
    name: 'llmate',
    desc: 'CLI that analyzes, summarizes, and ingests code repositories into clean context for LLMs and agents. Include/exclude patterns, branch checkout, size caps: the plumbing between your repo and the model.',
    meta: ['TypeScript', 'JSR', 'v1.0.x'],
    url: 'https://github.com/arobida',
  },
  {
    cmd: '> swift-pass get github',
    name: 'swift-pass',
    desc: 'Terminal-native secrets manager backed by the macOS Keychain. Your credentials stay in Apple\u2019s vault; the CLI just hands them to your scripts. Local-first security with zero new attack surface.',
    meta: ['Swift', 'macOS Keychain', 'CLI'],
    url: 'https://github.com/arobida',
  },
  {
    cmd: '> data-smith init ./data',
    name: 'data-smith',
    desc: 'An exploration of file-based local data layers: your files as the database. Built with TanStack Start, React 19, and TypeScript to prove apps can be powerful without owning your data.',
    meta: ['TanStack Start', 'React 19', 'Local-first'],
    url: 'https://github.com/arobida',
  },
];

export const links = [
  { label: 'IMANDREW.TECH', url: 'https://imandrew.tech', note: 'portfolio' },
  { label: 'GITHUB @AROBIDA', url: 'https://github.com/arobida', note: 'building in public since 2016' },
  { label: 'X @THEAFR86', url: 'https://x.com/theafr86', note: '\u201cfrom crayons to code\u201d' },
  { label: 'HUGGING FACE', url: 'https://huggingface.co/theafr86', note: 'small-model experiments' },
];
