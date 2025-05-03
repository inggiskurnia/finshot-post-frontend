import { FC } from "react";
import { dateTimeFormatter, slugify } from "@/utils/formatter";
import { Post } from "@/types/post";
import { Clock, Eye } from "lucide-react";
import Link from "next/link";
import AvatarComponent from "@/components/common/AvatarComponent";

const CardPost: FC<Post> = ({
  userName,
  userProfilePictureUrl,
  title,
  body,
  totalViews,
  createdAt,
}) => {
  return (
    <div className={"flex gap-2 px-10 py-5 border-b-2 border-b-slate-200"}>
      <div className={"flex flex-col gap-3"}>
        <div className={"flex gap-2 items-center"}>
          <div className={"w-7"}>
            <AvatarComponent
              userName={userName}
              profilePictureUrl={userProfilePictureUrl}
            />
          </div>
          <p className={"text-gray-700"}>Inggis Kurnia Trisiawan</p>
        </div>

        <Link href={`post/${slugify(title)}`}>
          <div className={"flex flex-col gap-2"}>
            <h1 className={"font-semibold text-lg"}>{title}</h1>

            <p className={"line-clamp-2"}>{body}</p>
          </div>
        </Link>

        <div className={"flex justify-end pt-2"}>
          <div className={"flex gap-8 text-gray-500 text-sm"}>
            <div className={"flex gap-1 items-center"}>
              <Clock size={15} />
              <p>{dateTimeFormatter(createdAt)}</p>
            </div>
            <div className={"flex gap-1 items-center"}>
              <Eye size={15} />
              <p>{totalViews}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPost;
