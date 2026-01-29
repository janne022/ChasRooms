import React from "react";

type ButtonProps = {
    children: React.ReactNode;
} & React.ComponentPropsWithRef<"button">;

export default function Button({ children, ...rest }: ButtonProps) {
    return <button {...rest}> {children} </button>;
}
