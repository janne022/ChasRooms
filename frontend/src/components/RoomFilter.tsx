import { filterValueAtom } from "@/lib/atoms";
import { TabGroup, TabList, Tab } from "@headlessui/react";
import { useSetAtom } from "jotai";

export default function RoomFilter() {
    const setFilterValue = useSetAtom(filterValueAtom);

    return (
        <TabGroup>
            <TabList>
                <Tab onClick={() => setFilterValue("all")}> Alla rum </Tab>
                <Tab onClick={() => setFilterValue("available")}>
                    Bara lediga
                </Tab>
            </TabList>
        </TabGroup>
    );
}
