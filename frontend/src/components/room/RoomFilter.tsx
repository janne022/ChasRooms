import { filterValueAtom } from "@/lib/atoms";
import { TabGroup, TabList, Tab } from "@headlessui/react";
import { useSetAtom } from "jotai";

export default function RoomFilter() {
    const setFilterValue = useSetAtom(filterValueAtom);

    return (
        <TabGroup>
            <TabList className="mt-3">
                <Tab
                    className="cursor-pointer  default-bg p-2 mr-3"
                    onClick={() => setFilterValue("all")}
                >
                    Alla rum
                </Tab>
                <Tab
                    className="cursor-pointer default-bg p-2"
                    onClick={() => setFilterValue("available")}
                >
                    Bara lediga
                </Tab>
            </TabList>
        </TabGroup>
    );
}
