"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  gradient: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Brittany Kaiser",
    title: "CEO, Board Member",
    bio: "Brittany Kaiser is a serial entrepreneur and globally recognized expert in technology and legislative reform, having spent most of her career advising governments and companies on policy and strategy.",
    image: "/assets/leadership/Brittany-Kaiser-1.jpg",
    gradient:
      "linear-gradient(to bottom right, #1a1a2e 14.64%, #2d1f3d 85.36%)",
  },
  {
    name: "Enzo Villani",
    title: "CIO, Board Member",
    bio: "Enzo Villani is the Founder, CEO, and Chief Investment Officer of Alpha Transform Holdings (ATH), a fintech, AI, media, and digital asset investment and advisory firm.",
    image: "/assets/leadership/Enzo-Villani-1.png",
    gradient:
      "linear-gradient(to bottom right, #2d1f3d 14.64%, #1a1a2e 85.36%)",
  },
  {
    name: "Yury Mitin",
    title: "Partner, CBDO",
    bio: "Yury Mitin is the Managing Partner at RSV Capital, a global investment firm based in Toronto, Canada that specializes in late-stage investments in high-growth technology companies.",
    image: "/assets/leadership/Yury-Mitin-1.png",
    gradient:
      "linear-gradient(to bottom right, #1a1a2e 14.64%, #2d1f3d 85.36%)",
  },
];

export default function Leadership() {
  const { elementRef, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <section
      id="leadership"
      ref={elementRef}
      className={`w-full py-16 md:py-24 bg-alphaton-dark transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-12 md:gap-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">
          Leadership
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
          {teamMembers.map((member, index) => {
            const { elementRef: cardRef, isVisible: cardVisible } =
              useScrollAnimation({
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
              });

            return (
              <article
                key={index}
                ref={cardRef}
                className={`flex flex-col overflow-hidden rounded-3xl border border-white/10 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 hover:border-white/20 transition-all duration-700 ease-out ${
                  cardVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  background: member.gradient,
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="relative w-full aspect-[1/1]">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:gap-4 p-4 sm:p-6 md:p-8">
                  <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 sm:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-white/90">
                      {member.title}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
