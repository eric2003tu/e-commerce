// ProductSkeleton.tsx
import React from 'react';

const ProductSkeleton: React.FC<{ count: number }> = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse p-4 border-b">
          <div className="flex space-x-4">
            <div className="rounded bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
            <div className="flex space-x-2">
              <div className="h-5 bg-gray-200 rounded w-5"></div>
              <div className="h-5 bg-gray-200 rounded w-5"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductSkeleton;