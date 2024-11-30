import React from 'react';
import type { Control } from 'react-hook-form';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import MultipleSelector, { MultipleSelectorProps } from './mutliple-selector';

interface MultipleSelectorFormProps extends MultipleSelectorProps {
  control: Control<any>;
  name: string;
  label?: string;
  description?: React.HTMLAttributes<HTMLParagraphElement>['children'];
}

const MultipleSelectorForm = React.forwardRef<HTMLSelectElement, MultipleSelectorFormProps>(
  ({ className, control, name, label, description, ...props }, ref) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <MultipleSelector className={className} {...field} {...props} />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}

            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    );
  },
);

MultipleSelectorForm.displayName = 'MultipleSelectorForm';

export { MultipleSelectorForm };
