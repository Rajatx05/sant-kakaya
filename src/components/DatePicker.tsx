import { useState, useEffect } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  minAge?: number;
  placeholder?: string;
  className?: string;
}

export default function DatePicker({ value, onChange, label, error, required, minAge = 21, placeholder = 'Select date', className = '' }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [age, setAge] = useState<number | null>(null);

  // Parse initial value
  useEffect(() => {
    if (value) {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
        calculateAge(parsedDate);
      }
    }
  }, [value]);

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      calculateAge(selectedDate);
      const dateString = format(selectedDate, 'yyyy-MM-dd');
      onChange(dateString);
      setIsOpen(false);
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - (minAge || 0));

  const isEligible = minAge === 0 || (age !== null && age >= minAge);

  return (
    <div className="space-y-3 w-full">
      {label && (
        <Label className="text-gray-700">
          {label} {required && '*'}
        </Label>
      )}
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={`w-full ${className || 'h-14'} px-4 flex items-center justify-between bg-white border-2 rounded-xl text-sm sm:text-base transition-all touch-manipulation ${
              error 
                ? 'border-red-300 focus:border-red-400' 
                : 'border-gray-200 hover:border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100'
            }`}
          >
            <span className={date ? 'text-gray-900' : 'text-gray-400'}>
              {date ? format(date, 'PPP') : (placeholder || 'Select date of birth')}
            </span>
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 bg-white shadow-2xl border-2 border-gray-100" 
          align="center"
          sideOffset={8}
        >
          <div className="p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => {
                const today = new Date();
                if (minAge === 0) {
                  return date > today;
                }
                const minBirthDate = new Date();
                minBirthDate.setFullYear(today.getFullYear() - minAge);
                return date > minBirthDate || date > today;
              }}
              defaultMonth={date || maxDate}
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={1950}
              toYear={new Date().getFullYear() - minAge}
              className="rounded-xl"
              classNames={{
                months: "space-y-4",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center px-4",
                caption_label: "text-sm sm:text-base",
                caption_dropdowns: "flex gap-1 sm:gap-2",
                nav: "space-x-1 flex items-center",
                nav_button: "h-8 w-8 sm:h-9 sm:w-9 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-rose-50 rounded-lg transition-all touch-manipulation",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-gray-500 rounded-md w-9 sm:w-12 text-xs sm:text-sm",
                row: "flex w-full mt-2",
                cell: "relative p-0 text-center text-sm sm:text-base focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-rose-50 rounded-lg",
                day: "h-9 w-9 sm:h-12 sm:w-12 p-0 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-all aria-selected:opacity-100 touch-manipulation",
                day_selected: "bg-gradient-to-br from-rose-500 to-pink-500 text-white hover:bg-rose-600 hover:text-white focus:bg-rose-600 focus:text-white rounded-lg shadow-md",
                day_today: "bg-rose-50 text-rose-600 ring-2 ring-rose-200 rounded-lg",
                day_outside: "text-gray-300 opacity-50",
                day_disabled: "text-gray-300 opacity-30 cursor-not-allowed",
                day_range_middle: "aria-selected:bg-rose-100 aria-selected:text-rose-600",
                day_hidden: "invisible",
                dropdown: "h-8 sm:h-9 px-2 sm:px-3 text-xs sm:text-sm bg-white border-2 border-gray-200 rounded-lg hover:border-rose-300 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all",
                dropdown_month: "mr-1",
                dropdown_year: "ml-1",
              }}
            />
          </div>
        </PopoverContent>
      </Popover>

      {/* Age Display */}
      {age !== null && (
        <div className={`flex items-center gap-2 p-3 rounded-xl ${
          isEligible 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {isEligible ? (
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span className={`text-sm ${isEligible ? 'text-green-700' : 'text-red-700'}`}>
            Your age: {age} years {isEligible ? '✓ Eligible' : `✗ Must be ${minAge}+`}
          </span>
        </div>
      )}

      {error && <span className="text-red-500 text-sm">{error}</span>}
      
      {!error && !age && minAge > 0 && (
        <span className="text-gray-500 text-xs">You must be {minAge} years or older</span>
      )}
    </div>
  );
}
