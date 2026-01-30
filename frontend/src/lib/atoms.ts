import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const filterValueAtom = atom<"all" | "available">("all");
export const tokenAtom = atomWithStorage("token", "");
