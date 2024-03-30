import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import React, { ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../context/SidebarContext";
import { PageHeaderSection } from "./PageHeader";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem
          Icon={Home}
          title='home'
          url='/'
        />
        <SmallSidebarItem
          Icon={Repeat}
          title='Shorts'
          url='/shorts'
        />
        <SmallSidebarItem
          Icon={Clapperboard}
          title='Subscription'
          url='/subscription'
        />
        <SmallSidebarItem
          Icon={Library}
          title='Library'
          url='/library'
        />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className='lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50'
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className='lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white'>
          <PageHeaderSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            IconOrImgUrl={Home}
            title='home'
            url='/'
          />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title='subscription'
            url='/subscription'
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title='Library'
            url='/Library'
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title='history'
            url='/history'
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title='Your Videos'
            url='/your-videos'
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title='watch Later'
            url='/playlist?list=wl'
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title='Subscriptions'>
          {subscriptions.map((item) => (
            <LargeSidebarItem
              key={item.id}
              IconOrImgUrl={item.imgUrl}
              title={item.channelName}
              url={`/@${item.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title='Explore'>
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title='Trending'
            url='/trending'
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title='Shopping'
            url='/shopping'
          />
          <LargeSidebarItem
            IconOrImgUrl={Music2}
            title='Music'
            url='/music'
          />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title='Movies & TV'
            url='/movies-tv'
          />
          <LargeSidebarItem
            IconOrImgUrl={Radio}
            title='Live'
            url='/live'
          />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title='Gaming'
            url='/gaming'
          />
          <LargeSidebarItem
            IconOrImgUrl={Newspaper}
            title='News'
            url='/news'
          />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title='Sports'
            url='/sports'
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title='Learning'
            url='/learning'
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title='Fashion & Beauty'
            url='/fashion-beauty'
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title='Podcasts'
            url='/podcasts'
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

type SmallSidebarProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className='w-6 h-6' />
      <div className='text-sm'>{title}</div>
    </a>
  );
}

type childrenProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: childrenProps) {
  const [isExpanded, setisExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);

  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className='ml-4 mt-2 text-lg mb-1'>{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setisExpanded((e) => !e)}
          variant='ghost'
          className='w-full flex items-center rounded-lg gap-4 p-3'
        >
          <ButtonIcon className='w-6 h-6' />
          <div>{isExpanded ? "show less" : "show more"}</div>
        </Button>
      )}
    </div>
  );
}

type LargerSidebarProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargerSidebarProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img
          src={IconOrImgUrl}
          className='w-6 h-6 rounded-full'
          alt=''
        />
      ) : (
        <IconOrImgUrl className='w-6 h-6' />
      )}
      <div className='whitespace-nowrap overflow-hidden text-ellipsis'>
        {title}
      </div>
    </a>
  );
}
