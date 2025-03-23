import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Users } from "lucide-react";

const ClubDetailsPage = () => {
  const { clubName } = useParams();
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const { data: club, isLoading } = useQuery({
    queryKey: ["club", clubName],
    queryFn: () => axiosInstance.get(`/leagues/${clubName}`).then(res => res.data),
  });

  if (isLoading) {
    return <div className="text-[#302F4D]">Loading club details...</div>;
  }

  if (!club) {
    return <div className="text-[#302F4D]">Club not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] via-[#E0C2E5] to-[#B98EA7]">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <Sidebar user={user} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-[#302F4D]/20 p-8">
              <h1 className="text-3xl font-bold text-[#120D31] mb-6 tracking-tight">
                {club.name}
              </h1>
              <div className="mb-6">
                <p className="text-[#302F4D]/80 text-lg">
                  {club.members.toLocaleString()} members • {club.active.toLocaleString()} active
                </p>
                <p className="text-[#302F4D]/60 mt-2">
                  Category: {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
                </p>
              </div>
              <div className="flex items-center text-[#302F4D]/80 mb-6">
                <Users size={20} className="mr-2 text-[#A57982]" />
                <span>Founded: {new Date(club.createdAt).toLocaleDateString()}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#120D31] mb-4">About</h2>
                <p className="text-[#302F4D]/80">
                  This is a placeholder description for {club.name}. Add more details about the club here in the future!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailsPage;