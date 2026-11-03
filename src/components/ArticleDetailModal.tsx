'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { ArticleItem } from '../types';

interface ArticleDetailModalProps {
  article: ArticleItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  isOpen,
  onClose
}) => {
  const [copiedDoi, setCopiedDoi] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!isOpen || !article) return null;

  const handleCopyDoi = () => {
    navigator.clipboard.writeText(`https://doi.org/${article.doi}`);
    setCopiedDoi(true);
    setTimeout(() => setCopiedDoi(false), 2500);
  };

  const citationText = `${article.authors.join(', ')} (${article.publicationDate.split(' ')[2] || '2025'}). ${article.title}. ${article.journalName}, ${article.volume}, https://doi.org/${article.doi}`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(citationText);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleDownload = () => {
    setIsDownloaded(true);
    alert(`Mengunduh naskah lengkap PDF: "${article.title}" dari repositori OJS Licyum...`);
    setTimeout(() => setIsDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-200">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Open Access Article • OJS Repositori Licyum</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Metadata banner */}
          <div className="border-b border-slate-200 pb-4">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-slate-500">
              <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                {article.journalName}
              </span>
              <span>•</span>
              <span className="font-medium text-slate-700">{article.volume}</span>
              <span>•</span>
              <span>{article.publicationDate}</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
              {article.title}
            </h3>

            {/* Authors */}
            <div className="mt-3">
              <div className="text-sm font-bold text-slate-800">
                {article.authors.join(', ')}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {article.affiliation}
              </p>
            </div>

            {/* DOI & Sitasi */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-slate-700">
                <span>https://doi.org/{article.doi}</span>
                <button
                  onClick={handleCopyDoi}
                  className="ml-1 text-slate-500 hover:text-emerald-700"
                  title="Salin DOI"
                >
                  {copiedDoi ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <span className="text-xs font-semibold text-slate-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {article.citations} Sitasi Terdata
              </span>
            </div>
          </div>

          {/* Abstract */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Abstrak / Abstract (Bahasa Indonesia & English):
            </h4>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p>{article.abstract}</p>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Kata Kunci (Keywords):
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {article.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs bg-emerald-50 text-emerald-900 px-3 py-1 rounded-lg border border-emerald-200 font-medium"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Sitasi Format Box */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-800">
                Cara Mensitasi Naskah Ini (APA 7th):
              </span>
              <button
                onClick={handleCopyCitation}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                {copiedCitation ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Disalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Sitasi</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-xs font-mono text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
              {citationText}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Lisensi: Creative Commons Attribution 4.0 International (CC BY 4.0)
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-4 bg-white hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleDownload}
              className="py-2.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloaded ? 'Mulai Mengunduh...' : 'Unduh Full-Text PDF (Gratis)'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
