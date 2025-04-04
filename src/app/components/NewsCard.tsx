import { useState } from 'react';
import moment from 'moment';
import { NewsArticle } from '@/redux/newsSlice';

export default function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const source = new URL(article.link).hostname.replace('www.', '');

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-[#111827] hover:shadow-lg text-black dark:text-white p-4 rounded-xl shadow transition-all duration-300 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
    >
      {/* 🏷️ Source + Title + Date */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {moment(article.pubDate).fromNow()}
        </p>
      </div>
    </a>
  );
};
