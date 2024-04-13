import { LeagueTextProps } from "@/src/types/textProps";

const ShareButton = ({texts}: {texts: LeagueTextProps}) => {
  const shareOnWhatsApp = () => {
    const text = "Register in this amazing League!";
    const url = typeof window !== "undefined" ? window.location.href : ""; 
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;

    window.open(whatsappUrl, "_blank");
  };

  const sharePage = async () => {
    const shareData = {
      title: "League Page",
      text: "Register in this amazing League!",
      url: typeof window !== "undefined" ? window.location.href : "", 
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        shareOnWhatsApp(); // Fallback to WhatsApp if Web Share API is not supported
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <button
      onClick={shareOnWhatsApp}
      className="rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
    >
      {texts.share}
    </button>
  );
};

export default ShareButton;
