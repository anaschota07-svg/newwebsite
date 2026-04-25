export type ToolNarrativeSection = {
  heading: string
  body: string
}

export type ToolNarrative = {
  sections: ToolNarrativeSection[]
}

/** Original, page-specific copy for each free tool (supports AdSense “valuable content” expectations). */
export const toolNarratives: Record<string, ToolNarrative> = {
  'age-calculator': {
    sections: [
      {
        heading: 'What this age calculator is for',
        body: `This calculator turns a birth date (and optional “as of” date) into an exact age breakdown. It is useful for school forms, HR paperwork, eligibility checks, and travel documents where you need a precise count of years, months, and days instead of a rough guess. The goal is a fast, transparent answer you can copy into the next system you are using.`,
      },
      {
        heading: 'How to get accurate results',
        body: `Select the correct day, month, and year, then choose the date you want to measure against if the tool allows it. If you are in a different calendar system locally, make sure the date you input matches the calendar your destination form expects. After you get the result, read the units carefully—some use cases need “completed years” only, while others need the full year-month-day string.`,
      },
      {
        heading: 'What this result does not replace',
        body: `Ages for legal, medical, or financial decisions can depend on jurisdiction-specific rules, time zones, and cut-off hours. This tool offers arithmetic based on the dates you enter, not legal advice. For official matters, always confirm the rule set used by the institution reviewing your form.`,
      },
    ],
  },
  'bmi-calculator': {
    sections: [
      {
        heading: 'What BMI is (and is not)',
        body: `Body mass index (BMI) is a quick screening number based on your height and weight. It is widely used in public health because it is easy to compute, but it does not measure body fat directly and can misclassify very muscular or older adults. Think of the output as a starting signal to discuss trends with a qualified clinician rather than a diagnosis.`,
      },
      {
        heading: 'How to use this page responsibly',
        body: `Enter the units your region expects (for example, metric vs. imperial) and use recent measurements, not a remembered value from long ago. If you are comparing your number over time, try to use the same scale and similar time of day for consistency. If you feel unwell, focus on how you feel and professional guidance, not a single number.`,
      },
      {
        heading: 'Privacy and limitations',
        body: `BMI is one input among many, including activity, diet, medical history, and lab values. The calculations here run in your browser on SimpleWebToolsBox and are not medical advice, diagnosis, or treatment.`,
      },
    ],
  },
  'text-case-converter': {
    sections: [
      {
        heading: 'When case conversion actually saves time',
        body: `You reach for a case converter when a paragraph is in the wrong style: ALL CAPS from a PDF, messy Title Case, or inconsistent sentence casing in a long draft. The tool is especially helpful before publishing, coding variable names, or cleaning spreadsheet exports where manual editing is slow and error-prone.`,
      },
      {
        heading: 'Get predictable results from messy input',
        body: `Paste the text, then pick the case style that matches your destination style guide. If your text includes proper nouns, be aware that automatic title case is not always perfect for names, brands, and small words—plan a quick human pass after conversion. If you need a predictable developer format (camelCase, snake_case), use the same source text to avoid hidden whitespace surprises.`,
      },
      {
        heading: 'What stays local in your session',
        body: `Your text is processed in the browser to support privacy. Avoid pasting highly sensitive information into any online tool, even a client-side one, on shared or untrusted devices.`,
      },
    ],
  },
  'word-counter': {
    sections: [
      {
        heading: 'Why word counts still matter in 2026',
        body: `School assignments, ad copy, product listings, and SEO briefs still specify limits. A word counter is the fastest way to see whether a draft is inside the guardrails before you invest more editing time. It also gives character counts, which matter for short fields like meta descriptions, SMS templates, and form boxes.`,
      },
      {
        heading: 'How to interpret the numbers on this page',
        body: `Watch words vs. characters, especially if your limit is “no more than 160 characters with spaces.” Sentence and paragraph counts are heuristics: punctuation choices can nudge the split slightly. If you are comparing to another tool, small differences are normal if their counting rules for hyphenated words and line breaks differ.`,
      },
      {
        heading: 'Privacy and scope',
        body: `Text you paste here is intended to stay in your browser session for simple counting. The counter does not understand tone, plagiarism risk, or factual correctness—it only measures quantity.`,
      },
    ],
  },
  'password-generator': {
    sections: [
      {
        heading: 'What a strong password generator is solving',
        body: `Humans are bad at randomness, and we reuse patterns that attackers model quickly. A generator helps you create long, less predictable strings with a mix of character types. This reduces the chance that a reused password in one leak becomes the key to another account. Pair strong passwords with a reputable password manager when possible.`,
      },
      {
        heading: 'How to use the controls effectively',
        body: `Increase length first—length often helps more than exotic symbols alone. If a website rejects some symbols, turn off the symbols category or use a “safe for legacy sites” pattern if available. If you must write a password down temporarily, store it in a way that is not photographable in public and then move it into a password manager and destroy the paper copy.`,
      },
      {
        heading: 'Reality check on risk',
        body: `A generated password is only one part of account security. Multi-factor authentication, phishing awareness, and recovery codes still matter. This tool is not a security audit and cannot detect whether a website stores passwords well on its servers.`,
      },
    ],
  },
  'qr-code-generator': {
    sections: [
      {
        heading: 'Where QR codes are still the right tool',
        body: `QR codes bridge physical and digital: menus, support links, product packaging, and Wi-Fi setup strings. A generator helps you make a scannable version of a URL or text so people do not have to retype a long string. The code itself does not make the destination trustworthy—users should still know where the link is going.`,
      },
      {
        heading: 'How to generate and test a code',
        body: `Enter the final destination URL, including the correct scheme (https), then generate and scan with a phone you trust. If the content is time-sensitive, consider using a link shortener you control or updating the page behind the code instead of reprinting. For marketing materials, add UTM parameters at the source URL so you can measure traffic, not the QR system.`,
      },
      {
        heading: 'User safety note',
        body: `Attackers can also create QR codes. This tool helps you create codes for your own content; it does not verify third-party safety or protect against social engineering that tricks users into scanning a malicious code.`,
      },
    ],
  },
  'color-picker': {
    sections: [
      {
        heading: 'Why designers still start from a real color model',
        body: `Design systems need a single source of truth for a brand color, usually expressed in HEX, RGB, or HSL. A picker makes it easy to copy values into CSS, design tools, and presentations without mistakes from retyping. It also helps you check contrast relationships between foreground and background colors for readability.`,
      },
      {
        heading: 'Get codes you can paste immediately',
        body: `Choose a color visually, then copy the value format your toolchain expects. If you are moving between RGB and HSL, remember that HSL is often easier to tune for “lighter/darker” adjustments. For accessibility, pair this with a separate contrast check against WCAG targets because human eyes alone are not a reliable pass/fail test.`,
      },
      {
        heading: 'What this does not do',
        body: `The picker does not manage brand palettes, export full themes, or validate licenses for font or asset usage. It helps you pick and copy color values, not make creative strategy decisions for you.`,
      },
    ],
  },
  'json-formatter': {
    sections: [
      {
        heading: 'Why JSON is painful without formatting',
        body: `Minified JSON saves bytes on the network but is hard to read when debugging, reviewing logs, or teaching an API. A formatter adds indentation, helps spot missing brackets, and makes nested structures scannable. For developers, the benefit is not “pretty” output alone—it's faster comprehension and fewer copy/paste errors.`,
      },
      {
        heading: 'How to use a formatter safely in real workflows',
        body: `Paste a payload and validate before you assume it is correct. If a secret token appears in a response, never paste that into a public site on an untrusted network. For large files, be mindful of your machine's memory. If the formatter reports invalid JSON, read the first error line carefully: many issues are a trailing comma or a missing quote earlier in the file.`,
      },
      {
        heading: 'Limits and environment',
        body: `This page runs in your browser, which is convenient for development but is not a substitute for secure secret storage or a proper CI static analysis pipeline. Treat formatted output as a visual aid, not a security scanner.`,
      },
    ],
  },
  'base64-encoder-decoder': {
    sections: [
      {
        heading: 'What Base64 is used for on the web',
        body: `Base64 is a way to represent binary data using printable ASCII characters, which is useful when a system only handles text. You will see it in data URLs, email attachments, JSON payloads, and some auth tokens. It is encoding, not encryption: anyone can decode Base64 without a secret key.`,
      },
      {
        heading: 'Practical use on this page',
        body: `Encode when you need a transport-friendly string for a small file or test vector. Decode when you need to read what a Base64 string contains. If you are debugging API issues, make sure you are not double-encoding, and remember that newlines in copied strings can break decoding.`,
      },
      {
        heading: 'Do not treat encoding as security',
        body: `Hiding a password inside Base64 does not protect it. If you are handling real credentials, use proper secret management, TLS in transit, and access controls, not this tool alone.`,
      },
    ],
  },
  'url-encoder-decoder': {
    sections: [
      {
        heading: 'Why URL encoding still trips people up',
        body: `URLs only allow a limited set of characters unescaped. Spaces, slashes inside query values, and non-English text must be percent-encoded. If you hand-build links for analytics, auth redirects, or search queries, a small encoding mistake can break the target server’s parsing.`,
      },
      {
        heading: 'How to use encode vs decode',
        body: `Encode a string when you are placing user-generated text into a query parameter. Decode when you are reading a long encoded URL to understand its actual parameter values. If the output looks wrong, check whether the input was already partially encoded, which is a common double-encoding problem.`,
      },
      {
        heading: 'Scope',
        body: `This is a string transform helper. It does not sign URLs, add authentication, or protect against open redirects—those are server-side and application design concerns.`,
      },
    ],
  },
  'hash-generator': {
    sections: [
      {
        heading: 'What a hash is in plain language',
        body: `A hash function takes input of any size and returns a fixed-length fingerprint. It is used for integrity checking, building data structures, and in security contexts when combined with the right key material and parameters. A hash result can tell you that two large files are probably identical, even if you cannot view the whole file at once.`,
      },
      {
        heading: 'How to work with the outputs here',
        body: `Pick the algorithm your workflow expects, such as SHA-256 for many integrity checks, and be careful with MD5 for security-sensitive tasks—it is not appropriate for new cryptographic use cases. If you are comparing a downloaded file, compare the hash the publisher publishes with the file you actually downloaded, not with a renamed copy.`,
      },
      {
        heading: 'This tool is not a full security system',
        body: `Hashing a password client-side is not a substitute for proper password storage on a service. The tool helps compute digests, not design threat models, salting, or server-side account protection.`,
      },
    ],
  },
  'uuid-generator': {
    sections: [
      {
        heading: 'Why UUIDs show up in modern software',
        body: `Universally unique identifiers (UUIDs) are used as database keys, file names, and correlation IDs because they are cheap to generate and rarely collide in practice. Version 4 UUIDs, when implemented well, are appropriate for “generate an ID and move on” workflows. They are not a security boundary by themselves.`,
      },
      {
        heading: 'Practical use',
        body: `Generate a UUID, copy it, and use it in your app’s ID field, local data store, or test fixture. If you need deterministic IDs for replication or offline-first sync, you may need a different strategy than random UUIDs. If you are exposing IDs publicly, treat them as opaque tokens rather than secrets.`,
      },
      {
        heading: 'Uniqueness expectations',
        body: `Random UUIDs are not mathematically impossible to collide, but the probability is low for normal applications. The tool cannot coordinate global uniqueness across distributed systems; your architecture still matters.`,
      },
    ],
  },
  'lorem-ipsum-generator': {
    sections: [
      {
        heading: 'What placeholder text is for',
        body: `Designers and developers use lorem text to test layout, typography, and responsive breakpoints without getting distracted by real copy debates. The point is to hold space that resembles real content length, not to publish final messaging.`,
      },
      {
        heading: 'How to make useful prototypes',
        body: `Match paragraph and word count roughly to the real content you expect. If a layout breaks only with lorem, it will still break in production. When you are ready, replace the placeholder with actual copy that reflects headings, CTA text, and realistic translations if you support multiple languages.`,
      },
      {
        heading: 'A simple reminder',
        body: `Lorem ipsum is not meaningful text for SEO or user comprehension. It should not go live on public pages meant to be indexed by search engines.`,
      },
    ],
  },
  'timestamp-converter': {
    sections: [
      {
        heading: 'Why timestamps are confusing in real work',
        body: `Developers, support teams, and analysts often compare logs from different systems that use Unix seconds, milliseconds, or ISO strings, sometimes with and without time zones. A converter reduces translation mistakes when you are debugging an incident and need to line up “what happened when.”`,
      },
      {
        heading: 'How to get consistent results',
        body: `Confirm whether your source is seconds or milliseconds—mixing the two is a classic bug. If you need local wall-clock time, set your time zone context carefully, especially around daylight saving changes. If you are comparing two services, use UTC as a common reference when possible.`,
      },
      {
        heading: 'Limits',
        body: `This is an arithmetic and formatting aid. It does not fetch authoritative server time or replace proper clock sync (NTP) in production systems.`,
      },
    ],
  },
  'unit-converter': {
    sections: [
      {
        heading: 'Everyday and technical conversions',
        body: `Unit conversion is needed for cooking, travel, school homework, and engineering back-of-envelope checks. A dedicated converter is faster and less error-prone than mental math when you are working across measurement systems, especially for nested units like area and volume.`,
      },
      {
        heading: 'How to use it carefully',
        body: `Choose the “from” and “to” units deliberately and watch for common traps like confusing pounds-force with pounds-mass, or US gallons vs. imperial gallons. If a result feeds into safety-critical or regulated work, cross-check the definition the standard expects.`,
      },
      {
        heading: 'Disclaimer',
        body: `This is a general-purpose tool. It does not replace certified calibration, lab procedures, or domain-specific standards.`,
      },
    ],
  },
  'percentage-calculator': {
    sections: [
      {
        heading: 'Where percentage math actually appears',
        body: `Discounts, tax estimates, margin calculations, and grade weights all rely on the same few percentage patterns. A calculator is helpful when the mental model is not obvious—like computing “what percent is A of B” versus “A increased by 12% to what new value,” which are different questions.`,
      },
      {
        heading: 'Clarify the question before you type',
        body: `Write down whether you are dealing with a simple ratio, a percentage change, or a compound effect over multiple periods. If a loan or tax scenario has caps, special brackets, or rounding rules, a basic calculator will not know those business rules. Use the result as a quick estimate when appropriate.`,
      },
      {
        heading: 'Not financial advice',
        body: `Percent results here are only as good as the inputs. They are not a substitute for professional accounting or legal review when money is at stake.`,
      },
    ],
  },
  'random-number-generator': {
    sections: [
      {
        heading: 'Fairness, sampling, and simple games',
        body: `You might use random numbers to pick a lottery winner, sample rows for QA testing, or break ties. The important part is to define the range, whether duplicates are allowed, and what “fair” means for your situation. A generator helps remove human bias in selection, but it is not a statistical consulting tool.`,
      },
      {
        heading: 'How to set ranges meaningfully',
        body: `Decide if your range is inclusive on both ends, because off-by-one errors are easy. If you need cryptographically strong randomness, browser JS randomness is not the right place to stop—use platform crypto APIs or OS-level services designed for that threat model. For school demos and casual sampling, a simple range is often enough.`,
      },
      {
        heading: 'Reproducible science and gaming',
        body: `If you need the same “random” sequence for debugging, you will want a seeded approach in code, not this page. The tool is for ad hoc draws.`,
      },
    ],
  },
  'text-to-binary': {
    sections: [
      {
        heading: 'Learning and debugging use cases',
        body: `Binary representation helps students understand character encoding, and it helps debug odd serialization problems where text is not what you think it is. This tool is an educational and inspection aid, not a compression or encryption system.`,
      },
      {
        heading: 'How to work with the output',
        body: `Convert small snippets so you can see the mapping clearly. If you are handling non-English characters, be aware of encoding choices like UTF-8 and the fact that one visible character can map to multiple bytes. If you are copying the binary, watch spaces and line breaks in your final destination system.`,
      },
      {
        heading: 'Security note',
        body: `Binary form does not make secrets safe. It is a representation change only.`,
      },
    ],
  },
  'html-encoder-decoder': {
    sections: [
      {
        heading: 'What HTML entity encoding is really preventing',
        body: `When you insert user text into HTML, you must escape characters like <, >, and & so the browser does not treat them as markup. Encoding is a core defense against some cross-site scripting (XSS) issues when you must render untrusted text. It is a developer hygiene step, not the whole security story.`,
      },
      {
        heading: 'When to encode vs decode here',
        body: `Encode to prepare a string for safe HTML insertion. Decode to read a string that is currently escaped, such as an attribute value in a test fixture. If you are building production apps, prefer framework auto-escaping, templating features, and vetted sanitizer libraries where appropriate, not a manual one-off in isolation.`,
      },
      {
        heading: 'Cautions',
        body: `Do not paste production secrets or personal data into a browser tool on shared computers. The tool is for development and content preparation.`,
      },
    ],
  },
  'invoice-generator': {
    sections: [
      {
        heading: 'What a simple invoice can include',
        body: `Small freelancers still need a clean, readable invoice: seller and buyer details, line items, taxes if applicable, payment instructions, and due date. A generator is useful to produce a first draft you can copy into a PDF, accounting tool, or email without formatting everything by hand in a word processor each time.`,
      },
      {
        heading: 'How to use a template like a pro',
        body: `Start with your real legal/brand details, not placeholders. If your region requires a tax ID, invoice numbering sequence, or specific wording, add those before sending to clients. Keep numbering consistent in your own records even if the tool does not “remember” you across sessions. Export or print a copy for your archive.`,
      },
      {
        heading: 'This is a drafting aid, not tax advice',
        body: `Tax rules, VAT/GST, withholding, and e-invoicing requirements vary. Validate compliance with a qualified professional or your government portal before you rely on an auto-generated document.`,
      },
    ],
  },
  'markdown-editor': {
    sections: [
      {
        heading: 'Why people still write in Markdown',
        body: `Markdown is a low-friction way to add structure—headings, lists, links, and code—without a heavy editor. It is used for README files, internal docs, and note systems that can render to HTML. A live preview makes it easy to see mistakes before you ship a document.`,
      },
      {
        heading: 'Good habits while editing',
        body: `Use consistent heading levels, and do not skip from H1 to H3. Prefer reference-style links in large docs for readability. If you are publishing to a platform with its own flavor of Markdown, read that platform’s rules—tables, footnotes, and math are not always portable.`,
      },
      {
        heading: 'Boundaries',
        body: `This is an editing view, not a collaboration system with permissions, version history, or org-wide content governance.`,
      },
    ],
  },
  'css-minifier': {
    sections: [
      {
        heading: 'What minification is trying to achieve',
        body: `Minified CSS removes extra whitespace and comments to reduce file size. That can help page load, especially for large stylesheets, when paired with proper caching, compression, and build pipelines. It does not remove unused CSS by itself—that is a different optimization (often in your bundler or design system).`,
      },
      {
        heading: 'When to use it on this page',
        body: `Paste a stylesheet fragment you own or have rights to minify, then use the result in a tested build. Keep the original unminified source in version control; never treat minified text as the source of truth for long-term maintenance. If your site uses PostCSS, Tailwind, or a framework build, prefer your project’s minifier to avoid format mismatches.`,
      },
      {
        heading: 'Watch-outs',
        body: `Some advanced CSS can be sensitive to transforms if the minifier is naive. If something breaks, compare a small before/after and adjust your build settings.`,
      },
    ],
  },
  'js-minifier': {
    sections: [
      {
        heading: 'Why JavaScript minification still exists in modern stacks',
        body: `JavaScript minification shortens code for transport, mainly by removing extra whitespace and comments, and may apply safe local optimizations depending on the tool. It is a complement to tree-shaking, code splitting, and server compression—not a replacement for good architecture. Many teams do this in CI via bundlers, but a browser tool can be handy for small snippets.`,
      },
      {
        heading: 'How to use a minifier without regret',
        body: `Minify the code you are allowed to process and that you can test afterward. If you are debugging, keep a map file from your build tools rather than only minified output. If you are pasting a library, respect its license and avoid stripping license headers where required. For production, prefer your app’s build pipeline to keep a single, audited path.`,
      },
      {
        heading: 'It does not make code “secure”',
        body: `Minified code is harder to casually read, but it is not encryption. It does not remove secrets in client-side bundles.`,
      },
    ],
  },
  'gradient-generator': {
    sections: [
      {
        heading: 'Why gradients are still a UI staple',
        body: `Gradients can guide attention, add depth, and make buttons feel more tactile without large images. The useful part of a generator is the ability to play with color stops, angle, and CSS syntax until you can copy a snippet that matches your design system.`,
      },
      {
        heading: 'How to avoid muddy results',
        body: `Limit the number of stops if you need a clean, modern look. Test your gradient in light and dark themes and on low-end displays, where color banding can show up. If the gradient is behind text, check contrast; subtle backgrounds should not destroy readability.`,
      },
      {
        heading: 'It does not pick brand strategy',
        body: `The tool provides CSS, not a full accessibility audit, brand book, or motion policy.`,
      },
    ],
  },
  'box-shadow-generator': {
    sections: [
      {
        heading: 'What box shadow changes in UI',
        body: `Shadows separate layers, hint at elevation, and can make cards feel tappable. Too much shadow, or many competing shadows, can make a layout noisy. A generator is useful to tune blur, spread, and offsets until the depth feels intentional.`,
      },
      {
        heading: 'A practical process',
        body: `Start with a small shadow, then add blur before increasing spread, because spread widens the footprint fast. If you are designing a dark mode, re-test: shadows that look “premium” on light backgrounds can look dirty on dark backgrounds. If you are copying CSS into a component library, keep tokens for elevation levels rather than ad hoc values everywhere.`,
      },
      {
        heading: 'Rendering differences',
        body: `Browsers and operating systems can render shadows slightly differently. Use this as a design aid and verify in real devices you care about.`,
      },
    ],
  },
  'loan-calculator': {
    sections: [
      {
        heading: 'What an EMI/loan calculator is good for',
        body: `It helps you understand how principal, interest rate, and term interact to form your periodic payment, and it shows how much interest you will pay in total. That can support comparison shopping, but only if you are comparing the same type of product with the same fee structure, compounding rules, and payment frequency.`,
      },
      {
        heading: 'How to enter inputs you can trust',
        body: `Make sure the rate matches the quote (annual vs. monthly) and the term matches the lender’s months/years. Add known fees in the right place if the tool has a field for it; otherwise remember that a low monthly payment can still be expensive with upfront fees. If you are choosing between two loans, compare APR-like totals when possible, not the monthly payment alone.`,
      },
      {
        heading: 'This is not a lending product',
        body: `Banks and regulators apply their own rules, rounding, insurance add-ons, and variable rates. The results here are educational estimates, not a commitment or offer.`,
      },
    ],
  },
  'calorie-calculator': {
    sections: [
      {
        heading: 'What calorie estimates represent',
        body: `Calorie calculators use formulas such as Mifflin–St Jeor to estimate baselines from height, weight, age, and activity. These numbers are a planning starting point, not a guarantee of your metabolism, hormone status, or medical conditions. The same food label can be absorbed differently in real life, so use trends over weeks, not a single number.`,
      },
      {
        heading: 'How to use the output without spiraling',
        body: `If you are working with a clinician or coach, share the estimate as context. If the tool asks for activity level, be honest, because the multiplier swings the result. If the goal is weight change, small sustainable adjustments and consistency matter more than chasing perfect precision in one TDEE value.`,
      },
      {
        heading: 'Not medical advice',
        body: `The numbers are for general information. Any diet change for medical reasons should be supervised by a qualified professional.`,
      },
    ],
  },
  'date-calculator': {
    sections: [
      {
        heading: 'Where date math shows up in real work',
        body: `You might need the number of days between contract dates, the due date after a 30-day policy, or the weekday of a past release. Manual counting across months is where mistakes happen, especially with leap years and different month lengths.`,
      },
      {
        heading: 'How to avoid wrong answers',
        body: `Confirm whether the business rule is inclusive of both start and end dates, because tools differ. If you are doing legal date math, a jurisdiction’s definition of a “business day” can matter, and that is not a universal default. If you are scheduling globally, be careful about time zones; this tool focuses on calendar dates, not the full 24-hour global timeline.`,
      },
      {
        heading: 'Not legal advice',
        body: `Use this to assist arithmetic; verify time-sensitive rights and deadlines with the governing authority or counsel.`,
      },
    ],
  },
  'timezone-converter': {
    sections: [
      {
        heading: 'Why time zones still break software and meetings',
        body: `Global teams convert between zones constantly. The failure mode is not math alone—it is ambiguous local times during daylight saving changes, and “the same wall clock” on different days. A converter helps you pick an instant in time more reliably if you are careful about the inputs.`,
      },
      {
        heading: 'How to use a converter in practice',
        body: `Start from a known point—either a UTC time or a city with a well-defined ruleset—and then convert. If you are scheduling, share the time in two zones or include a calendar invite with a stored instant. Remember that a converter cannot know your org’s “holiday calendar” or a country’s ad hoc clock changes for special events; those require human context.`,
      },
      {
        heading: 'Data freshness',
        body: `Time zone rules change occasionally. If an appointment is high stakes, double-check the source behind the conversion rules the tool uses.`,
      },
    ],
  },
  'pomodoro-timer': {
    sections: [
      {
        heading: 'What the Pomodoro method is for',
        body: `The technique alternates focused work windows with short breaks, which can reduce burnout and make large tasks startable. It is not a magic productivity hack for everyone, but it is a low-cost experiment if you have trouble with sustained focus or procrastination on starting.`,
      },
      {
        heading: 'How to adapt it without rigidity',
        body: `Try the classic 25/5 split, then adjust the focus length to match the kind of work—deep code review might need longer blocks, while email triage might need shorter ones. The timer is a boundary tool; if you are in flow and harming nothing, you can sometimes extend a block deliberately. The goal is better attention management, not perfect adherence to a clock.`,
      },
      {
        heading: 'A gentle limitation',
        body: `If you have attention or health issues that a timer cannot address, the tool is a minor aid, not a replacement for professional support.`,
      },
    ],
  },
  'regex-tester': {
    sections: [
      {
        heading: 'Why regex is still both loved and hated',
        body: `Regular expressions are powerful for pattern matching, but they are easy to get subtly wrong, especially with greedy quantifiers, Unicode, and line-ending differences. A tester helps you see matches against sample strings, which is faster than guessing with deploy cycles.`,
      },
      {
        heading: 'A disciplined workflow',
        body: `Start with small samples that include your edge cases, then add complexity. If you are using flags like multiline or dot-all, re-read what they do in your engine. If a pattern will process untrusted input, also think about performance traps like catastrophic backtracking; a tester can show a match but not a denial-of-service risk under load.`,
      },
      {
        heading: 'Dialect differences',
        body: `JavaScript, PCRE, and other engines have differences. The behavior on this page matches the environment the tool is built in—treat the result as a development aid, not a proof for every platform.`,
      },
    ],
  },
  'ip-lookup': {
    sections: [
      {
        heading: 'What IP information can and cannot mean',
        body: `An IP address can point to a rough geographic and network association, often at city or regional precision. It is not a reliable way to identify a person’s home address, and it can be wrong when users are on VPNs, mobile networks, or corporate egress points. It is a network troubleshooting and coarse targeting signal, not a full identity system.`,
      },
      {
        heading: 'How to use lookup responsibly',
        body: `Use it to understand a log line, not to accuse a user. If you are building a product, do not over-collect: follow privacy laws, publish what you log, and avoid storing more than you need. If a lookup is wrong, the lesson is the limitation of the database, not an excuse to escalate conflict.`,
      },
      {
        heading: 'Data sources',
        body: `Results depend on third-party databases that change. Treat them as best-effort data for debugging, not a court-grade record.`,
      },
    ],
  },
  'barcode-generator': {
    sections: [
      {
        heading: 'Where simple barcodes still matter',
        body: `Linear barcodes are still used for retail SKUs, asset tags, and inventory when a simple scan path is enough. A generator can create an image for testing printers, app scanning flows, and classroom demos. The barcode is only a symbol for a string; it does not validate that the string is a real, licensed product code.`,
      },
      {
        heading: 'Practical use',
        body: `Choose a symbology that matches the scanner hardware you are targeting. Print at adequate resolution and quiet zones so scanners read reliably. If you need 2D codes for dense payloads, a different code type than a basic 1D barcode may be more appropriate—plan for your ecosystem.`,
      },
      {
        heading: 'Compliance',
        body: `Retail and healthcare regulations about identifiers are strict. The tool helps you generate an image, not register a GTIN/UPC or meet GS1 requirements.`,
      },
    ],
  },
  'csv-to-json': {
    sections: [
      {
        heading: 'Why this conversion is still a daily dev task',
        body: `Spreadsheets export CSV for everything from analytics exports to back-office data pulls. Many APIs expect JSON, so a conversion step appears constantly in quick scripts, prototypes, and one-off data cleanup jobs. A converter in the browser is handy when you want a fast look without writing a one-liner in a terminal.`,
      },
      {
        heading: 'Get predictable JSON',
        body: `Set the delimiter if your file is tab-separated or uses semicolons. Watch quotes and newlines inside fields—true CSV is trickier than it looks. If your CSV has a header row, make sure the tool treats the first line as keys when that is your intent. If the JSON is huge, be mindful of browser performance.`,
      },
      {
        heading: 'Type awareness',
        body: `CSV is all strings until you choose types. If you need numbers, booleans, and dates, you may still need a follow-up step in code.`,
      },
    ],
  },
  'random-password-generator': {
    sections: [
      {
        heading: 'When bulk password generation is useful',
        body: `Bulk generation is useful when you are setting up multiple test accounts, provisioning temporary credentials for a demo or staging environment, or rotating a family of service account secrets in a controlled workflow. Generating a fresh random set for each slot reduces the risk of credential reuse across systems.`,
      },
      {
        heading: 'How to choose good generation settings',
        body: `Longer passwords are significantly stronger. A 20-character random string is far harder to brute-force than a 10-character one even if both use the same character set. Include uppercase, lowercase, numbers, and symbols unless the target system forbids specific characters. If a service disallows certain symbols, uncheck that character class and regenerate rather than manually replacing characters, which introduces patterns.`,
      },
      {
        heading: 'Safe handling after generation',
        body: `Copy what you need and paste directly into a password manager. Avoid leaving generated passwords in chat windows, emails, or clipboard history tools that sync across devices. If you are working in a shared screen session, clear the output before sharing your screen. Generated passwords should be treated as secrets from the moment they appear.`,
      },
      {
        heading: 'What this tool is not',
        body: `This is a browser-based random character generator, not a passphrase generator, a secret vault, an access review system, or a compliance workflow. For teams that need centralized credential management, rotation automation, or audit trails, a dedicated secrets manager is the right tool.`,
      },
    ],
  },
    'text-diff-checker': {
    sections: [
      {
        heading: 'What diffs are for beyond Git',
        body: `You diff two texts to see what changed between versions of a config, a contract paragraph, a translation, or a long email draft. A visual diff highlights insertions and deletions so you can review faster than with eyeball scanning. It is a communication tool as much as a development tool.`,
      },
      {
        heading: 'How to read results constructively',
        body: `Ignore whitespace-only changes if your tool allows, because they hide meaningful edits. If the text moved blocks around, a diff can look noisier than the conceptual change. For legal text, a single comma can matter, so do not over-trust a green/red summary without reading the sentence in context.`,
      },
      {
        heading: 'Sensitive content',
        body: `Do not diff secrets on untrusted devices. The comparison should stay local, but the overall risk of shoulder surfing still exists in public places.`,
      },
    ],
  },
  'email-validator': {
    sections: [
      {
        heading: 'What email validation actually checks',
        body: `Most validators check a syntactic pattern: there is a local part, an @ sign, and a recognizable domain. That catches obvious typos such as missing the @ symbol, double dots, or incomplete addresses. It does not prove a mailbox exists, is currently active, or belongs to the person you expect — only a delivery attempt or confirmation email can verify that.`,
      },
      {
        heading: 'Common email format mistakes this tool catches',
        body: `Typical errors include missing or misplaced @ signs, spaces in the address, invalid characters in the local part, missing top-level domains (example: user@domain with no .com), and double dots before or after the @ sign. Catching these before submission improves form UX and reduces bounce rates in email campaigns.`,
      },
      {
        heading: 'How to use validation alongside good UX',
        body: `In web forms, pair syntax validation with helpful inline hints — for example, suggesting ".com" when a user types ".ocm" or ".con". Provide a specific error message like "Email address is missing the @ symbol" rather than a generic "invalid email" label. If you are building a sign-up flow, also offer a confirmation email step, since correct syntax does not equal a real inbox.`,
      },
      {
        heading: 'What this tool is not',
        body: `This tool does not check MX records, SMTP deliverability, inbox reputation, or whether an address belongs to a real person. It is a quick syntax helper for developers and form designers. For bulk email list cleaning or deliverability scoring, a dedicated email verification service is the appropriate choice.`,
      },
    ],
  },
    'stopwatch': {
    sections: [
      {
        heading: 'When a stopwatch is still the right UI',
        body: `You use a stopwatch for repeatable timing like fitness intervals, public speaking run-throughs, or simple benchmark loops when you are not in a full profiling environment. A lap feature helps you compare segments, not just total time.`,
      },
      {
        heading: 'How to avoid misleading measurements',
        body: `Browser timers are affected by throttling, background tabs, and device load. If you are measuring sub-second work precisely, a lab setup with proper tools is more reliable. If you are measuring human performance, the bigger variable is still technique, not millisecond clock precision.`,
      },
      {
        heading: 'A simple tool',
        body: `This is an everyday utility. It is not a certified chronometer and not intended for safety-critical events.`,
      },
    ],
  },
  'font-preview': {
    sections: [
      {
        heading: 'Why font previewing matters before you commit',
        body: `The same typeface can read differently with your exact body text, weights, and sizes. A preview helps you catch illegible small text, poor number styling in tables, and awkward kerning in headings before you ship a site or a PDF. It is a quick way to shortlist options.`,
      },
      {
        heading: 'How to evaluate fonts like a product decision',
        body: `Test with the real languages you will ship, not only English if you are multilingual. Check numerals, punctuation, and code snippets if you are a software site. Think about performance: web font files add bytes and FOUT/FOIT behavior, so pairing preview with a performance budget matters.`,
      },
      {
        heading: 'Licensing',
        body: `Showing a font in a browser preview does not replace reading the foundry’s license for embedding and redistribution. Choose fonts you are allowed to use in your product.`,
      },
    ],
  },
  'speed-test': {
    sections: [
      {
        heading: 'What a browser speed test can tell you',
        body: `A speed test is a quick snapshot of how fast your current network path can move data under near-ideal conditions, usually by transferring data to and from nearby test servers. It helps confirm whether a slow connection is caused by ISP underperformance, weak Wi-Fi signal, a throttling VPN, or too many devices sharing bandwidth. It is useful as a first diagnostic step before contacting your internet provider or adjusting your network setup.`,
      },
      {
        heading: 'Understanding download speed, upload speed, and latency',
        body: `Download speed (Mbps) measures how fast data reaches your device — important for streaming, browsing, and large file transfers. Upload speed matters for video calls, cloud backups, and publishing content. Latency (ping in ms) measures the round-trip time for a small packet; low latency is critical for gaming, video conferencing, and real-time applications even when your Mbps looks fine. Jitter measures variability in latency and causes choppy audio or video even on fast connections.`,
      },
      {
        heading: 'How to get less noisy, more reliable results',
        body: `Close background apps and pause any active downloads before testing. Use a wired Ethernet connection instead of Wi-Fi when you want to isolate ISP performance from Wi-Fi hardware limits. Run the test at different times of day because network congestion changes in evenings and weekends. Run at least three tests and compare them — routing changes and server load can cause single-test outliers. If you are comparing two locations, use the same test server and conditions for a fair comparison.`,
      },
      {
        heading: 'What a speed test result does not diagnose',
        body: `A clean speed test result does not mean every service on your device will be fast. DNS resolution delays, browser extensions, VPN overhead, content delivery network (CDN) routing, and the performance of a specific app's servers can all cause slowness even when your raw speed looks healthy. If a single website is slow but general browsing is fine, the issue is more likely on the service side than your connection. This tool gives you a useful clue, not a complete network health report.`,
      },
      {
        heading: 'Privacy and data handling',
        body: `This speed test runs in your browser on SimpleWebToolsBox. The test transfers sample data to measure your connection throughput. No personally identifiable information is collected or stored as part of the measurement process.`,
      },
    ],
  },
}

export function getToolNarrative(slug: string): ToolNarrative | null {
  return toolNarratives[slug] ?? null
}
