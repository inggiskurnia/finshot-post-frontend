import { FC } from "react";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/formatter";

interface AvatarComponentProps {
  author: string;
  width?: number;
  height?: number;
}
const AvatarComponent: FC<AvatarComponentProps> = ({
  author,
  width = 7,
  height = 7,
}) => {
  return (
    <div className={"bg-gray-200 rounded-full text-gray-700"}>
      {author && (
        <div
          className={cn(
            `w-${width}`,
            `h-${height}`,
            "flex items-center justify-center border-2 rounded-full",
          )}
        >
          {getInitials(author)}
        </div>
      )}
    </div>
  );
};

export default AvatarComponent;
