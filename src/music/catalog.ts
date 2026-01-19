


export type SoundChoice =
  | "rain"
  | "ocean"
  | "campfire"
  | "silence"
  | "brown"
  | "pink"
  | "lofi"
  | "white"

export const SOUND_SOURCES: Record<SoundChoice, string[]> = {
  rain: ["/misc/rain.mp3"],
  ocean: ["/misc/waves.mp3"],
  campfire: ["/misc/fireplace.mp3"],

  brown: ["/noise/Brown.mp3"],
  pink: ["/noise/Pink.mp3"],
  white: ["/noise/White.mp3"],

  lofi: [
    '/lofi/lofi1.mp3',
    '/lofi/lofi2.mp3',
    '/lofi/lofi3.mp3',
  ],

  silence: [],
}

