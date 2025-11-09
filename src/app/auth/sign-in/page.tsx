import Signin from "@/components/Auth/Signin";

import Prism from "@/components/ui/Prism";

import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign in",
};

export default function SignIn() {
  return (
    <>
      <section className=" h-screen overflow-hidden">
        <div className="absolute inset-0 h-full">
          <div
            style={{
              width: "100%",
              position: "relative",
              backgroundColor: "#000",
            }}
           className="h-full">
            <Prism
              animationType="rotate"
              timeScale={0.5}
              height={3.5}
              baseWidth={5.5}
              scale={3.6}
              hueShift={0}
              colorFrequency={1}
              noise={0.5}
              glow={1}
            />
          </div>
        </div>
        <div className="container mx-auto grid place-items-center h-full">
          <div className="bg-white-glass glass z-9 w-1/3 p-5 rounded-3xl shadow-dark shadow-lg">
            <Signin />
          </div>
        </div>
      </section>
    </>
  );
}
