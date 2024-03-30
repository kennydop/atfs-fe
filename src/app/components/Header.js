import {
  ArrowRightStartOnRectangleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className="h-14 fixed inset-x-0 z-10 flex justify-between items-center px-2 md:px-8 lg:px-14 bg-white border-b border-gray-300 backdrop-filter backdrop-blur-md bg-opacity-40">
      <h1 className="text-xl md:text-2xl font-bold">ATFS</h1>
      <form action="" className="relative mx-auto w-max">
        <input
          type="search"
          placeholder="Search..."
          className="peer cursor-pointer md:cursor-auto relative z-10 h-10 w-10 md:h-full md:w-full md:pr-2 md:py-1 bg-gray-200 rounded-full md:rounded-md focus:outline-none border border-gray-300 backdrop-filter backdrop-blur-md bg-opacity-40 focus:border-primary pl-10 focus:w-full focus:pl-12 focus:pr-2"
        />
        {/* <input
          type="search"
          placeholder="Search Files..."
          class="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-primary focus:pl-16 focus:pr-4"
        /> */}

        <MagnifyingGlassIcon className="ml-2.5 md:ml-2 absolute inset-y-0 my-auto h-5 w-5 md:h-4 md:w-4 border-transparent stroke-gray-500 peer-focus:border-primary peer-focus:stroke-primary" />
      </form>
      <div className="flex items-center rounded-full bg-gray-200 p-1 cursor-pointer">
        <img
          src="https://randomuser.me/api/portraits/women/92.jpg"
          alt="Profile"
          className="h-8 w-8 rounded-full mr-1"
        />
        <ArrowRightStartOnRectangleIcon className="h-6 w-6 stroke-red-500" />
      </div>
    </header>
  );
}

export default Header;
