import React from "react";

export default function Home() {
  return (
    <>
      <section className="relative bg-[#070a10] min-h-screen flex justify-center items-center overflow-hidden">
        <div className="relative mx-auto max-w-5xl text-center text-white">
          {/* Glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full
        bg-[radial-gradient(circle,rgb(0,27,136)_0%,transparent_70%)] blur-2xl"
          />

          {/* Text */}
          <h1 className="relative z-10 font-serif text-6xl leading-tight md:text-8xl">
            ANONIX
          </h1>

          <h1 className="relative z-10 font-serif text-6xl leading-tight md:text-8xl">
            SPEAK FREELY, READ HONESTLY.
          </h1>

          <p className="relative z-10 mx-auto mt-6 max-w-xl text-sm text-gray-300">
            Share your thoughts, receive anonymous feedback, and discover what
            people really think no filters, no limits.
          </p>

          <p className="relative z-10 mt-2 text-sm text-gray-400">
            Your privacy is protected. Your voice is heard. Your messages are
            truly anonymous.
          </p>
        </div>
      </section>
    </>
  );
}
