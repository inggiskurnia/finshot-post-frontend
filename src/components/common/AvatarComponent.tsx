import { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/formatter";

interface AvatarComponentProps {
  userName: string;
  profilePictureUrl?: string;
  width?: number;
  height?: number;
}
const AvatarComponent: FC<AvatarComponentProps> = ({
  userName,
  profilePictureUrl,
  width = 7,
  height = 7,
}) => {
  return (
    <div className={"bg-gray-200 rounded-full text-gray-700"}>
      {profilePictureUrl && (
        <Image
          src={userName}
          alt={profilePictureUrl}
          width={width}
          height={height}
        />
      )}
      {!profilePictureUrl && userName && (
        <div
          className={cn(
            `w-${width}`,
            `h-${height}`,
            "flex items-center justify-center border-2 rounded-full",
          )}
        >
          {getInitials(userName)}
        </div>
      )}
    </div>
  );
};

export default AvatarComponent;
