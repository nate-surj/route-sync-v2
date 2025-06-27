
import React, { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormControl } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

interface MapboxSuggestion {
  place_name: string;
  center: [number, number];
  place_type: string[];
}

const LocationAutocomplete = ({
  value,
  onChange,
  placeholder = "Enter address",
  className,
  id,
  disabled = false
}: LocationAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<MapboxSuggestion[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Function to fetch addresses from Mapbox using our edge function
  const fetchMapboxSuggestions = async (input: string) => {
    if (!input || input.length < 2) return [];
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('get-mapbox-suggestions', {
        body: { query: input }
      });
      
      if (error) {
        console.error("Error fetching Mapbox suggestions:", error);
        return [];
      }
      
      return data?.features || [];
    } catch (error) {
      console.error("Error fetching Mapbox suggestions:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the API call
    timeoutRef.current = setTimeout(async () => {
      if (value && value.length >= 2) {
        const results = await fetchMapboxSuggestions(value);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (suggestion: MapboxSuggestion) => {
    onChange(suggestion.place_name);
    setIsFocused(false);
    setSuggestions([]);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <FormControl>
          <Input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
          />
        </FormControl>
        {value && isFocused && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
               onClick={() => onChange("")}>
            <span className="text-gray-400 text-sm">✕</span>
          </div>
        )}
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-t-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      {isFocused && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                onClick={() => handleSelect(suggestion)}
              >
                <MapPin className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                <span className="text-sm">{suggestion.place_name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isFocused && !isLoading && value.length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="px-4 py-2 text-sm text-gray-500">
            No suggestions found
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationAutocomplete;
