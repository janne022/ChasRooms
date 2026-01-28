import React from "react";

type ButtonProps = {
    children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
    return <button> {children} </button>;
}
