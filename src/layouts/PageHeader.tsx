import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/Logo.png";
import { Button } from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../context/SidebarContext";

export function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    // total div that is covering
    <div className='flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4'>
      {/* section 1 */}
      <PageHeaderSection hidden={showFullWidthSearch} />
      {/* section 2 */}
      <form
        className={` gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(!showFullWidthSearch)}
            type='button'
            size='icon'
            variant='ghost'
            className='flex-shrink-0'
          >
            <ArrowLeft />
          </Button>
        )}
        <div className='flex flex-grow max-w-[600px]'>
          <input
            type='search'
            placeholder='search...'
            className='rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none'
          />
          <Button className='py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0'>
            <Search />
          </Button>
        </div>
        <Button
          type='submit'
          size='icon'
          className='flex-shrink-0'
        >
          <Mic />
        </Button>
      </form>
      {/* section 3 */}
      <div
        className={`flex flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size='icon'
          variant='ghost'
          className='md:hidden'
        >
          <Search />
        </Button>
        <Button
          size='icon'
          variant='ghost'
          className='md:hidden'
        >
          <Mic />
        </Button>
        <Button
          size='icon'
          variant='ghost'
        >
          <Upload />
        </Button>
        <Button
          size='icon'
          variant='ghost'
        >
          <Bell />
        </Button>
        <Button
          size='icon'
          variant='ghost'
        >
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderSectionProps = {
  hidden?: boolean;
};

export function PageHeaderSection({ hidden = false }: PageHeaderSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button
        onClick={toggle}
        variant='ghost'
        size='icon'
      >
        <Menu />
      </Button>
      <a href='/'>
        <img
          src={logo}
          alt='image'
          className='h-6'
        />
      </a>
    </div>
  );
}
