import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Code, 
  Eye, 
  RefreshCw, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  Sliders
} from 'lucide-react';
import { BlogItem, FullRewriteData } from '../types';

interface FullRewriteModalProps {
  item: BlogItem;
  isOpen: boolean;
  onClose: () => void;
  onGenerateRewrite: (id: string, tone?: string, targetLength?: string) => Promise<void>;
  isGenerating: boolean;
}

export default function FullRewriteModal({
  item,
  isOpen,
  onClose,
  onGenerateRewrite,
  isGenerating
}: FullRewriteModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'markdown' | 'improvements'>('preview');
  const [selectedTone, setSelectedTone] = useState(item.fullRewrite?.tone || 'expert-guide');
  const [selectedLength, setSelectedLength] = useState(item.fullRewrite?.targetLength || 'comprehensive');
  const [copiedText, setCopiedText] = useState<'md' | 'html' | null>(null);

  if (!isOpen) return null;

  const rewrite = item.fullRewrite;

  const handleCopyMarkdown = () => {
    if (!rewrite?.rewrittenMarkdown) return;
    navigator.clipboard.writeText(rewrite.rewrittenMarkdown).then(() => {
      setCopiedText('md');
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const handleCopyHtml = () => {
    if (!rewrite?.rewrittenMarkdown) return;
    // Simple basic conversion or raw markdown copying
    navigator.clipboard.writeText(rewrite.rewrittenMarkdown).then(() => {
      setCopiedText('html');
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const handleDownloadFile = (ext: 'md' | 'html') => {
    if (!rewrite?.rewrittenMarkdown) return;
    const safeTitle = (item.recommendations?.improvedMetaTitle || item.currentTitle || 'article_rewrite')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .slice(0, 40);

    const content = ext === 'md' 
      ? rewrite.rewrittenMarkdown 
      : `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${item.recommendations?.improvedMetaTitle || item.currentTitle}</title>
  <meta name="description" content="${item.recommendations?.improvedMetaDescription || ''}">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
    h1 { font-size: 2.2rem; color: #0f172a; margin-bottom: 0.5rem; }
    h2 { font-size: 1.5rem; color: #1e293b; margin-top: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.3rem; }
    h3 { font-size: 1.2rem; color: #334155; margin-top: 1.5rem; }
    blockquote { border-left: 4px solid #6366f1; margin: 1.5rem 0; padding: 0.5rem 1rem; background: #f8fafc; color: #475569; }
    ul, ol { padding-left: 1.5rem; }
    li { margin-bottom: 0.4rem; }
    code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
  </style>
</head>
<body>
  ${rewrite.rewrittenMarkdown.replace(/\n/g, '<br/>')}
</body>
</html>`;

    const blob = new Blob([content], { type: ext === 'md' ? 'text/markdown' : 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeTitle}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRegenerate = () => {
    onGenerateRewrite(item.id, selectedTone, selectedLength);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        id="full-content-rewrite-modal"
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  Full Article Content Rewrite
                </h3>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 tracking-wide">
                  Gemini AI Powered
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-lg mt-0.5">
                {item.url}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Subheader */}
        <div className="px-6 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {/* Tone Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Tone:</span>
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="expert-guide">Local Expert & Guide (E-E-A-T)</option>
                <option value="storyteller">Engaging Storyteller</option>
                <option value="conversion">High-Converting Commercial</option>
                <option value="concise">Concise Mobile Digest</option>
              </select>
            </div>

            {/* Length Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">Depth / Length:</span>
              <select
                value={selectedLength}
                onChange={(e) => setSelectedLength(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="comprehensive">Comprehensive Pillar Guide (2,600+ words)</option>
                <option value="standard">Standard In-Depth (2,000 words)</option>
                <option value="concise">Concise Mobile Digest (1,200 words)</option>
              </select>
            </div>

            <button
              onClick={handleRegenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg border border-indigo-200 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? 'Generating Rewrite...' : rewrite ? 'Regenerate Rewrite' : 'Generate Full Rewrite'}
            </button>
          </div>

          {/* Metrics summary */}
          {rewrite && (
            <div className="flex items-center gap-4 text-slate-600">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-semibold text-slate-800">{rewrite.wordCount.toLocaleString()}</span> words
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span className="font-semibold text-slate-800">~{rewrite.readingTimeMinutes} min</span> read
              </div>
            </div>
          )}
        </div>

        {/* View Tabs & Export Toolbar */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Rendered Article
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'markdown'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              Raw Markdown
            </button>
            <button
              onClick={() => setActiveTab('improvements')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'improvements'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              SEO Upgrades List ({rewrite?.keyImprovements?.length || 0})
            </button>
          </div>

          {/* Quick Actions */}
          {rewrite && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-2xs"
              >
                {copiedText === 'md' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText === 'md' ? 'Copied MD' : 'Copy MD'}
              </button>
              <button
                onClick={() => handleDownloadFile('md')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors shadow-2xs"
                title="Download .md file"
              >
                <Download className="w-3.5 h-3.5" />
                .MD
              </button>
              <button
                onClick={() => handleDownloadFile('html')}
                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100 transition-colors shadow-2xs"
                title="Download .html file"
              >
                <Download className="w-3.5 h-3.5" />
                .HTML
              </button>
            </div>
          )}
        </div>

        {/* Content Body Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-white min-h-[400px]">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                <Sparkles className="w-6 h-6 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">Crafting Full Content Rewrite with Gemini AI...</h4>
                <p className="text-xs text-slate-500 max-w-md">
                  Integrating search intent, missing entities, updated travel pricing, local authority tips, and interactive FAQ schema.
                </p>
              </div>
            </div>
          ) : !rewrite ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-md">
                <h4 className="text-base font-bold text-slate-900">No Full Rewrite Generated Yet</h4>
                <p className="text-xs text-slate-500">
                  Click the button below to generate a comprehensive, publication-ready article rewrite packed with high E-E-A-T authority.
                </p>
              </div>
              <button
                onClick={handleRegenerate}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Full Content Rewrite
              </button>
            </div>
          ) : (
            <>
              {activeTab === 'preview' && (
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-2xl prose-h1:text-slate-900 prose-h2:text-xl prose-h2:text-slate-800 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2 prose-h3:text-lg prose-h3:text-slate-700 prose-p:text-slate-700 prose-p:leading-relaxed prose-li:text-slate-700 prose-blockquote:border-l-4 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-slate-700">
                  <Markdown>{rewrite.rewrittenMarkdown}</Markdown>
                </div>
              )}

              {activeTab === 'markdown' && (
                <div className="relative">
                  <textarea
                    readOnly
                    value={rewrite.rewrittenMarkdown}
                    className="w-full h-[500px] font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none select-all"
                  />
                </div>
              )}

              {activeTab === 'improvements' && (
                <div className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <h4 className="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Key SEO & Content Upgrades Applied
                    </h4>
                    <p className="text-xs text-emerald-700 mb-4">
                      Gemini AI enriched this article based on the audited traveler search intent, entity gaps, and local expertise recommendations:
                    </p>
                    <ul className="space-y-2.5">
                      {rewrite.keyImprovements?.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-lg border border-emerald-100 shadow-2xs">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed font-medium">{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommendations Cross-Reference */}
                  {item.recommendations && (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                      <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Integrated SEO Recommendations Checklist
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">Target Keyword Covered:</span>
                          <span className="text-indigo-600 font-medium bg-indigo-50 px-2 py-0.5 rounded">
                            {item.targetKeyword || 'General destination terms'}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">E-E-A-T Entities Added:</span>
                          <span className="text-slate-600">
                            {(item.recommendations.missingEntities || []).slice(0, 4).join(', ') || 'Local landmarks & spots'}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">Freshness Updates:</span>
                          <span className="text-slate-600">
                            {item.recommendations.freshnessIssues || 'Current seasonal rates and rules'}
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-slate-200">
                          <span className="font-semibold text-slate-700 block mb-1">FAQs Included:</span>
                          <span className="text-slate-600">
                            {item.recommendations.faqIdeas?.length || 0} authoritative travel Q&As embedded
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div>
            {rewrite && (
              <span>Generated on {new Date(rewrite.generatedAt).toLocaleDateString()} with Gemini 3.6 Flash</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
