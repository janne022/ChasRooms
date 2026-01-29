import { filterValueAtom } from "@/lib/atoms";
import { TabGroup, TabList, Tab } from "@headlessui/react";
import { useSetAtom } from "jotai";

export default function RoomFilter() {
    const setFilterValue = useSetAtom(filterValueAtom);

    return (
        <TabGroup>
            <TabList>
                <Tab
                    className="cursor-pointer rounded-2xl bg-gray-100 p-4 hover:bg-gray-200 focus:bg-gray-200 data-selected:bg-gray-200"
                    onClick={() => setFilterValue("all")}
                >
                    Alla rum
                </Tab>
                <Tab
                    className="cursor-pointer rounded-2xl bg-gray-100 p-4 hover:bg-gray-200 focus:bg-gray-200 data-selected:bg-gray-200"
                    onClick={() => setFilterValue("available")}
                >
                    Bara lediga
                </Tab>
            </TabList>
        </TabGroup>
    );
}
