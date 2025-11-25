"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number | null;
  onChange: (value: number) => void;
  label: string;
  description?: string;
  error?: string;
}

export function StarRating({
  value,
  onChange,
  label,
  description,
  error,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const getStarColor = (star: number) => {
    const activeValue = hoverValue !== null ? hoverValue : value;

    if (!activeValue || star > activeValue) {
      return "text-gray-300";
    }

    // Gradient de couleurs selon la note
    if (activeValue === 1) return "text-red-500";
    if (activeValue === 2) return "text-orange-500";
    if (activeValue === 3) return "text-yellow-500";
    if (activeValue === 4) return "text-green-500";
    if (activeValue === 5) return "text-emerald-600";

    return "text-gray-300";
  };

  const getRatingLabel = (rating: number) => {
    const labels = {
      1: "⭐",
      2: "⭐⭐",
      3: "⭐⭐⭐",
      4: "⭐⭐⭐⭐",
      5: "⭐⭐⭐⭐⭐",
    };
    return labels[rating as keyof typeof labels] || "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-base! font-semibold text-content-primary font-inter">
            {label}
          </h3>
          {description && (
            <p className="text-sm! text-content-tertiary font-inter mt-0.5">
              {description}
            </p>
          )}
        </div>

        {/* Rating value badge */}
        {value !== null && (
          <div className="ml-4 flex-shrink-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm! font-semibold bg-emerald-light text-emerald-dark border border-emerald">
              {getRatingLabel(value)} {value}/5
            </span>
          </div>
        )}
      </div>

      {/* Stars */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            className={`transition-all duration-200 hover:scale-125 cursor-pointer ${getStarColor(
              star
            )}`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>

      {error && <p className="text-sm! text-error font-inter mt-1">{error}</p>}
    </div>
  );
}
