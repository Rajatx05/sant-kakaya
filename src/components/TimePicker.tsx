import { useState, useRef, useEffect } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export default function TimePicker({ value, onChange, label, error, required, placeholder = 'Select time', className = '' }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState('12');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const pickerRef = useRef<HTMLDivElement>(null);

  // Parse initial value
  useEffect(() => {
    if (value && value !== '') {
      const [hours, minutes] = value.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
        setSelectedHour(hour12.toString().padStart(2, '0'));
        setSelectedMinute(minutes.toString().padStart(2, '0'));
        setPeriod(hours >= 12 ? 'PM' : 'AM');
      }
    }
  }, [value]);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const formatTime = () => {
    if (!value) return placeholder || 'Select time';
    if (value === '00:00') return 'Unknown / Not Sure';
    const [hours, minutes] = value.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return placeholder || 'Select time';
    const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    const displayMinute = minutes.toString().padStart(2, '0');
    const displayPeriod = hours >= 12 ? 'PM' : 'AM';
    return `${displayHour}:${displayMinute} ${displayPeriod}`;
  };

  const setUnknownTime = () => {
    onChange('00:00');
    setIsOpen(false);
  };

  const handleConfirm = () => {
    const hour = parseInt(selectedHour);
    const minute = parseInt(selectedMinute);
    
    let hour24 = hour;
    if (period === 'PM' && hour !== 12) hour24 = hour + 12;
    if (period === 'AM' && hour === 12) hour24 = 0;
    
    const timeString = `${hour24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    onChange(timeString);
    setIsOpen(false);
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

  return (
    <div className="relative w-full" ref={pickerRef}>
      {label && (
        <Label className="text-gray-700 mb-3 block">
          {label} {required && '*'}
        </Label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${className || 'h-14'} px-4 flex items-center justify-between bg-white border-2 rounded-xl text-sm sm:text-base transition-all touch-manipulation ${
          error 
            ? 'border-red-300 focus:border-red-400' 
            : 'border-gray-200 hover:border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
        }`}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {formatTime()}
        </span>
        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
      </button>

      {error && <span className="text-red-500 text-sm mt-1 block">{error}</span>}

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 left-0 right-0">
          <div className="p-4 sm:p-6">
            {/* Time Display */}
            <div className="text-center mb-4 sm:mb-6">
              <div className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-br from-rose-50 to-pink-50 px-4 sm:px-8 py-3 sm:py-5 rounded-2xl shadow-inner">
                <span className="text-3xl sm:text-5xl text-rose-600 tabular-nums">
                  {selectedHour}
                </span>
                <span className="text-3xl sm:text-5xl text-rose-400">:</span>
                <span className="text-3xl sm:text-5xl text-rose-600 tabular-nums">
                  {selectedMinute}
                </span>
                <span className="text-xl sm:text-3xl text-rose-500 ml-2 sm:ml-3">{period}</span>
              </div>
            </div>

            {/* Simple Controls */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              {/* Hour Selection */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs text-gray-500 text-center block">Hour</label>
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="w-full h-12 sm:h-16 text-xl sm:text-3xl text-center bg-white border-2 border-rose-200 rounded-xl hover:border-rose-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 cursor-pointer touch-manipulation"
                >
                  {hours.map(hour => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minute Selection */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs text-gray-500 text-center block">Minute</label>
                <select
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}
                  className="w-full h-12 sm:h-16 text-xl sm:text-3xl text-center bg-white border-2 border-rose-200 rounded-xl hover:border-rose-300 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 cursor-pointer touch-manipulation"
                >
                  {minutes.map(minute => (
                    <option key={minute} value={minute}>
                      {minute}
                    </option>
                  ))}
                </select>
              </div>

              {/* AM/PM Toggle */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-xs text-gray-500 text-center block">Period</label>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setPeriod('AM')}
                    className={`w-full h-5 sm:h-7 rounded-lg transition-all text-xs sm:text-sm touch-manipulation ${
                      period === 'AM'
                        ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod('PM')}
                    className={`w-full h-5 sm:h-7 rounded-lg transition-all text-xs sm:text-sm touch-manipulation ${
                      period === 'PM'
                        ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    PM
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 h-10 sm:h-12 border-2 border-gray-200 hover:bg-gray-50 transition-all text-sm sm:text-base touch-manipulation"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirm}
                className="flex-1 h-10 sm:h-12 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all text-sm sm:text-base touch-manipulation"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
