export interface FAQIdea {
  question: string;
  answer: string;
}

export interface SEORecommendations {
  searchIntent: string;
  missingTopics: string[];
  missingEntities: string[];
  faqIdeas: FAQIdea[];
  internalLinks: string[];
  freshnessIssues: string;
  improvedMetaTitle: string;
  improvedMetaDescription: string;
  priorityScore: number; // 1-10
  recommendedAction: string;
}

export interface FullRewriteData {
  rewrittenMarkdown: string;
  wordCount: number;
  readingTimeMinutes: number;
  tone: string;
  targetLength: string;
  generatedAt: string;
  keyImprovements: string[];
}

export interface BlogItem {
  id: string;
  url: string;
  targetKeyword: string;
  currentTitle: string;
  pageType: string; // e.g., "Blog Post", "Destination Guide", "Landing Page", "Other"
  status: 'Ready' | 'Fetching' | 'Fetched' | 'Fetch Failed' | 'Analyzing' | 'Analyzed' | 'Failed';
  pageContent: string;
  error?: string;
  recommendations?: SEORecommendations;
  fetchedTitle?: string;
  fetchedDescription?: string;
  fullRewrite?: FullRewriteData;
  isRewriting?: boolean;
}

