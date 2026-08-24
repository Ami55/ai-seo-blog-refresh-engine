import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Sparkles, 
  Search, 
  Compass, 
  FileText, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  BookOpen, 
  Globe, 
  Lightbulb, 
  ShieldCheck,
  Download
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickStart?: () => void;
}

export default function HowItWorksModal({ isOpen, onClose, onQuickStart }: HowItWorksModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'audit-metrics' | 'rewrites' | 'pro-tips'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/70 via-white to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                How It Works: TravelSEO Refresher
              </h2>
              <p className="text-xs text-slate-500">
                Master the 4-step workflow to audit travel content, identify semantic gaps, and generate pillar rewrites.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/60 gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            1. 4-Step Workflow
          </button>
          <button
            onClick={() => setActiveTab('audit-metrics')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'audit-metrics'
                ? 'border-indigo-600 text-indigo-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            2. Semantic SEO Metrics
          </button>
          <button
            onClick={() => setActiveTab('rewrites')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'rewrites'
                ? 'border-indigo-600 text-indigo-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            3. Pillar Content Rewrites
          </button>
          <button
            onClick={() => setActiveTab('pro-tips')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'pro-tips'
                ? 'border-indigo-600 text-indigo-600 bg-white shadow-2xs rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            4. Ami's SEO Girl Tips
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-sm flex-1">
          
          {/* TAB 1: OVERVIEW & 4-STEP WORKFLOW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl p-4 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold text-indigo-900">Automate Travel Content Audits in Minutes</p>
                  <p className="text-indigo-700 leading-relaxed">
                    Designed specifically for travel marketplace destination guides, local tour landing pages, and travel editorial blogs. It extracts existing page text, queries Gemini AI with specialized travel SEO heuristics, and formulates prioritized refresh plans.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Step 1 Box */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 hover:border-indigo-200 transition-colors space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
                    Input Travel URLs or CSV
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">Add Your URLs to Queue</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Paste one or more travel URLs into the bulk box, upload a CSV spreadsheet with custom keywords, or click <strong>"Load Sample Travel Data"</strong> to test instantly.
                  </p>
                </div>

                {/* Step 2 Box */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 hover:border-indigo-200 transition-colors space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
                    Set Primary Keywords & Page Types
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">Refine Target Keywords</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    In the Queue Table, review or edit target search queries (e.g. <em>"private local tour guide rome"</em>) and categorize the page type (Destination Guide, City Tour, Food Experience).
                  </p>
                </div>

                {/* Step 3 Box */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 hover:border-indigo-200 transition-colors space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
                    One-Click AI Semantic Audit
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">Run Deep Travel Audits</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Click <strong>"Analyze Pages"</strong>. The backend scrapes the live webpage content and applies Gemini AI to diagnose intent gaps, missing landmarks, FAQ needs, and E-E-A-T signals.
                  </p>
                </div>

                {/* Step 4 Box */}
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/40 hover:border-indigo-200 transition-colors space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
                    <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
                    Export CSV or Generate Full Rewrite
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">Actionable Deliverables</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Export structured SEO audit spreadsheets for your content team, copy high-ranking FAQ schema, or click <strong>"Full Rewrite"</strong> to generate a 2,500+ word publication-ready master guide.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: SEMANTIC SEO METRICS */}
          {activeTab === 'audit-metrics' && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs text-slate-600">
                Every page audit calculates 8 critical semantic dimensions required to rank in modern AI Overview search engines:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-1">
                    <Search className="w-4 h-4 text-indigo-600" />
                    Search Intent Match
                  </div>
                  <p className="text-xs text-slate-600">
                    Pinpoints whether users want booking actions, itinerary blueprints, price comparisons, or practical transit advice.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    Missing Geographic & Travel Entities
                  </div>
                  <p className="text-xs text-slate-600">
                    Identifies crucial landmarks, neighborhoods, transport hubs, and culinary specialties that search engines expect.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-1">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                    Targeted Traveler FAQ Opportunities
                  </div>
                  <p className="text-xs text-slate-600">
                    Generates high-CTR question & answer pairs ready for Google FAQ Rich Snippets and conversational AI citations.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-1">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Internal Linking & Topic Clusters
                  </div>
                  <p className="text-xs text-slate-600">
                    Recommends cross-links to sibling destination categories, certified guide profiles, and parent regional guides.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-rose-600" />
                    Freshness & Outdated Fact Auditing
                  </div>
                  <p className="text-xs text-slate-600">
                    Detects obsolete booking windows, outdated ticketing policies, and expired seasonal guidance.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    Priority Score & E-E-A-T Action Item
                  </div>
                  <p className="text-xs text-slate-600">
                    Assigns a 1–10 urgency score and a clear, high-impact directive for content editors to execute first.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FULL PILLAR REWRITES */}
          {activeTab === 'rewrites' && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  Pillar Content Generation Engine
                </div>
                <h4 className="text-base font-bold text-white">From Audit Report to Publication-Ready Guide</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The Full Rewrite tool crafts an authoritative 2,000 to 3,500 word master article structured according to modern search quality guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-indigo-600 block">📊 Comparison Tables</span>
                  <p className="text-xs text-slate-600">Generates Quick Trip Planners with budgets, seasons, transit modes, and advance booking rules.</p>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-indigo-600 block">🗺️ Multi-Day Itineraries</span>
                  <p className="text-xs text-slate-600">Detailed morning-to-night pacing with neighborhood recommendations and dining tips.</p>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-indigo-600 block">💾 One-Click Export</span>
                  <p className="text-xs text-slate-600">Copy formatted Markdown directly or download a clean <code>.md</code> file for your CMS.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AMI'S SEO GIRL PRO TIPS */}
          {activeTab === 'pro-tips' && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 bg-gradient-to-r from-pink-50 via-rose-50 to-indigo-50 border border-pink-200 rounded-xl flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  ✨
                </div>
                <div className="text-xs space-y-1">
                  <h4 className="font-bold text-pink-950">Ami - SEO Girl's Playbook for 2026 Travel Rankings</h4>
                  <p className="text-pink-900 leading-relaxed">
                    "Search engines now reward deep first-hand experience and concrete entity density over generic keyword stuffing. Use these quick tips when refreshing your pages!"
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Prioritize 8+ Score Audits:</strong> Filter the results table by "Priority 8+" to fix high-urgency pages that have major freshness or entity gaps first.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Inject FAQ Schema:</strong> Copy the suggested FAQ pairs directly into your page's JSON-LD schema or accordion component to win rich search snippets.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Strengthen E-E-A-T Badges:</strong> When optimizing destination guides, include verified guide credentials, local licenses, and author bios.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Export Audit CSV for Stakeholders:</strong> Share the downloaded CSV with freelance writers and editors to guide their content refreshes.
                  </div>
                </li>
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            SemanticMapper Suite &bull; AI SEO Blog Refresh Engine
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            {onQuickStart && (
              <button
                onClick={() => {
                  onClose();
                  onQuickStart();
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                Load Sample & Try It
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
