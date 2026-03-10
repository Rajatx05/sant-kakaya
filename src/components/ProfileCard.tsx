import { Button } from './ui/button';
import { LucideIcon, Lock, Eye, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

interface InfoLine {
  icon: LucideIcon;
  text: string;
  iconColor: string;
  onClick?: () => void;
  isClickable?: boolean;
}

interface ProfileCardProps {
  image: string;
  name: string;
  age: number;
  metadata: string;
  infoLines: InfoLine[];
  buttonText: string;
  buttonIcon: LucideIcon;
  buttonGradient: string;
  onImageClick: () => void;
  onNameClick: () => void;
  onButtonClick: () => void;
  isPremium?: boolean;
  compatibility?: number; // e.g. 88 for 88%
  onViewProfile?: () => void; // "View Profile" button on top-right
}

export function ProfileCardHorizontalDesktop({
  image,
  name,
  age,
  metadata,
  infoLines,
  buttonText,
  buttonIcon: ButtonIcon,
  buttonGradient,
  onImageClick,
  onNameClick,
  onButtonClick,
  isPremium = true,
  compatibility,
  onViewProfile,
}: ProfileCardProps) {
  return (
    <div className="hidden md:flex flex-row h-[220px]">
      {/* Profile Image - Left Side */}
      <div
        className="relative w-[38%] flex-shrink-0 cursor-pointer overflow-hidden rounded-l-lg bg-gray-100"
        onClick={onImageClick}
      >
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${!isPremium ? 'blur-md' : ''}`}
          style={{ objectPosition: 'center' }}
        />
        {/* Lock overlay for free users */}
        {!isPremium && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white/80" />
          </div>
        )}
      </div>

      {/* Profile Info - Right Side */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar: Name + right-side badge + view profile */}
        <div className="flex items-start justify-between px-5 pt-4 gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className="text-xl text-gray-800 mb-0.5 cursor-pointer hover:text-rose-600 transition-colors line-clamp-1"
              onClick={onNameClick}
            >
              {name}, {age}
            </h3>
            <p className={`text-xs text-gray-500 mb-2 ${!isPremium ? 'blur-sm' : ''}`}>
              {metadata}
            </p>
          </div>

          {/* Right-side controls */}
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            {/* Compatibility badge */}
            {compatibility !== undefined && (
              isPremium ? (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {compatibility}% Match
                </Badge>
              ) : (
                <Badge className="bg-gray-100 text-gray-500 border border-gray-200 text-xs px-2 py-0.5 whitespace-nowrap">
                  <Lock className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )
            )}

            {/* View Profile button */}
            {onViewProfile && (
              <button
                onClick={onViewProfile}
                className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                View Profile
              </button>
            )}
          </div>
        </div>

        {/* Info lines */}
        <div className="px-5 flex-1 space-y-1.5">
          {infoLines.map((line, index) => {
            const Icon = line.icon;
            return (
              <div key={index} className={`flex items-center gap-2 text-gray-600 text-sm ${!isPremium ? 'blur-sm' : ''}`}>
                <Icon className={`w-4 h-4 ${line.iconColor} flex-shrink-0`} />
                <span
                  className={`truncate ${line.isClickable ? 'cursor-pointer hover:text-rose-600 transition-colors' : ''}`}
                  onClick={line.onClick}
                >
                  {line.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="px-5 pb-4 pt-2">
          <Button
            onClick={onButtonClick}
            className={`w-full ${buttonGradient} h-10 text-sm`}
          >
            <ButtonIcon className="w-4 h-4 mr-2" />
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}