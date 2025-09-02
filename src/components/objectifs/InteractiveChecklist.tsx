'use client';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface InteractiveChecklistProps {
  items: string[];
}

export function InteractiveChecklist({ items }: InteractiveChecklistProps) {
  const [checkedStates, setCheckedStates] = useState<Record<number, boolean>>({});

  const handleCheckChange = (index: number) => {
    setCheckedStates(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Checkbox
            id={`check-${index}`}
            checked={!!checkedStates[index]}
            onCheckedChange={() => handleCheckChange(index)}
          />
          <Label
            htmlFor={`check-${index}`}
            className={`flex-1 text-sm ${checkedStates[index] ? 'text-muted-foreground line-through' : ''}`}
          >
            {item}
          </Label>
        </div>
      ))}
    </div>
  );
}