import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 duration-300',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gradient-to-r from-rich-gold to-warm-copper text-slate-900 hover:from-warm-copper hover:to-rich-gold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105',
        secondary: 'border-transparent bg-gradient-to-r from-sage-gray/20 to-platinum/20 text-foreground hover:from-sage-gray/30 hover:to-platinum/30 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-rich-gold border-rich-gold/30 hover:bg-rich-gold/10 hover:border-rich-gold shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        skill: 'border-transparent bg-gradient-to-r from-rich-gold/20 to-champagne/20 text-rich-gold hover:from-rich-gold/30 hover:to-champagne/30 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-float border border-rich-gold/20',
        premium: 'border-rich-gold bg-gradient-to-r from-rich-gold via-warm-copper to-rich-gold text-slate-900 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-110 font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };