import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        primary:
            `
            bg-[#0A66C2] px-5 py-2.5
            text-sm font-semibold text-white
            shadow-sm transition-all duration-200
            hover:bg-[#004182]
            focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/40
            active:scale-[0.98]
            `,
        secondary:
            `
            border border-[#0A66C2]
            text-sm font-medium text-[#0A66C2]
            transition-all duration-200
            hover:bg-[#E8F1FB]
            hover:border-[#004182]
            hover:text-[#004182]
            focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/40
            active:scale-[0.98]
            `,
        ghost:
            `
            text-sm font-medium text-[#0A66C2]
            transition hover:bg-[#E8F1FB]
            focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/40
            `,
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
