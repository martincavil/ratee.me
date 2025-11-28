"use client";

interface NpsButtonsProps {
  value: number | null;
  onChange: (value: number) => void;
}

export function NpsButtons({ value, onChange }: NpsButtonsProps) {
  const getButtonColor = (score: number) => {
    if (score <= 3) {
      return "bg-red-500 text-white hover:bg-red-600";
    } else if (score <= 6) {
      return "bg-orange-500 text-white hover:bg-orange-600";
    } else if (score <= 8) {
      return "bg-emerald-400 text-white hover:bg-emerald-500";
    } else {
      return "bg-emerald-600 text-white hover:bg-emerald-700";
    }
  };

  const getButtonInactiveColor = (score: number) => {
    if (score <= 3) {
      return "bg-red-100 text-red-700 hover:bg-red-200";
    } else if (score <= 6) {
      return "bg-orange-100 text-orange-700 hover:bg-orange-200";
    } else if (score <= 8) {
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
    } else {
      return "bg-emerald-200 text-emerald-800 hover:bg-emerald-300";
    }
  };

  return (
    <div>
      <div className="grid grid-cols-6 sm:grid-cols-11 gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={`
              relative w-full aspect-square rounded-lg font-sora font-bold text-lg
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
              ${
                value === score
                  ? `${getButtonColor(
                      score
                    )} scale-110 shadow-lg ring-2 ring-emerald-500`
                  : getButtonInactiveColor(score)
              }
            `}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>0 = Pas du tout satisfait</span>
        <span>10 = C'était parfait !</span>
      </div>
    </div>
  );
}
