import { stitch } from '@google/stitch-sdk';
import { writeFileSync } from 'fs';

const ENRICHED_PROMPT = `Design a premium SaaS landing page for 'DataPulse AI', an AI-powered data analysis tool. Users upload CSV files and get instant AI insights, charts, and anomaly detection.

HERO SECTION:
- Headline: 'Vos données parlent. Écoutez-les.' (French)
- Subheadline: 'Uploadez un CSV, obtenez des insights IA en secondes. Tendances, anomalies, graphiques — sans écrire une seule requête.'
- A STUNNING hero visual: a floating 3D data visualization dashboard showing animated charts (bar chart, line chart, pie chart), with glowing data points and flowing particle connections between chart elements
- The visualization should look like a holographic data display floating in space
- Two CTAs: 'Essayer gratuitement' (primary gradient) and 'Voir un exemple' (secondary)
- Small badge: 'Analyse IA en moins de 30 secondes'

SOCIAL PROOF STRIP:
- 'Propulsé par Claude (Anthropic)' with small logos/badges
- '500+ analyses cette semaine'

HOW IT WORKS (3 steps):
- Step 1: 'Uploadez' — Drag & drop your CSV file
- Step 2: 'L\u2019IA analyse' — Claude examines patterns, anomalies, correlations
- Step 3: 'Visualisez' — Interactive charts and actionable insights

FEATURES SECTION (grid):
- 'Detection d\u2019anomalies' — AI spots outliers automatically
- 'Graphiques intelligents' — Auto-generated charts based on data structure
- 'Insights en langage naturel' — Plain French explanations
- 'Export & partage' — Download reports, share with team
- 'Multi-format' — CSV, Excel, Google Sheets compatible
- 'Confidentialite' — Vos donnees ne sont jamais stockees

LIVE DEMO PREVIEW:
- A section showing a screenshot-style mockup of the analysis interface with:
  - File upload area on the left
  - Results panel on the right showing: summary card, 2 insight cards, a bar chart, and a data table preview
  - This should look like an actual app screenshot, not an illustration

CTA SECTION:
- 'Pret a comprendre vos donnees ?'
- Gradient CTA button
- 'Gratuit jusqu\u2019a 10 analyses par mois'

STYLE:
- Navy #0F172A base, #1E293B surface
- Gradient: indigo #6366F1 to violet #8B5CF6 to cyan #06B6D4 to emerald #34D399
- Data-themed accents: chart-like decorative elements, flowing data lines
- Glass cards with backdrop-filter blur, mesh gradient background, fine dot/grid pattern overlay
- Premium Syne headings (Google Fonts), Geist body font
- The hero visualization should be the SHOWPIECE: spectacular CSS-animated chart elements, glowing SVG lines, floating data points, particle effects
- shadcn/ui component style, Tailwind CSS v4 utility classes
- Full dark mode throughout
- Generous whitespace, premium spacing`;

(async () => {
  try {
    console.log('Creating Stitch project...');
    const project = await stitch.createProject('ai-data-agent-landing');
    console.log('Project created:', project.id);

    console.log('Generating screen (this may take 30-60s)...');
    const screen = await project.generate(ENRICHED_PROMPT, 'DESKTOP');
    console.log('Screen generated:', screen.id);

    const htmlUrl = await screen.getHtml();
    const imageUrl = await screen.getImage();
    console.log('HTML URL:', htmlUrl);
    console.log('Image URL:', imageUrl);

    const html = await fetch(htmlUrl).then(r => r.text());
    writeFileSync('/home/cgemise/projects/ai-data-agent/.stitch/preview/landing.html', html);
    console.log('HTML saved to .stitch/preview/landing.html');

    const imgResponse = await fetch(imageUrl);
    const imgBuffer = Buffer.from(await imgResponse.arrayBuffer());
    writeFileSync('/home/cgemise/projects/ai-data-agent/.stitch/preview/landing.png', imgBuffer);
    console.log('Screenshot saved to .stitch/preview/landing.png');

    writeFileSync('/home/cgemise/projects/ai-data-agent/.stitch/preview/current-screen.json', JSON.stringify({
      screenId: screen.id,
      projectId: project.id,
      prompt: ENRICHED_PROMPT,
      device: 'DESKTOP',
      generatedAt: new Date().toISOString()
    }, null, 2));

    console.log('--- DONE ---');
    console.log('HTML:  /home/cgemise/projects/ai-data-agent/.stitch/preview/landing.html');
    console.log('PNG:   /home/cgemise/projects/ai-data-agent/.stitch/preview/landing.png');
  } catch (err) {
    console.error('ERROR:', err.message || err);
    if (err.code) console.error('Code:', err.code);
    process.exit(1);
  }
})();
