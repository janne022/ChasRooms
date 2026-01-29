type RoomEqupmentListProps = {
    equipment: string[];
};

export default function RoomEqupmentList({ equipment }: RoomEqupmentListProps) {
    return (
        <ul className="flex flex-wrap gap-x-2">
            {equipment.map((equipment, index) => (
                <li className="rounded-2xl bg-gray-100 p-2 text-sm" key={index}>
                    {equipment}
                </li>
            ))}
        </ul>
    );
}
