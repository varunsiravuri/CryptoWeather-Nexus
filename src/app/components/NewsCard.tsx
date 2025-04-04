import { useState } from 'react';
import moment from 'moment';
import { NewsArticle } from '@/redux/newsSlice';

export default function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const source = new URL(article.link).hostname.replace('www.', '');

  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-[#111827] hover:shadow-lg text-black dark:text-white p-4 rounded-xl shadow transition-all duration-300 flex flex-col justify-between"
    >
      {/* 🖼 Image with fade + spinner */}
      <div className="mb-4 relative overflow-hidden rounded-md">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md z-10">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          src={`https://source.unsplash.com/featured/400x200/?crypto,news,${index}`}
          alt={article.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-48 object-cover rounded-md transition-opacity duration-500 ease-in ${imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpg';
          }}
        />
      </div>

      {/* 🏷️ Source + Title + Date */}
      <div className="flex-1">
        <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs px-3 py-1 rounded-full font-semibold mb-2">
          {source}
        </span>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {moment(article.pubDate).fromNow()}
        </p>
      </div>
    </a>
  );
};
