import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "../../utils/shadcn"

const buttonVariants = cva(
    "shad-inline-flex shad-items-center shad-justify-center shad-gap-2 shad-whitespace-nowrap shad-rounded-md shad-text-sm shad-font-medium shad-ring-offset-background shad-transition-colors shad-focus-visible:outline-none shad-focus-visible:ring-2 shad-focus-visible:ring-ring shad-focus-visible:ring-offset-2 shad-disabled:pointer-events-none shad-disabled:opacity-50 [&_svg]:shad-pointer-events-none [&_svg]:shad-size-4 [&_svg]:shad-shrink-0",
    {
        variants: {
            variant: {
                default: "shad-bg-primary shad-text-primary-foreground hover:shad-bg-primary/90",
                destructive: "shad-bg-destructive shad-text-destructive-foreground hover:shad-bg-destructive/90",
                outline: "shad-border shad-border-input shad-bg-background hover:shad-bg-accent hover:shad-text-accent-foreground",
                secondary: "shad-bg-secondary shad-text-secondary-foreground hover:shad-bg-secondary/80",
                ghost: "hover:shad-bg-accent hover:shad-text-accent-foreground",
                link: "shad-text-primary shad-underline-offset-4 hover:shad-underline",
            },
            size: {
                default: "shad-h-10 shad-px-4 shad-py-2",
                sm: "shad-h-9 shad-rounded-md shad-px-3",
                lg: "shad-h-11 shad-rounded-md shad-px-8",
                icon: "shad-h-10 shad-w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
