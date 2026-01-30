type RoomResourceListProps = {
    resources: string[];
};

export default function RoomResourceList({ resources }: RoomResourceListProps) {
    return (
        <ul className="flex flex-wrap gap-x-2">
            {resources.map((resource, index) => (
                <li className="rounded-2xl bg-gray-100 p-2 text-sm" key={index}>
                    {resource}
                </li>
            ))}
        </ul>
    );
}
