import MenuItems from "../utils/menuitems.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { _requestAccount } from "../utils/utils.js";

export const Navbar = () => {
  const router = useRouter();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const init = async () => {
        await connectWallet();
    };
    init();
  }, []);

  async function connectWallet() {
    try {
        const player = await _requestAccount();
        setPlayer(player);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="bg-gray-800 p-2 mt-0 sticky fixed w-full z-10 top-0">
        <div className="container mx-auto flex flex-wrap items-center">
            <div className="flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold">
                <a className="text-white no-underline hover:text-white hover:no-underline" href="#">
                <span className="text-2xl pl-2">Web3 Adventure</span>
                </a>
            </div>
            <div className="flex w-full pt-2 content-center justify-between md:w-1/2 md:justify-end">
                <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                    {MenuItems.map((item, i) => {
                        return (
                        <li className="mr-3 w-1/2 flex justify-center" key={i}>
                            <Link href={item.url}>
                            <a className={`text-gray-300 py-2 px-3 rounded-md text-sm font-medium no-underline hover:text-white hover:bg-gray-700 hover:text-underline  ${
                                router.asPath === item.url
                                    ? "text-white bg-gray-900 hover:bg-gray-900"
                                    : "text-gray-300"
                                }`}
                            >
                                {item.label}
                            </a>
                            </Link>
                        </li>
                        );
                    })}
                </ul>
                <button onClick={connectWallet} className="p-4 font-extrabold text-gray-300 justify-center bg-gradient-to-tr from-gray-900 to-green-900 hover:from-gray-900 hover:to-green-800 rounded-md shadow-lg shadow-indigo-500/40 hover:shadow-none">
                    {player ? <span>{player.slice(-4)}</span> : <span>Connect Wallet</span>}
                </button>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;