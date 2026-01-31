import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const filterValueAtom = atom<"all" | "available">("all");
export const isBuildingMapOpenAtom = atom(false);
export const tokenAtom = atomWithStorage("token", "");
