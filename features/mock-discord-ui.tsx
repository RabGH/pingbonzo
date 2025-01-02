import {
  Cog,
  Gift,
  Headphones,
  HelpCircle,
  Inbox,
  Menu,
  Mic,
  Phone,
  Pin,
  Plus,
  PlusCircle,
  Search,
  Smile,
  Sticker,
  UserCircle,
  Video,
} from "lucide-react"
import { ReactNode } from "react"

import { Icons } from "@/components/icons"
import Image from "next/image"

export const MockDiscordUI = ({ children }: { children: ReactNode }) => {
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
      <div className="hidden lg:flex w-60 bg-discord-third-color flex-col">
        <div className="px-4 h-16 border-b border-discord-secondary-color flex items-center shadow-sm">
          <div className="w-full bg-discord-secondary-color text-sm rounded px-2 flex items-center h-8 justify-center text-gray-500 cursor-not-allowed">
            Find or start a conversation
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">
          <div className="px-2 mb-4">
            <div className="group flex items-center text-sm px-2 py-1.5 rounded hover:bg-discord-fourth-color text-discord-fifth-color cursor-not-allowed transition-all duration-200">
              <UserCircle className="mr-4 size-8 text-discord-offwhite-color group-hover:text-white transition-all duration-200" />
              <span className="font-medium text-sm group-hover:text-white transition-all duration-200">
                Friends
              </span>
            </div>
            <div className="group flex items-center text-sm px-2 py-1.5 rounded hover:bg-discord-fourth-color text-discord-fifth-color cursor-not-allowed transition-all duration-200">
              <Inbox className="mr-4 size-8 text-discord-offwhite-color group-hover:text-white transition-all duration-200" />
              <span className="font-medium text-sm group-hover:text-white transition-all duration-200">
                Nitro
              </span>
            </div>
          </div>

          <div className="px-2 mb-4">
            <h3 className="text-xs font-semibold text-discord-seventh-color px-2 mb-2 uppercase">
              Direct Messages
            </h3>
            <div className="flex items-center rounded px-2 py-1.5 bg-discord-fourth-color text-white cursor-pointer">
              <Image
                src={"/brand-asset-profile-picture.png"}
                alt="PingBonzo Avatar"
                width={32}
                height={32}
                className="object-cover rounded-full mr-3"
              />
              <span className="font-medium">PingBonzo</span>
            </div>

            <div className="my-1 space-y-px">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center px-2 py-1.5 rounded text-gray-600 cursor-not-allowed"
                >
                  <div className="size-8 rounded-full bg-discord-background mr-3" />
                  <span className="font-medium">User {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-2 bg-discord-eighth-color flex items-center">
          <div className="size-8 rounded-full bg-brand-700 mr-2" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">You</p>
            <p className="text-xs text-discord-offwhite-color flex items-center">
              @your_account
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Mic className="size-5 text-discord-offwhite-color hover:text-white cursor-not-allowed transition-all duration-200" />
            <Headphones className="size-5 text-discord-offwhite-color hover:text-white cursor-not-allowed transition-all duration-200" />
            <Cog className="size-5 text-discord-offwhite-color hover:text-white cursor-not-allowed transition-all duration-200" />
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="flex-1 flex flex-col">
        {/* dm header */}
        <div className="h-16 bg-discord-ninth-color flex items-center px-4 shadow-sm border-b border-discord-secondary-color">
          <div className="md:hidden mr-4">
            <Menu className="size-6 text-discord-offwhite-color hover:text-white cursor-pointer transition-all duration-200" />
          </div>

          <div className="flex items-center">
            <div className="relative">
              <Image
                src={"/brand-asset-profile-picture.png"}
                alt="PingBonzo Avatar"
                width={40}
                height={40}
                className="object-cover rounded-full mr-3"
              />
              <div className="absolute bottom-0 right-3 size-3 bg-green-500 rounded-full border-2 border-discord-ninth-color" />
            </div>

            <p className="font-semibold text-white">PingBonzo</p>
          </div>

          <div className="ml-auto flex items-center space-x-4 text-discord-offwhite-color">
            <Phone className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
            <Video className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
            <Pin className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
            <UserCircle className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
            <Search className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
            <Inbox className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
            <HelpCircle className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
          </div>
        </div>
        {/* message history */}
        <div className="flex-1 overflow-y-auto p-4 bg-discord-background flex flex-col-reverse">
          {children}
        </div>

        {/* message input */}
        <div className="p-4">
          <div className="flex items-center bg-discord-tenth-color rounded-lg p-1">
            <PlusCircle className="mx-3 text-discord-offwhite-color hover:text-white cursor-not-allowed transition-all duration-200" />
            <input
              readOnly
              type="text"
              placeholder="Message @PingBonzo"
              className="flex-1 bg-transparent py-2.5 px-1 text-white placeholder-discord-eleventh-color focus:outline-none cursor-not-allowed"
            />
            <div className="flex items-center space-x-3 mx-3 text-discord-offwhite-color">
              <Gift className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
              <Sticker className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
              <Smile className="size-5 hover:text-white cursor-not-allowed hidden sm:block transition-all duration-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
