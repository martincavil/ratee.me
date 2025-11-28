"use client";

import { useState } from "react";

interface StarRatingProps {
  value: number | null;
  onChange: (value: number) => void;
  label: string;
  sublabel?: string;
  error?: string;
}

export function StarRating({
  value,
  onChange,
  label,
  sublabel,
  error,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleClick = (star: number) => {
    // Toggle: if clicking same star again, deselect
    if (value === star) {
      onChange(0);
    } else {
      onChange(star);
    }
  };

  const getStarColor = (star: number) => {
    const activeValue = hoverValue !== null ? hoverValue : value;

    if (!activeValue || star > activeValue) {
      return "text-gray-300";
    }

    // Dégradé du rouge au vert selon la note
    if (activeValue === 1) return "text-red-500";
    if (activeValue === 2) return "text-orange-500";
    if (activeValue === 3) return "text-yellow-400";
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
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-base font-semibold text-gray-900 font-sora">
        {label}
      </label>

      {/* Sub-label */}
      {sublabel && (
        <p className="text-sm text-gray-500 font-inter -mt-1">{sublabel}</p>
      )}

      {/* Stars */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHoverValue(star)}
            onMouseLeave={() => setHoverValue(null)}
            className="transition-all duration-150 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded"
            aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
          >
            <span
              className={`text-xl sm:text-2xl transition-all ${getStarColor(
                star
              )}`}
            >
              ★
            </span>
          </button>
        ))}
      </div>

      {/* Rating display */}
      {value && value > 0 && (
        <p className="text-sm text-emerald-600 font-medium font-inter">
          {getRatingLabel(value)} {value}/5
        </p>
      )}

      {error && <p className="text-sm text-red-600 font-inter">{error}</p>}
    </div>
  );
}
