import Image from "next/image";
import React from "react";

export interface CanvasCardProps {
  name: string;
  value?: string;
  state: "past" | "current" | "inFront";
  onClick: () => void;
}

export const CanvasCard = ({
  name,
  value,
  state,
  onClick,
}: CanvasCardProps) => {
  const bg =
    state === "current"
      ? "border-secondary bg-secondary/10"
      : state === "inFront"
      ? "border-[gray]"
      : "border-primary";
  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className={`flex flex-col font-medium cursor-pointer justify-center items-center h-20 w-60 rounded-md border-2 ${bg}`}
        onClick={onClick}
      >
        <h1>{name}</h1>
        <h1>{value || "Not Selected"}</h1>
      </div>
      <Image
        height={50}
        width={30}
        color="red"
        src="/icons/arrow-down.svg"
        alt=""
      />
    </div>
  );
};
