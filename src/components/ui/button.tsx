import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 duration-300 focus:ring-4 focus:ring-primary/20',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-rich-gold to-warm-copper text-slate-900 hover:from-warm-copper hover:to-rich-gold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 font-semibold',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-2 border-rich-gold bg-transparent text-rich-gold hover:bg-rich-gold hover:text-slate-900 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium',
        secondary: 'bg-gradient-to-r from-sage-gray to-platinum text-slate-900 hover:from-platinum hover:to-sage-gray shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium',
        ghost: 'hover:bg-champagne/20 hover:text-rich-gold transition-colors',
        link: 'text-rich-gold underline-offset-4 hover:underline font-medium',
        premium: 'bg-gradient-to-r from-rich-gold via-warm-copper to-rich-gold text-slate-900 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 font-bold border border-warm-copper/20',
      },
      size: {
        default: 'h-11 px-8 py-2',
        sm: 'h-9 rounded-xl px-3',
        lg: 'h-14 rounded-2xl px-12 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };