import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    variant?: "primary" | "secondary";
} & React.ComponentPropsWithRef<"button">;

const buttonVariantsStyles = {
    primary:
        "cursor-pointer rounded-xl bg-blue-400 p-4 text-white hover:bg-blue-300 focus:bg-blue-300",
    secondary:
        "cursor-pointer rounded-xl border-2 border-neutral-200 bg-neutral-100 p-4 hover:bg-neutral-50",
};

export default function Button({
    children,
    variant = "primary",
    ...rest
}: ButtonProps) {
    return (
        <button className={buttonVariantsStyles[variant]} {...rest}>
            {children}
        </button>
    );
}
