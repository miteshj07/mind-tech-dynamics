
import React from 'react';

interface EmptySearchResultProps {
  resetSearch: () => void;
}

const EmptySearchResult = ({ resetSearch }: EmptySearchResultProps) => {
  return (
    <div className="text-center py-12">
      <p className="text-xl text-gray-500">No articles matching your search.</p>
      <button
        className="mt-4 text-brand font-medium"
        onClick={resetSearch}
      >
        View All Articles
      </button>
    </div>
  );
};

export default EmptySearchResult;
