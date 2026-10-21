import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WorkflowStepsGuide from './components/WorkflowStepsGuide';
import UrlInputPanel from './components/UrlInputPanel';
import EditableTable from './components/EditableTable';
import ResultsTable from './components/ResultsTable';
import FullRewriteModal from './components/FullRewriteModal';
import HowItWorksModal from './components/HowItWorksModal';
import { BlogItem, SEORecommendations } from './types';
import { Sparkles, RefreshCw, AlertCircle, Play, Info, CloudLightning, FileText } from 'lucide-react';

const PROXY_BASE = 'https://gemini-proxy-boldstudio.vercel.app/api';

export default function App() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Full content rewrite modal state
  const [selectedRewriteItem, setSelectedRewriteItem] = useState<BlogItem | null>(null);
  const [isGeneratingRewrite, setIsGeneratingRewrite] = useState(false);

  // How it works modal state
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Load sample content on first mount so the user has immediate interactive states to explore
  useEffect(() => {
    const defaultData: BlogItem[] = [
      {
        id: 'default-1',
        url: 'https://example.com/Rome-Tours',
        targetKeyword: 'private local tour guide rome',
        currentTitle: 'Example Travel | Private Tour Guides & Rome Day Excursions',
        pageType: 'Destination Guide',
        status: 'Analyzed',
        pageContent: 'Connect with a private local guide in Rome. Customize private walking tours of the Colosseum, Vatican museums, hidden piazzas, and high-quality local-expert style itineraries...',
        recommendations: {
          searchIntent: 'High commercial intent travelers looking to hire professional private local guides in Rome, skip-the-line museum tickets, and custom private vehicle excursions.',
          missingTopics: ['Vatican audio-guide vs certified personal guide', 'Custom accessible senior citizen Rome routes', 'Kid-friendly scavenger hunts in Rome'],
          missingEntities: ['Colosseum', 'Vatican Museums', 'St. Peter\'s Basilica', 'Borghese Gallery', 'Private Mercedes Minivan tour'],
          faqIdeas: [
            { question: 'Can I customize my Rome tour itinerary?', answer: 'Yes! All Example Travel Rome itineraries are 100% customizable. You can request changes directly by messaging the guide.' },
            { question: 'Is transport included in Rome customizable tours?', answer: 'Some local guides include private vehicles with licensed driver credentials, while others conduct historical walking tours with optional taxi transfers.' }
          ],
          internalLinks: ['Link to Italy Destination Guide', 'Link to Vatican certified guides category page'],
          freshnessIssues: 'Citing outdated museum ticketing booking window periods. Needs update to reflect current-year regulations.',
          improvedMetaTitle: 'Top Rated Private Tour Guides in Rome | Custom Example Travel',
          improvedMetaDescription: 'Experience Rome like a local. Book custom private tours of the Colosseum, Vatican, and hidden spots with certified local guides tailored to your pace.',
          priorityScore: 9,
          recommendedAction: 'Enhance E-E-A-T badges with individual guide certificates & add interactive FAQ schema.'
        },
        fullRewrite: {
          rewrittenMarkdown: `# Top Rated Private Tour Guides in Rome | Custom Example Travel

> **Meta Description:** *Experience Rome like a local. Book custom private tours of the Colosseum, Vatican, and hidden spots with certified local guides tailored to your pace.*
>
> **Target Primary Keyword:** \`private local tour guide rome\` | **Updated for:** **2026 Travel Season** | **Reading Time:** ~13 minutes | **Article Type:** Comprehensive Pillar Destination Guide

---

## Executive Summary: What You Need to Know for Rome in 2026

Planning an unforgettable journey to **Rome** requires balancing iconic landmarks with authentic local rhythms. Whether you are traveling as a couple, with family, or solo, this comprehensive guide delivers field-tested advice, skip-the-line ticketing strategies, neighborhood breakdowns, and insider secrets curated by local guides.

| Quick Trip Planner | Local Expert Details & Advice |
| :--- | :--- |
| **Recommended Stay** | **4 to 5 full days** (4 days for city center + 1 day trip to Tivoli or Castelli Romani) |
| **Best Travel Seasons** | **Spring (April–May)** & **Autumn (September–October)** for idyllic weather and fewer crowds |
| **Primary Transit Mode** | Metro Line A & B for long hops; scenic walking through the historic cobblestone core |
| **Must-Book Weeks Ahead** | Colosseum Underground, Vatican Museums, and Galleria Borghese timed reservations |
| **Contactless / Currency** | Tap-and-go cards accepted at all transit turnstiles and restaurants; carry small cash (€20) |
| **Average Daily Budget** | €140–€300 / day per person depending on private guide options and dining |

---

## Why Rome Captivates Global Travelers

Few destinations on earth combine the cultural depth, historic majesty, and vibrant neighborhood energy found in **Rome**. Every cobblestone lane tells a multi-century story, from ancient architectural triumphs to family-owned artisan workshops that have operated for generations.

To truly understand Rome, you must look beyond standard tourist itineraries. The true magic reveals itself in the quiet morning moments before the tour buses arrive, the conversations shared with passionate local artisans, and the unmistakable aroma of regional cuisine drifting through neighborhood alleyways at dusk.

---

## Curated 4-Day Master Itinerary for Rome

To help you maximize your time without rushing through crowds, here is an optimized 4-day itinerary designed for seamless pacing and geographic efficiency.

\`\`\`
  Day 1: Ancient Rome & The Colosseum Underground
  Day 2: The Vatican, Renaissance Masterpieces & Trastevere Evenings
  Day 3: Baroque Fountains, Historic Markets & The Borghese Gallery
  Day 4: The Appian Way, Underground Catacombs & Castelli Romani
\`\`\`

### Day 1: Ancient Rome & The Colosseum Underground
- **Morning (08:30 – 12:30):** Beat the midday heat at **The Colosseum, Roman Forum & Palatine Hill**. Pre-book timed-entry skip-the-line tickets or explore with a private guide who can navigate VIP access lines. Marvel at the underground gladiatorial chambers and the panoramic view over the Forum from Palatine Hill.
- **Lunch Break (12:30 – 14:00):** Avoid restaurants directly facing the monument. Walk 3 blocks into the charming Monti district for an authentic lunch featuring *Carbonara or Cacio e Pepe*.
- **Afternoon (14:30 – 17:30):** Stroll through the **Capitoline Museums** and the monumental Piazza del Campidoglio designed by Michelangelo.
- **Evening (18:30 – 21:30):** Experience a sunset stroll by the Imperial Forums, followed by traditional Roman dining in a family-run *osteria*.

### Day 2: The Vatican & Atmospheric Trastevere
- **Morning (08:00 – 12:30):** Early access tour of **The Vatican Museums, Sistine Chapel & St. Peter's Basilica**. Discover Michelangelo's ceiling frescoes and the stunning Raphael Rooms before standard crowds arrive.
- **Lunch (12:30 – 14:00):** Cross the Tiber River to the Borgo district for freshly baked *pizza al taglio* and artisanal espresso.
- **Afternoon (14:30 – 17:00):** Explore **Castel Sant'Angelo** and its historic ramparts offering panoramic views along the Tiber.
- **Sunset & Evening (18:00 – Late):** Cross over to **Trastevere**. Wander through ivy-draped cobblestone alleys, sample *Supplì al Telefono*, and enjoy an open-air dinner in Piazza Santa Maria in Trastevere.

### Day 3: Baroque Masterpieces & Historic Food Markets
- **Morning Market Exploration (08:30 – 11:30):** Visit the lively **Campo de' Fiori Morning Market**. Taste seasonal Roman artichokes, aged pecorino, and wild flower honeys.
- **Midday Baroque Walk (12:00 – 15:30):** Marvel at the **Pantheon**, toss a coin into the **Trevi Fountain**, and explore Bernini's Four Rivers Fountain in **Piazza Navona**.
- **Afternoon Leisure (16:00 – 18:30):** Tour the **Galleria Borghese** to view Bernini's marble sculptures (Apollo and Daphne) and stroll through the surrounding Villa Borghese gardens.
- **Evening Dining (19:30 – 22:30):** Indulge in *Saltimbocca alla Romana* paired with regional Frascati Superiore DOCG wine.

### Day 4: The Appian Way & Countryside Excursion
- **Morning (09:00 – 13:00):** E-bike or private tour along the historic **Via Appia Antica (Appian Way)** and explore the ancient **Catacombs of San Callisto**.
- **Afternoon Excursion (13:30 – 18:00):** Take a scenic 30-minute private drive into the volcanic hill towns of **Castelli Romani** or visit the Renaissance fountains of **Villa d'Este in Tivoli**.
- **Farewell Dinner (20:00 – Late):** Conclude your Roman holiday with an unforgettable tasting menu in the historic center.

---

## Neighborhood Guide: Where to Stay & Explore in Rome

1. **Monti (Bohemian & Central):** Cobblestone streets, vintage boutiques, and indie wine bars just a 7-minute walk from the Colosseum.
2. **Trastevere (Culinary & Nightlife):** Vibrant, picturesque, filled with ivy-covered facades and Rome's most beloved traditional trattorias.
3. **Prati / Vatican (Quiet & Elegant):** Wide Art Nouveau avenues, high-end shopping on Via Cola di Rienzo, and 5-minute access to St. Peter's.
4. **Centro Storico (Navona / Pantheon):** The heart of Baroque Rome. Step out of your hotel directly onto historic piazzas and marble fountains.

---

## The 4 Roman Pastas: A Culinary Masterclass

No trip to Rome is complete without understanding the sacred quartet of Roman pasta:
1. **Cacio e Pepe:** Simple perfection combining aged Pecorino Romano and freshly cracked toasted black pepper with starchy pasta water.
2. **La Gricia:** The ancestral pasta featuring crispy cured pork jowl (*guanciale*) and rich Pecorino Romano.
3. **Carbonara:** Guanciale, fresh egg yolks, and Pecorino Romano whisked into a silky, luscious cream without any cream or butter.
4. **Amatriciana:** Crispy guanciale tossed with sweet San Marzano tomato sauce and a generous dusting of pecorino.

---

## Why Booking a Private Local Guide Elevates Your Roman Journey

Exploring Rome alongside a certified, passionate private local guide on **Example Travel** transforms your vacation:
- **100% Customized Itineraries:** Walk at your own pace with breaks tailored to your group.
- **Skip-the-Line Access:** Bypass 2-hour queues at the Colosseum and Vatican.
- **Insider Secrets:** Uncover hidden courtyards, subterranean Roman ruins, and secret rooftops inaccessible to large bus tours.

[Explore Verified Private Tours in Rome on Example Travel](https://example.com/Rome-Tours)

---

## Frequently Asked Questions (FAQ)

### Q1: Can I customize my Rome tour itinerary?
**A:** Yes! All Example Travel Rome itineraries are 100% customizable. You can request custom routes, dietary stops, and private transport directly with your guide.

### Q2: Is public transport easy to use in Rome?
**A:** Yes. Rome's Metro (Lines A and B) and city buses support contactless tap-and-go credit cards at all turnstiles. For historic center sights, walking is often the fastest and most scenic option.

### Q3: How far in advance should I book Colosseum and Vatican tickets?
**A:** Due to strict timed-entry capacities, booking tickets 3 to 4 weeks in advance (or booking a private tour with tickets included) is essential during the high season (March through October).

---

*Published by Example Travel Editorial Travel Team. Reviewed and updated for the 2026 travel season.*
`,
          wordCount: 2650,
          readingTimeMinutes: 13,
          keyImprovements: [
            'Delivered 2,650+ word comprehensive pillar travel guide with structured 4-day itinerary',
            'Enriched with 2026 updated skip-the-line reservation guidance and transit maps',
            'Included 4 distinct neighborhood profiles with vibe ratings and accommodation advice',
            'Added culinary masterclass covering the 4 Roman pastas and dining etiquette',
            'Embedded 3 authoritative FAQ schema items and high-converting private guide booking CTAs'
          ],
          tone: 'expert-guide',
          targetLength: 'comprehensive',
          generatedAt: new Date().toISOString()
        }
      },
      {
        id: 'default-2',
        url: 'https://example.com/Tokyo-Tours',
        targetKeyword: 'personalized private guide tokyo',
        currentTitle: 'Tokyo Tours | Explore Japan with Private Local Tour Guides',
        pageType: 'Category Page',
        status: 'Ready',
        pageContent: ''
      }
    ];
    setItems(defaultData);
  }, []);

  // Helper to extract clean destination name, title, and keyword from URL
  const extractSlugMetadata = (url: string) => {
    let cleanTitle = '';
    let cleanKeyword = '';
    try {
      const u = new URL(url.startsWith('http') ? url : `https://${url}`);
      const parts = u.pathname.split('/').filter(Boolean);
      const last = parts.pop() || u.hostname;
      const raw = decodeURIComponent(last)
        .replace(/[-_]+/g, ' ')
        .replace(/\.[a-z0-9]+$/i, '')
        .trim();
      if (raw.length > 1) {
        cleanTitle = raw.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        cleanKeyword = raw.toLowerCase();
      }
    } catch {
      // Fallback
    }
    return {
      title: cleanTitle || 'Travel Destination Guide',
      keyword: cleanKeyword || 'private local tour guide'
    };
  };

  // 1. Paste Input handler
  const handleAddUrls = (urls: string[], defaults: { targetKeyword: string; pageType: string }) => {
    const newItems: BlogItem[] = urls.map((rawUrl) => {
      let sanitizedUrl = rawUrl.trim().replace(/^["'<(\[]+|["'>)\]]+$/g, '');
      if (!/^https?:\/\//i.test(sanitizedUrl)) {
        sanitizedUrl = 'https://' + sanitizedUrl;
      }

      const slugMeta = extractSlugMetadata(sanitizedUrl);

      return {
        id: 'item-' + Math.random().toString(36).substr(2, 9),
        url: sanitizedUrl,
        targetKeyword: defaults.targetKeyword.trim() || slugMeta.keyword,
        currentTitle: slugMeta.title,
        pageType: defaults.pageType || 'Destination Guide',
        status: 'Ready',
        pageContent: ''
      };
    });

    if (newItems.length > 0) {
      setItems((prev) => [...prev, ...newItems]);
      setErrorMessage(`Added ${newItems.length} URL${newItems.length > 1 ? 's' : ''} to queue. Click "Analyze Pages" or use the row controls below.`);
    }
  };

  // Quick single URL adder directly from table
  const handleQuickAddUrl = (url: string) => {
    handleAddUrls([url], { targetKeyword: '', pageType: 'Destination Guide' });
  };

  // Add empty custom row
  const handleAddNewRow = () => {
    const newRow: BlogItem = {
      id: 'item-' + Math.random().toString(36).substr(2, 9),
      url: 'https://example.com/',
      targetKeyword: 'private local tour guide',
      currentTitle: 'Custom Destination Page',
      pageType: 'Destination Guide',
      status: 'Ready',
      pageContent: ''
    };
    setItems((prev) => [...prev, newRow]);
  };

  // 2. CSV Parser and Uploader
  const handleUploadCsv = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        if (!text) return;

        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length === 0) return;

        // Basic CSV splitting line by line respecting quoted commas safely
        const parsedRows: string[][] = lines.map(line => {
          const result: string[] = [];
          let current = '';
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result.map(el => el.replace(/^"|"$/g, '')); // Strip outer quotes
        });

        // Parse header indexes
        const headers = parsedRows[0].map(h => h.toLowerCase().trim());
        const urlIdx = headers.findIndex(h => h.includes('url'));
        const keywordIdx = headers.findIndex(h => h.includes('keyword'));
        const titleIdx = headers.findIndex(h => h.includes('title'));
        const typeIdx = headers.findIndex(h => h.includes('type') || h.includes('page'));

        const validIndex = urlIdx !== -1 ? urlIdx : 0; // Fallback to first column as URL if no headers matched

        const startLine = (urlIdx !== -1 || keywordIdx !== -1) ? 1 : 0; // Skip first row if it has recognizable header
        const itemsToInject: BlogItem[] = [];

        for (let i = startLine; i < parsedRows.length; i++) {
          const row = parsedRows[i];
          if (!row || row.length === 0 || !row[validIndex]) continue;

          let urlValue = row[validIndex].trim();
          if (!/^https?:\/\//i.test(urlValue)) {
            urlValue = 'https://' + urlValue;
          }

          const keywordValue = keywordIdx !== -1 && row[keywordIdx] ? row[keywordIdx].trim() : '';
          const titleValue = titleIdx !== -1 && row[titleIdx] ? row[titleIdx].trim() : '';
          const typeValue = typeIdx !== -1 && row[typeIdx] ? row[typeIdx].trim() : 'Blog Post';

          itemsToInject.push({
            id: 'csv-' + Math.random().toString(36).substr(2, 9),
            url: urlValue,
            targetKeyword: keywordValue,
            currentTitle: titleValue,
            pageType: typeValue,
            status: 'Ready',
            pageContent: ''
          });
        }

        if (itemsToInject.length > 0) {
          setItems(prev => [...prev, ...itemsToInject]);
          setErrorMessage(`Successfully loaded ${itemsToInject.length} records from CSV.`);
        } else {
          setErrorMessage("Failed to locate valid URLs in the uploaded CSV. Ensure you have a 'URL' header or column.");
        }
      } catch (err: any) {
        setErrorMessage("Error reading CSV file structure. Please ensure standard comma-separated format.");
        console.error(err);
      }
    };
    reader.readAsText(file);
    // Clear event target file
    event.target.value = '';
  };

  // 3. Queue item removal
  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 4. Reset entire queue
  const handleClearQueue = () => {
    setItems([]);
  };

  // 5. Update individual queue cell details manually
  const handleUpdateItem = (id: string, updatedFields: Partial<BlogItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  // 6. Update generated recommendation records directly (review details edit)
  const handleUpdateRecommendations = (id: string, updatedRecs: Partial<SEORecommendations>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.recommendations) {
          return {
            ...item,
            recommendations: {
              ...item.recommendations,
              ...updatedRecs
            }
          };
        }
        return item;
      })
    );
  };

  // 7. Individual preliminary scraper to let users preview webpage layout extraction
  const handlePreScrapeRow = async (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    handleUpdateItem(id, { status: 'Fetching', error: undefined });

    try {
      const crawlRes = await fetch(`${PROXY_BASE}/seo-fetch-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: item.url }),
      });
      const crawlData = await crawlRes.json();

      if (crawlData.success) {
        handleUpdateItem(id, {
          status: 'Fetched',
          currentTitle: item.currentTitle || crawlData.title || '',
          fetchedTitle: crawlData.title || '',
          fetchedDescription: crawlData.description || '',
          pageContent: crawlData.content || ''
        });
      } else {
        handleUpdateItem(id, {
          status: 'Fetch Failed',
          error: crawlData.error || 'Server-side scraper was blocked or timed out.'
        });
      }
    } catch (err: any) {
      handleUpdateItem(id, {
        status: 'Fetch Failed',
        error: err.message || 'Scrape connection failure.'
      });
    }
  };

  // 8. Core engine scheduler - ANALYZE PAGES trigger (the meat of the logic)
  const handleAnalyzePages = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    // Filter items that actually need analysis (status is not yet 'Analyzed')
    const pendingItems = items.filter(item => item.status !== 'Analyzed');
    if (pendingItems.length === 0) {
      setErrorMessage("All blogs in queue are already optimized! Click 'Clear Queue' or insert new destination links above.");
      setIsLoading(false);
      return;
    }

    // Process iteratively row by row
    for (let i = 0; i < pendingItems.length; i++) {
      const activeObj = pendingItems[i];
      
      // 8a. Step 1: Scrape Webpage if page content isn't loaded yet
      let currentContent = activeObj.pageContent;
      let currentMetaTitle = activeObj.currentTitle;
      let currentMetaDescription = activeObj.fetchedDescription || '';

      if (!currentContent.trim()) {
        setItems(prev => prev.map(obj => obj.id === activeObj.id ? { ...obj, status: 'Fetching' } : obj));
        try {
          const crawlRes = await fetch(`${PROXY_BASE}/seo-fetch-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: activeObj.url }),
          });
          const crawlData = await crawlRes.json();
          if (crawlData.success) {
            currentContent = crawlData.content || '';
            currentMetaTitle = activeObj.currentTitle || crawlData.title || '';
            currentMetaDescription = crawlData.description || '';
            
            // Apply scraped details
            setItems(prev => prev.map(obj => obj.id === activeObj.id ? { 
              ...obj, 
              pageContent: currentContent, 
              currentTitle: currentMetaTitle,
              fetchedTitle: crawlData.title || '',
              fetchedDescription: currentMetaDescription,
              error: undefined
            } : obj));
          } else {
            console.warn(`Scrape warning: ${crawlData.error}`);
            setItems(prev => prev.map(obj => obj.id === activeObj.id ? { 
              ...obj, 
              error: crawlData.error || 'Content fetch was blocked or restricted.'
            } : obj));
          }
        } catch (crawlErr: any) {
          console.error("Crawl error:", crawlErr);
          setItems(prev => prev.map(obj => obj.id === activeObj.id ? { 
            ...obj, 
            error: crawlErr.message || 'Scraper connection failure.'
          } : obj));
        }
      }

      // 8b. Step 2: Trigger AI Analysis Recommendation Generation
      setItems(prev => prev.map(obj => obj.id === activeObj.id ? { ...obj, status: 'Analyzing' } : obj));

      try {
        const analyzeRes = await fetch(`${PROXY_BASE}/seo-analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: activeObj.url,
            targetKeyword: activeObj.targetKeyword,
            currentTitle: currentMetaTitle,
            pageType: activeObj.pageType,
            pageContent: currentContent
          }),
        });

        const resData = await analyzeRes.json();

        if (resData.success && resData.recommendations) {
          // If the page description was empty, pre-populate if needed
          setItems(prev => prev.map(obj => obj.id === activeObj.id ? {
            ...obj,
            status: 'Analyzed',
            recommendations: resData.recommendations,
            // Clean title update fallback
            currentTitle: currentMetaTitle || resData.recommendations.improvedMetaTitle,
            error: undefined
          } : obj));
        } else {
          const failMsg = resData.error || 'Failed to generate recommendations from model.';
          setErrorMessage(`Analysis failed for "${activeObj.url}": ${failMsg}`);
          setItems(prev => prev.map(obj => obj.id === activeObj.id ? {
            ...obj,
            status: 'Failed',
            error: failMsg
          } : obj));
        }

      } catch (analError: any) {
        console.error("AI Analysis connection failed:", analError);
        const failMsg = analError.message || 'Connecting to Gemini AI server failed.';
        setErrorMessage(`Analysis connection failed for "${activeObj.url}": ${failMsg}`);
        setItems(prev => prev.map(obj => obj.id === activeObj.id ? {
          ...obj,
          status: 'Failed',
          error: failMsg
        } : obj));
      }
    }

    setIsLoading(false);
  };

  // 8c. Single-item analyzer / retry handler
  const handleAnalyzeSingleItem = async (id: string) => {
    const targetItem = items.find(item => item.id === id);
    if (!targetItem) return;

    setErrorMessage(null);
    let currentContent = targetItem.pageContent;
    let currentMetaTitle = targetItem.currentTitle;

    // Scrape if empty
    if (!currentContent.trim()) {
      setItems(prev => prev.map(obj => obj.id === id ? { ...obj, status: 'Fetching', error: undefined } : obj));
      try {
        const crawlRes = await fetch(`${PROXY_BASE}/seo-fetch-content`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: targetItem.url }),
        });
        const crawlData = await crawlRes.json();
        if (crawlData.success) {
          currentContent = crawlData.content || '';
          currentMetaTitle = targetItem.currentTitle || crawlData.title || '';
          setItems(prev => prev.map(obj => obj.id === id ? {
            ...obj,
            pageContent: currentContent,
            currentTitle: currentMetaTitle,
            fetchedTitle: crawlData.title || '',
            fetchedDescription: crawlData.description || '',
            error: undefined
          } : obj));
        }
      } catch (e) {
        console.warn("Single scrape error:", e);
      }
    }

    setItems(prev => prev.map(obj => obj.id === id ? { ...obj, status: 'Analyzing', error: undefined } : obj));

    try {
      const analyzeRes = await fetch(`${PROXY_BASE}/seo-analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetItem.url,
          targetKeyword: targetItem.targetKeyword,
          currentTitle: currentMetaTitle,
          pageType: targetItem.pageType,
          pageContent: currentContent
        }),
      });

      const resData = await analyzeRes.json();

      if (resData.success && resData.recommendations) {
        setItems(prev => prev.map(obj => obj.id === id ? {
          ...obj,
          status: 'Analyzed',
          recommendations: resData.recommendations,
          currentTitle: currentMetaTitle || resData.recommendations.improvedMetaTitle,
          error: undefined
        } : obj));
      } else {
        const failMsg = resData.error || 'Failed to generate recommendations.';
        setErrorMessage(`Analysis failed for "${targetItem.url}": ${failMsg}`);
        setItems(prev => prev.map(obj => obj.id === id ? { ...obj, status: 'Failed', error: failMsg } : obj));
      }
    } catch (err: any) {
      const failMsg = err.message || 'Connecting to Gemini AI server failed.';
      setErrorMessage(`Analysis failed for "${targetItem.url}": ${failMsg}`);
      setItems(prev => prev.map(obj => obj.id === id ? { ...obj, status: 'Failed', error: failMsg } : obj));
    }
  };

  // 9. Full Content Rewrite Generator
  const handleGenerateRewrite = async (itemId: string, tone?: string, targetLength?: string) => {
    const targetItem = items.find(i => i.id === itemId);
    if (!targetItem) return;

    setIsGeneratingRewrite(true);
    setErrorMessage(null);

    // Set item rewriting state
    setItems(prev => prev.map(obj => obj.id === itemId ? { ...obj, isRewriting: true } : obj));

    try {
      // If item has no page content scraped yet, fetch it first
      let content = targetItem.pageContent;
      if (!content || !content.trim()) {
        try {
          const crawlRes = await fetch(`${PROXY_BASE}/seo-fetch-content`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: targetItem.url }),
          });
          const crawlData = await crawlRes.json();
          if (crawlData.success && crawlData.content) {
            content = crawlData.content;
          }
        } catch (e) {
          console.warn("Pre-rewrite scrape error:", e);
        }
      }

      const res = await fetch(`${PROXY_BASE}/seo-rewrite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: targetItem.url,
          targetKeyword: targetItem.targetKeyword,
          currentTitle: targetItem.currentTitle,
          pageType: targetItem.pageType,
          pageContent: content,
          recommendations: targetItem.recommendations,
          tone: tone || 'expert-guide',
          targetLength: targetLength || 'comprehensive'
        })
      });

      const data = await res.json();

      if (data.success && data.rewrite) {
        setItems(prev => prev.map(obj => {
          if (obj.id === itemId) {
            const updated = {
              ...obj,
              fullRewrite: data.rewrite,
              isRewriting: false
            };
            if (selectedRewriteItem && selectedRewriteItem.id === itemId) {
              setSelectedRewriteItem(updated);
            }
            return updated;
          }
          return obj;
        }));

        if (selectedRewriteItem && selectedRewriteItem.id === itemId) {
          setSelectedRewriteItem(prev => prev ? { ...prev, fullRewrite: data.rewrite, isRewriting: false } : null);
        }
      } else {
        const err = data.error || "Failed to generate full article rewrite.";
        setErrorMessage(`Rewrite generation error for ${targetItem.url}: ${err}`);
        setItems(prev => prev.map(obj => obj.id === itemId ? { ...obj, isRewriting: false } : obj));
      }
    } catch (err: any) {
      console.error("Rewrite request failure:", err);
      const errTxt = err.message || "Failed connecting to rewrite API.";
      setErrorMessage(errTxt);
      setItems(prev => prev.map(obj => obj.id === itemId ? { ...obj, isRewriting: false } : obj));
    } finally {
      setIsGeneratingRewrite(false);
    }
  };

  // Render variables
  const analyzedCount = items.filter(item => item.status === 'Analyzed').length;
  const readyToAnalyzeCount = items.filter(item => item.status !== 'Analyzed').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Header bar and indicators */}
      <Header 
        totalItems={items.length} 
        analyzedCount={analyzedCount} 
        readyToAnalyzeCount={readyToAnalyzeCount}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Alerts / Error feedback box if present */}
        {errorMessage && (
          <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-start gap-3 text-indigo-850 animate-fade-in shadow-xs">
            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold">{errorMessage}</p>
            </div>
            <button 
              onClick={() => setErrorMessage(null)} 
              className="text-indigo-400 hover:text-indigo-600 font-bold ml-auto text-xs cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
          
          {/* Step-by-Step Workflow Visualizer */}
          <WorkflowStepsGuide
            items={items}
            analyzedCount={analyzedCount}
            readyToAnalyzeCount={readyToAnalyzeCount}
            isLoading={isLoading}
            onTriggerAnalyze={handleAnalyzePages}
            onOpenFirstRewrite={() => {
              const firstAnalyzed = items.find(i => i.status === 'Analyzed');
              if (firstAnalyzed) setSelectedRewriteItem(firstAnalyzed);
            }}
            onOpenFullGuide={() => setIsHowItWorksOpen(true)}
          />

          {/* Action Row 1: URL input + CSV Upload instructions */}
          <UrlInputPanel 
            onAddUrls={handleAddUrls} 
            onUploadCsv={handleUploadCsv} 
            isLoading={isLoading} 
          />

          {/* Action Row 2: Queue Table representing blogs to refresh */}
          <EditableTable
            items={items}
            onUpdateItem={handleUpdateItem}
            onRemoveItem={handleRemoveItem}
            onClearQueue={handleClearQueue}
            onPreScrapeRow={handlePreScrapeRow}
            onAnalyzeSingleItem={handleAnalyzeSingleItem}
            isLoading={isLoading}
            onOpenRewriteModal={(item) => setSelectedRewriteItem(item)}
            onAddNewRow={handleAddNewRow}
            onQuickAddUrl={handleQuickAddUrl}
          />

          {/* Trigger Analysis Action Banner */}
          {items.length > 0 && (
            <div id="trigger-action-block" className="bg-gradient-to-r from-indigo-900 to-indigo-820 rounded-2xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md mb-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <CloudLightning className="w-5 h-5 text-indigo-300 animate-bounce" />
                  Ready to audit travel blogs with Gemini AI ?
                </h3>
                <p className="text-xs text-indigo-200">
                  Click 'Analyze Pages' below. We'll scrape each URL's contents securely, query Gemini for traveler search intents, missing locations, regional entities, and output structured E-E-A-T reports.
                </p>
              </div>

              <button
                onClick={handleAnalyzePages}
                disabled={isLoading || readyToAnalyzeCount === 0}
                className="bg-white hover:bg-slate-100 text-indigo-900 px-6 py-3 rounded-xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                    Auditing Queue Line...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-indigo-900 stroke-none" />
                    Analyze Pages ({readyToAnalyzeCount} pending)
                  </>
                )}
              </button>
            </div>
          )}

          {/* Action Row 3: Comprehensive results presentation & filter grid */}
          <ResultsTable
            items={items}
            onUpdateRecommendations={handleUpdateRecommendations}
            onOpenRewriteModal={(item) => setSelectedRewriteItem(item)}
          />

        </div>
      </main>

      {/* Full Content Rewrite Modal */}
      {selectedRewriteItem && (
        <FullRewriteModal
          item={selectedRewriteItem}
          isOpen={!!selectedRewriteItem}
          onClose={() => setSelectedRewriteItem(null)}
          onGenerateRewrite={handleGenerateRewrite}
          isGenerating={isGeneratingRewrite}
        />
      )}

      {/* Comprehensive How It Works Guide Modal */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
        onQuickStart={() => {
          if (items.length === 0) {
            handleQuickAddUrl('https://example.com/Rome-Tours');
          }
        }}
      />

      {/* Footer credits bar */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-normal text-slate-600">
            © 2026 TravelSEO Refresher. Developed by <strong>SEO Girl - Ami</strong>. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline cursor-pointer"
            >
              How It Works
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-slate-400">Powered by Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
