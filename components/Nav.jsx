"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProvider } from "next-auth/react";
import Image from "next/image";
const Nav = () => {
  const isuserloggedin = true;
  
  const [providers, setProviders] = useState(null);
  const [ToggleDropDown, setToggleDropDown] = useState(null);
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProvider();
      setProviders(response);
    };
    setProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flx-center">
        <Image src="/assets/images/logo.svg" width={30} height={30}></Image>
        <p className="logo_text" /> prompt
      </Link>
      <div className="sm:flex hidden">
        {isuserloggedin ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-promp" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/public/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt
                profile
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((providers) => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        { (
          <div className="flex">
            <Image
              // src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev)=> !prev)}
            />

            {ToggleDropDown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )  (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
