import { Link } from "@/src/navigation";
import admin from "@/public/icons/admin.png";
import Image from "next/image";
import { useParams } from "next/navigation";
const LeagueButton = () => {
  const { leagueSlug } = useParams();
  return (
    <Link
      className="text-md flex w-fit gap-3 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-accent hover:text-text"
      href={`/league/${leagueSlug}`}
    >
      <span className="max-sm:hidden">سجل اسمك</span>
      <Image className="w-auto" src={admin} alt="admin" height={15} />
    </Link>
  );
};

export default LeagueButton;
