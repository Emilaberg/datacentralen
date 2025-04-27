import React from "react";

interface AvatarProps {
  img: string;
  name: string;
  date: Date | string;
}

export default function Avatar({ img, name, date }: AvatarProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-SV", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <div className="flex flex-row gap-3 mt-5">
      <div className="h-12 w-12 rounded-full">
        <img src={img} alt={name} className="object-cover" />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[#434343]">{name}</p>
        <p className="text-[#777777] text-[11px]">{formattedDate}</p>
      </div>
    </div>
  );
}
