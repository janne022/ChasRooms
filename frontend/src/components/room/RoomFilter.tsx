import { filterValueAtom } from "@lib/atoms";
import { TabGroup, TabList, Tab } from "@headlessui/react";
import { useSetAtom } from "jotai";

export default function RoomFilter() {
    const setFilterValue = useSetAtom(filterValueAtom);

    return (
        <TabGroup>
            <TabList className="mt-3">
                <Tab
                    className="default-bg mr-3 cursor-pointer p-2"
                    onClick={() => setFilterValue("all")}
                >
                    Alla rum
                </Tab>
                <Tab
                    className="default-bg cursor-pointer p-2"
                    onClick={() => setFilterValue("available")}
                >
                    Bara lediga
                </Tab>
            </TabList>
        </TabGroup>
    );
}
