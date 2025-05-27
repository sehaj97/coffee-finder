// import { unsplash } from "@/libs/usplash-api";
import Image from "next/image";
import Link from "next/link";
interface CardProps {
  name: string;
  imageUrl?: string;
  href?: string;
}
export const Card = ({ name, imageUrl, href }: CardProps) => {
  return (
    <Link
      href={href || "#"}
      className="m-auto rounded-xl border-gray-400 shadow-2xl"
    >
      <div className="glass min-h-[200px] rounded-xl px-5 pb-5 pt-1 backdrop-blur-3xl">
        <div className="my-3">
          <h2 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
            {name}
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <Image
            className="max-h-[200px] min-h-[200px] rounded-lg shadow-lg"
            src={imageUrl || ""}
            width={260}
            height={160}
            alt={name}
          />
        </div>
      </div>
    </Link>
  );
};
