import { Inbox, Plus, UserCircle } from "lucide-react"
import { PropsWithChildren } from "react"

import { Icons } from "@/components/icons"
import Image from "next/image"

export const MockDiscordUI = ({
  children,
}: {
  children: PropsWithChildren
}) => {
  return (
    <div className="flex min-h-[800px] w-full max-w-[1200px] bg-discord-background text-white rounded-lg overflow-hidden shadow-xl">
      {/* server list */}
      <div className="hidden sm:flex w-[72px] bg-discord-secondary-color py-3 flex-col items-center">
        <div className="size-12 bg-discord-brand-color rounded-2xl flex items-center justify-center mb-2 hover:rounded-xl transition-all duration-200">
          <Icons.discord className="size-3/5 text-white" />
        </div>

        <div className="w-8 h-[2px] bg-discord-background rounded-full my-2" />

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-brand-color cursor-not-allowed group"
          >
            <span className="text-lg font-semibold text-gray-400 group-hover:text-white transition-all duration-200">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}
        <div className="size-12 bg-discord-background rounded-3xl flex items-center justify-center mb-3 hover:rounded-xl transition-all duration-200 hover:bg-discord-green-color cursor-not-allowed group mt-auto">
          <Plus className="text-discord-green-color  group-hover:text-white transition-all duration-200" />
        </div>
      </div>
      {/* DM list */}
      <div className="hidden md:flex w-60 bg-discord-third-color flex-col">
        <div className="px-4 h-16 border-b border-discord-secondary-color flex items-center shadow-sm">
          <div className="w-full bg-discord-secondary-color text-sm rounded px-2 flex items-center h-8 justify-center text-gray-500 cursor-not-allowed">
            Find or start a conversation
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">
          <div className="px-2 mb-4">
            <div className="group flex items-center text-sm px-2 py-1.5 rounded hover:bg-discord-fourth-color text-discord-fifth-color cursor-not-allowed transition-all duration-200">
              <UserCircle className="mr-4 size-8 text-discord-sixth-color group-hover:text-white transition-all duration-200" />
              <span className="font-medium text-sm group-hover:text-white transition-all duration-200">
                Friends
              </span>
            </div>
            <div className="group flex items-center text-sm px-2 py-1.5 rounded hover:bg-discord-fourth-color text-discord-fifth-color cursor-not-allowed transition-all duration-200">
              <Inbox className="mr-4 size-8 text-discord-sixth-color group-hover:text-white transition-all duration-200" />
              <span className="font-medium text-sm group-hover:text-white transition-all duration-200">
                Nitro
              </span>
            </div>
          </div>

          <div className="px-2 mb-4">
            <h3 className="text-xs font-semibold text-discord-seventh-color px-2 mb-2 uppercase">
              Direct Messages
            </h3>
            <div className="flex items-center px-2 py-1.5 bg-discord-fourth-color text-white cursor-pointer">
              <Image
                src={"/brand-asset-profile-picture.png"}
                alt="PingBonzo Avatar"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
