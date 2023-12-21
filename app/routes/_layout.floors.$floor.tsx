import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import BanditQuest from "~/components/BanditQuest";
import { strapiLoader } from "~/helpers/strapiLoader";
import { Oma } from "~/components/Oma";
import { Capsule } from "~/components/Capsule";
type ImageData = {
  url: string;
  name: string;
};

type GachaMachine = {
  id: number;
  title: string;
  description: string;
  image: ImageData;
  bandit_collection_id: number;
  type: "yoki" | "oma" | "bandit_onchain" | "bandit_social";
};

type floorData = {
  id: number;
  floorName: string;
  floorDescription: string;
  backgroundImage: ImageData;
  gachaMachines: GachaMachine[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const response = await strapiLoader<floorData>(`/floors/${params.floor}`);
  return json(response);
};

export default function Floor() {
  const [visibleDiv, setVisibleDiv] = useState<number | null>(null);
  const [lastBackgroundPosition, setLastBackgroundPosition] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { apiData, imageUrlPrefix } = useLoaderData<LoaderFunction>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const updateScrollProgress = () => {
    const scrollContainerDiv = scrollContainerRef.current;
    if (scrollContainerDiv) {
      const maxScrollLeft = scrollContainerDiv.scrollWidth - scrollContainerDiv.clientWidth;
      const progress = (scrollContainerDiv.scrollLeft / maxScrollLeft) * 100;
      setScrollProgress(progress);
    }
  };
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      handleButtonScroll("right");
    } else if (event.key === "ArrowLeft") {
      handleButtonScroll("left");
    }
  };

  const isChildOfImageDetails = (element: Element | null): boolean => {
    while (element) {
      if (element.id.startsWith("image_details")) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  };

  const handleWheel = (event: WheelEvent) => {
    const targetElement = event.target as Element;
    if (isChildOfImageDetails(targetElement)) {
      return;
    }
    const scrollContainerDiv = scrollContainerRef.current;
    const backgroundDiv = document.getElementById("background");

    if (scrollContainerDiv && backgroundDiv) {
      event.preventDefault();

      // Convert vertical scroll to horizontal
      const { deltaX, deltaY } = event;
      scrollContainerDiv.scrollLeft += deltaY + deltaX;

      // Parallax effect
      const parallaxRatio = 0.1;
      const backgroundScroll = scrollContainerDiv.scrollLeft * parallaxRatio;

      backgroundDiv.style.backgroundPositionX = `-${backgroundScroll}px`;
      setLastBackgroundPosition(backgroundScroll);
      updateScrollProgress();
    }
  };

  const handleButtonScroll = (direction: "left" | "right") => {
    const scrollContainerDiv = scrollContainerRef.current;
    const backgroundDiv = backgroundRef.current;

    if (scrollContainerDiv && backgroundDiv) {
      const contentCurrent = scrollContainerDiv.scrollLeft;
      const contentScrollAmount = scrollContainerDiv.clientWidth * 0.6;
      const contentNewScrollLeft =
        direction === "right"
          ? Math.min(
              contentCurrent + contentScrollAmount,
              scrollContainerDiv.scrollWidth - scrollContainerDiv.clientWidth,
            )
          : Math.max(contentCurrent - contentScrollAmount, 0);

      if (direction === "right" && contentCurrent === contentNewScrollLeft) {
        return;
      }

      const backgroundScrollAmount =
        scrollContainerDiv.clientWidth * 0.05 * (direction === "right" ? 1 : -1);
      const backgroundNewPosition = Math.max(lastBackgroundPosition + backgroundScrollAmount, 0);

      let startTimestamp: number | null = null;
      const duration = 300;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const contentPosition = contentCurrent + progress * (contentNewScrollLeft - contentCurrent);
        const backgroundPosition =
          lastBackgroundPosition + progress * (backgroundNewPosition - lastBackgroundPosition);

        scrollContainerDiv.scrollLeft = contentPosition;
        backgroundDiv.style.backgroundPositionX = `-${backgroundPosition}px`;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setLastBackgroundPosition(backgroundNewPosition);
          updateScrollProgress();
        }
      };
      window.requestAnimationFrame(step);
    }
  };

  const handleImageClick = (index: number) => {
    setVisibleDiv(visibleDiv === index ? null : index);
  };

  useEffect(() => {
    const scrollContainerDiv = scrollContainerRef.current;

    if (scrollContainerDiv) {
      updateScrollProgress();
      scrollContainerDiv.addEventListener("wheel", handleWheel, { passive: false });
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      if (scrollContainerDiv) {
        scrollContainerDiv.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleWheel, handleKeyUp, updateScrollProgress]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Parallax Background */}
      {
        <div
          id="background"
          ref={backgroundRef}
          className="absolute top-0 left-0 w-full min-h-screen z--10"
          style={{
            backgroundImage: `url(${imageUrlPrefix ?? ""}${apiData.backgroundImage.url})`,
            backgroundSize: "auto 100%",
            backgroundRepeat: "repeat-x",
            backgroundPositionX: "0",
          }}
        />
      }

      <div className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr] min-h-screen relative z-0">
        <div className="absolute top-1/2 inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(0,56,94,0.7)] to-transparent z--10 pointer-events-none" />

        <div className="row-start-2 col-start-1 overflow-auto col-span-2">
          <div
            className="flex overflow-x-auto h-full scrollbar-hide items-center pl-[30%] z-10"
            ref={scrollContainerRef}
          >
            {apiData.gachaMachines.map((machine: GachaMachine) => {
              if (machine.type === "yoki") {
                return (
                  <div className="flex mr-[20%] items-center" key={machine.id}>
                    <div className="min-w-[450px] h-[45vh] relative">
                      <img
                        src={`${imageUrlPrefix ?? ""}${machine.image.url}`}
                        alt={`Gacha machine ${machine.title}`}
                        className="absolute inset-0 w-full min-h-fit h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(machine.id)}
                      />
                    </div>

                    <div
                      id={`image_details_${machine.id}`}
                      className="transition-all overflow-y-scroll bg-gray-200 rounded-lg self-stretch max-h-[45vh]"
                      style={{
                        width: visibleDiv === machine.id ? "500px" : "0",
                        opacity: 0.9,
                        transition: "width 0.3s ease",
                      }}
                      onScroll={(event) => event.stopPropagation()}
                    >
                      <p className="p-4 font-bold text-xl capitalize">{machine.title}</p>
                      <p className="p-4">{machine.description}</p>
                      <Capsule showButton={true} imageSize="w-1/2" />
                    </div>
                  </div>
                );
              }
              if (machine.type === "oma") {
                return (
                  <div className="flex mr-[20%] items-center" key={machine.id}>
                    <div className="min-w-[450px] h-[45vh] relative">
                      <img
                        src={`${imageUrlPrefix ?? ""}${machine.image.url}`}
                        alt={`Gacha machine ${machine.title}`}
                        className="absolute inset-0 w-full min-h-fit h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(machine.id)}
                      />
                    </div>

                    <div
                      id={`image_details_${machine.id}`}
                      className="transition-all overflow-y-scroll bg-gray-200 rounded-lg self-stretch max-h-[45vh]"
                      style={{
                        width: visibleDiv === machine.id ? "500px" : "0",
                        opacity: 0.9,
                        transition: "width 0.3s ease",
                      }}
                      onScroll={(event) => event.stopPropagation()}
                    >
                      <p className="p-4 font-bold text-xl capitalize">{machine.title}</p>
                      <p className="p-4">{machine.description}</p>
                      <Oma showButton={true} />
                    </div>
                  </div>
                );
              }
              if (machine.type === "bandit_onchain") {
                return (
                  <div className="flex mr-[20%] items-center" key={machine.id}>
                    <div className="min-w-[450px] h-[45vh] relative">
                      <img
                        src={`${imageUrlPrefix ?? ""}${machine.image.url}`}
                        alt={`Gacha machine ${machine.title}`}
                        className="absolute inset-0 w-full min-h-fit h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(machine.id)}
                      />
                    </div>

                    <div
                      id={`image_details_${machine.id}`}
                      className="transition-all overflow-y-scroll bg-gray-200 rounded-lg self-stretch max-h-[45vh]"
                      style={{
                        width: visibleDiv === machine.id ? "500px" : "0",
                        opacity: 0.9,
                        transition: "width 0.3s ease",
                      }}
                      onScroll={(event) => event.stopPropagation()}
                    >
                      <p className="p-4 font-bold text-xl capitalize">{machine.title}</p>
                      <p className="p-4">{machine.description}</p>
                      <p className="p-4 font-bold text-blue-500">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href="https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/erc1155.html?contract=0x680ddB1b8c0736d060BbF8455b669cf9b70f84A8&chain=%7B%22name%22%3A%22zKatana%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2Fzkatana.rpc.thirdweb.com%2Ff33bf946e25b6be471b7cfe6e16b3b39%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Sepolia+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22azktn%22%2C%22chainId%22%3A1261120%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22zkatana%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmRySLe3su59dE5x5JPm2b1GeZfz6DR9qUzcbp3rt4SD3A%22%2C%22width%22%3A300%2C%22height%22%3A300%2C%22format%22%3A%22png%22%7D%7D&clientId=f33bf946e25b6be471b7cfe6e16b3b39&tokenId=0&theme=dark&primaryColor=green"
                        >
                          Mint OG Token here
                        </a>
                      </p>
                      <BanditQuest
                        isOpen={!!visibleDiv}
                        collectionId={machine.bandit_collection_id}
                        onClose={() => {}}
                      />
                    </div>
                  </div>
                );
              }
              if (machine.type === "bandit_social") {
                return (
                  <div className="flex mr-[20%] items-center" key={machine.id}>
                    <div className="min-w-[450px] h-[45vh] relative">
                      <img
                        src={`${imageUrlPrefix ?? ""}${machine.image.url}`}
                        alt={`Gacha machine ${machine.title}`}
                        className="absolute inset-0 w-full min-h-fit h-full object-cover cursor-pointer"
                        onClick={() => handleImageClick(machine.id)}
                      />
                    </div>

                    <div
                      id={`image_details_${machine.id}`}
                      className="transition-all overflow-y-scroll bg-gray-200 rounded-lg self-stretch max-h-[45vh]"
                      style={{
                        width: visibleDiv === machine.id ? "500px" : "0",
                        opacity: 0.9,
                        transition: "width 0.3s ease",
                      }}
                      onScroll={(event) => event.stopPropagation()}
                    >
                      <p className="p-4 font-bold text-xl capitalize">{machine.title}</p>
                      <p className="p-4">Partner name: {machine.description}</p>
                      <BanditQuest
                        isOpen={!!visibleDiv}
                        collectionId={machine.bandit_collection_id}
                        onClose={() => {}}
                      />
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator Container */}
      <div className="absolute bottom-10 left-1/3 right-1/3 z-20 flex justify-between items-center">
        {/* Left Button */}
        <button
          className="flex justify-center items-center p-2 bg-blue-500 text-white rounded-full h-10 w-10 hover:bg-blue-300 transition-colors duration-300 focus:border-none"
          onClick={() => handleButtonScroll("left")}
          type="button"
        >
          <span className="font-bold text-xl">&lt;</span>
        </button>

        {/* Scroll Indicator */}
        <div className="bg-gray-300 flex-grow mx-2 h-4 rounded-full">
          <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${scrollProgress}%` }} />
        </div>

        {/* Right Button */}
        <button
          className="flex justify-center items-center p-2 bg-blue-500 text-white rounded-full h-10 w-10 hover:bg-blue-300 transition-colors duration-300 focus:border-none"
          onClick={() => handleButtonScroll("right")}
          type="button"
        >
          <span className="font-bold text-xl">&gt;</span>
        </button>
      </div>
    </div>
  );
}
