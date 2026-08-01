import { VariantProps, cva } from "class-variance-authority";
import { cn } from "./utils";

/**
 * Common motion settings for Radix components
 */
export const radixMotion = {
  fast: { duration: 150, easing: "ease-out" },
  medium: { duration: 250, easing: "ease-in-out" },
  slow: { duration: 400, easing: "ease-in" }
};

/**
 * Accessibility helpers
 */
export const radixA11y = {
  ariaHidden: { "aria-hidden": "true" },
  ariaLabel: (label: string) => ({ "aria-label": label }),
  ariaExpanded: (expanded: boolean) => ({ "aria-expanded": expanded })
};

/**
 * Example: Button variants using CVA
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-brand text-white hover:bg-brand-dark",
        outline: "border border-gray-300 hover:bg-gray-100",
        ghost: "hover:bg-gray-100"
      },
      size: {
        sm: "h-8 px-2",
        md: "h-10 px-4",
        lg: "h-12 px-6"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Utility to merge Radix + Tailwind classes
 */
export function radixClass(...inputs: (string | undefined)[]) {
  return cn(...inputs);
}
