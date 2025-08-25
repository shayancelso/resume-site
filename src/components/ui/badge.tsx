import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 duration-300',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-chocolate text-white hover:bg-chocolate-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105',
        secondary: 'border-transparent bg-neutral-100 text-black hover:bg-neutral-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-chocolate border-chocolate/30 hover:bg-chocolate/10 hover:border-chocolate shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        skill: 'border-transparent bg-neutral-100 text-chocolate hover:bg-neutral-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 animate-float border border-chocolate/20',
        premium: 'border-chocolate bg-chocolate text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-110 font-bold hover:bg-chocolate-600',
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