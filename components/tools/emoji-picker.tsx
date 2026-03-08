"use client";

import { useCallback, useMemo, useState } from "react";
import { cx } from "@/lib/utils";
import { useTheme } from "@/components/layout/theme-provider";

/* ── Types ──────────────────────────────────────────── */

type EmojiCategory =
  | "Smileys"
  | "People"
  | "Animals"
  | "Food"
  | "Travel"
  | "Objects"
  | "Symbols"
  | "Flags";

interface EmojiEntry {
  emoji: string;
  name: string;
  category: EmojiCategory;
  shortcode: string;
}

const CATEGORIES: EmojiCategory[] = [
  "Smileys",
  "People",
  "Animals",
  "Food",
  "Travel",
  "Objects",
  "Symbols",
  "Flags",
];

/* ── Emoji Data (~300 popular emojis) ───────────────── */

const EMOJIS: EmojiEntry[] = [
  // Smileys (~40)
  { emoji: "\u{1F600}", name: "Grinning Face", category: "Smileys", shortcode: ":grinning:" },
  { emoji: "\u{1F601}", name: "Beaming Face with Smiling Eyes", category: "Smileys", shortcode: ":grin:" },
  { emoji: "\u{1F602}", name: "Face with Tears of Joy", category: "Smileys", shortcode: ":joy:" },
  { emoji: "\u{1F923}", name: "Rolling on the Floor Laughing", category: "Smileys", shortcode: ":rofl:" },
  { emoji: "\u{1F603}", name: "Grinning Face with Big Eyes", category: "Smileys", shortcode: ":smiley:" },
  { emoji: "\u{1F604}", name: "Grinning Face with Squinting Eyes", category: "Smileys", shortcode: ":smile:" },
  { emoji: "\u{1F605}", name: "Grinning Face with Sweat", category: "Smileys", shortcode: ":sweat_smile:" },
  { emoji: "\u{1F606}", name: "Squinting Face with Open Mouth", category: "Smileys", shortcode: ":laughing:" },
  { emoji: "\u{1F609}", name: "Winking Face", category: "Smileys", shortcode: ":wink:" },
  { emoji: "\u{1F60A}", name: "Smiling Face with Smiling Eyes", category: "Smileys", shortcode: ":blush:" },
  { emoji: "\u{1F60B}", name: "Face Savoring Food", category: "Smileys", shortcode: ":yum:" },
  { emoji: "\u{1F60E}", name: "Smiling Face with Sunglasses", category: "Smileys", shortcode: ":sunglasses:" },
  { emoji: "\u{1F60D}", name: "Smiling Face with Heart-Eyes", category: "Smileys", shortcode: ":heart_eyes:" },
  { emoji: "\u{1F618}", name: "Face Blowing a Kiss", category: "Smileys", shortcode: ":kissing_heart:" },
  { emoji: "\u{1F617}", name: "Kissing Face", category: "Smileys", shortcode: ":kissing:" },
  { emoji: "\u{1F619}", name: "Kissing Face with Smiling Eyes", category: "Smileys", shortcode: ":kissing_smiling_eyes:" },
  { emoji: "\u{1F61A}", name: "Kissing Face with Closed Eyes", category: "Smileys", shortcode: ":kissing_closed_eyes:" },
  { emoji: "\u{1F642}", name: "Slightly Smiling Face", category: "Smileys", shortcode: ":slightly_smiling_face:" },
  { emoji: "\u{1F917}", name: "Hugging Face", category: "Smileys", shortcode: ":hugs:" },
  { emoji: "\u{1F914}", name: "Thinking Face", category: "Smileys", shortcode: ":thinking:" },
  { emoji: "\u{1F610}", name: "Neutral Face", category: "Smileys", shortcode: ":neutral_face:" },
  { emoji: "\u{1F611}", name: "Expressionless Face", category: "Smileys", shortcode: ":expressionless:" },
  { emoji: "\u{1F636}", name: "Face Without Mouth", category: "Smileys", shortcode: ":no_mouth:" },
  { emoji: "\u{1F644}", name: "Face with Rolling Eyes", category: "Smileys", shortcode: ":roll_eyes:" },
  { emoji: "\u{1F60F}", name: "Smirking Face", category: "Smileys", shortcode: ":smirk:" },
  { emoji: "\u{1F623}", name: "Persevering Face", category: "Smileys", shortcode: ":persevere:" },
  { emoji: "\u{1F625}", name: "Sad but Relieved Face", category: "Smileys", shortcode: ":disappointed_relieved:" },
  { emoji: "\u{1F62E}", name: "Face with Open Mouth", category: "Smileys", shortcode: ":open_mouth:" },
  { emoji: "\u{1F910}", name: "Zipper-Mouth Face", category: "Smileys", shortcode: ":zipper_mouth:" },
  { emoji: "\u{1F62C}", name: "Grimacing Face", category: "Smileys", shortcode: ":grimacing:" },
  { emoji: "\u{1F62A}", name: "Sleepy Face", category: "Smileys", shortcode: ":sleepy:" },
  { emoji: "\u{1F634}", name: "Sleeping Face", category: "Smileys", shortcode: ":sleeping:" },
  { emoji: "\u{1F637}", name: "Face with Medical Mask", category: "Smileys", shortcode: ":mask:" },
  { emoji: "\u{1F912}", name: "Face with Thermometer", category: "Smileys", shortcode: ":thermometer_face:" },
  { emoji: "\u{1F915}", name: "Face with Head-Bandage", category: "Smileys", shortcode: ":head_bandage:" },
  { emoji: "\u{1F621}", name: "Pouting Face", category: "Smileys", shortcode: ":rage:" },
  { emoji: "\u{1F620}", name: "Angry Face", category: "Smileys", shortcode: ":angry:" },
  { emoji: "\u{1F608}", name: "Smiling Face with Horns", category: "Smileys", shortcode: ":smiling_imp:" },
  { emoji: "\u{1F47F}", name: "Angry Face with Horns", category: "Smileys", shortcode: ":imp:" },
  { emoji: "\u{1F480}", name: "Skull", category: "Smileys", shortcode: ":skull:" },
  { emoji: "\u{1F4A9}", name: "Pile of Poo", category: "Smileys", shortcode: ":poop:" },
  { emoji: "\u{1F921}", name: "Clown Face", category: "Smileys", shortcode: ":clown:" },
  { emoji: "\u{1F631}", name: "Face Screaming in Fear", category: "Smileys", shortcode: ":scream:" },
  { emoji: "\u{1F62D}", name: "Loudly Crying Face", category: "Smileys", shortcode: ":sob:" },

  // People (~40)
  { emoji: "\u{1F44D}", name: "Thumbs Up", category: "People", shortcode: ":thumbsup:" },
  { emoji: "\u{1F44E}", name: "Thumbs Down", category: "People", shortcode: ":thumbsdown:" },
  { emoji: "\u{1F44A}", name: "Oncoming Fist", category: "People", shortcode: ":fist:" },
  { emoji: "\u{270A}", name: "Raised Fist", category: "People", shortcode: ":raised_fist:" },
  { emoji: "\u{270C}\u{FE0F}", name: "Victory Hand", category: "People", shortcode: ":v:" },
  { emoji: "\u{1F44B}", name: "Waving Hand", category: "People", shortcode: ":wave:" },
  { emoji: "\u{1F91A}", name: "Raised Back of Hand", category: "People", shortcode: ":raised_back_of_hand:" },
  { emoji: "\u{1F446}", name: "Backhand Index Pointing Up", category: "People", shortcode: ":point_up_2:" },
  { emoji: "\u{1F447}", name: "Backhand Index Pointing Down", category: "People", shortcode: ":point_down:" },
  { emoji: "\u{261D}\u{FE0F}", name: "Index Pointing Up", category: "People", shortcode: ":point_up:" },
  { emoji: "\u{1F448}", name: "Backhand Index Pointing Left", category: "People", shortcode: ":point_left:" },
  { emoji: "\u{1F449}", name: "Backhand Index Pointing Right", category: "People", shortcode: ":point_right:" },
  { emoji: "\u{1F44F}", name: "Clapping Hands", category: "People", shortcode: ":clap:" },
  { emoji: "\u{1F64C}", name: "Raising Hands", category: "People", shortcode: ":raised_hands:" },
  { emoji: "\u{1F450}", name: "Open Hands", category: "People", shortcode: ":open_hands:" },
  { emoji: "\u{1F4AA}", name: "Flexed Biceps", category: "People", shortcode: ":muscle:" },
  { emoji: "\u{1F64F}", name: "Folded Hands", category: "People", shortcode: ":pray:" },
  { emoji: "\u{1F91D}", name: "Handshake", category: "People", shortcode: ":handshake:" },
  { emoji: "\u{270D}\u{FE0F}", name: "Writing Hand", category: "People", shortcode: ":writing_hand:" },
  { emoji: "\u{1F485}", name: "Nail Polish", category: "People", shortcode: ":nail_care:" },
  { emoji: "\u{1F933}", name: "Selfie", category: "People", shortcode: ":selfie:" },
  { emoji: "\u{1F466}", name: "Boy", category: "People", shortcode: ":boy:" },
  { emoji: "\u{1F467}", name: "Girl", category: "People", shortcode: ":girl:" },
  { emoji: "\u{1F468}", name: "Man", category: "People", shortcode: ":man:" },
  { emoji: "\u{1F469}", name: "Woman", category: "People", shortcode: ":woman:" },
  { emoji: "\u{1F474}", name: "Old Man", category: "People", shortcode: ":older_man:" },
  { emoji: "\u{1F475}", name: "Old Woman", category: "People", shortcode: ":older_woman:" },
  { emoji: "\u{1F476}", name: "Baby", category: "People", shortcode: ":baby:" },
  { emoji: "\u{1F47C}", name: "Baby Angel", category: "People", shortcode: ":angel:" },
  { emoji: "\u{1F385}", name: "Santa Claus", category: "People", shortcode: ":santa:" },
  { emoji: "\u{1F478}", name: "Princess", category: "People", shortcode: ":princess:" },
  { emoji: "\u{1F934}", name: "Prince", category: "People", shortcode: ":prince:" },
  { emoji: "\u{1F470}", name: "Person with Veil", category: "People", shortcode: ":bride_with_veil:" },
  { emoji: "\u{1F935}", name: "Person in Tuxedo", category: "People", shortcode: ":person_in_tuxedo:" },
  { emoji: "\u{1F936}", name: "Mrs. Claus", category: "People", shortcode: ":mrs_claus:" },
  { emoji: "\u{1F926}", name: "Person Facepalming", category: "People", shortcode: ":facepalm:" },
  { emoji: "\u{1F937}", name: "Person Shrugging", category: "People", shortcode: ":shrug:" },
  { emoji: "\u{1F483}", name: "Woman Dancing", category: "People", shortcode: ":dancer:" },
  { emoji: "\u{1F57A}", name: "Man Dancing", category: "People", shortcode: ":man_dancing:" },
  { emoji: "\u{1F918}", name: "Sign of the Horns", category: "People", shortcode: ":metal:" },

  // Animals (~35)
  { emoji: "\u{1F436}", name: "Dog Face", category: "Animals", shortcode: ":dog:" },
  { emoji: "\u{1F431}", name: "Cat Face", category: "Animals", shortcode: ":cat:" },
  { emoji: "\u{1F42D}", name: "Mouse Face", category: "Animals", shortcode: ":mouse:" },
  { emoji: "\u{1F439}", name: "Hamster", category: "Animals", shortcode: ":hamster:" },
  { emoji: "\u{1F430}", name: "Rabbit Face", category: "Animals", shortcode: ":rabbit:" },
  { emoji: "\u{1F43B}", name: "Bear", category: "Animals", shortcode: ":bear:" },
  { emoji: "\u{1F43C}", name: "Panda", category: "Animals", shortcode: ":panda_face:" },
  { emoji: "\u{1F428}", name: "Koala", category: "Animals", shortcode: ":koala:" },
  { emoji: "\u{1F42F}", name: "Tiger Face", category: "Animals", shortcode: ":tiger:" },
  { emoji: "\u{1F981}", name: "Lion", category: "Animals", shortcode: ":lion:" },
  { emoji: "\u{1F42E}", name: "Cow Face", category: "Animals", shortcode: ":cow:" },
  { emoji: "\u{1F437}", name: "Pig Face", category: "Animals", shortcode: ":pig:" },
  { emoji: "\u{1F438}", name: "Frog", category: "Animals", shortcode: ":frog:" },
  { emoji: "\u{1F435}", name: "Monkey Face", category: "Animals", shortcode: ":monkey_face:" },
  { emoji: "\u{1F412}", name: "Monkey", category: "Animals", shortcode: ":monkey:" },
  { emoji: "\u{1F414}", name: "Chicken", category: "Animals", shortcode: ":chicken:" },
  { emoji: "\u{1F427}", name: "Penguin", category: "Animals", shortcode: ":penguin:" },
  { emoji: "\u{1F426}", name: "Bird", category: "Animals", shortcode: ":bird:" },
  { emoji: "\u{1F424}", name: "Baby Chick", category: "Animals", shortcode: ":baby_chick:" },
  { emoji: "\u{1F986}", name: "Duck", category: "Animals", shortcode: ":duck:" },
  { emoji: "\u{1F985}", name: "Eagle", category: "Animals", shortcode: ":eagle:" },
  { emoji: "\u{1F989}", name: "Owl", category: "Animals", shortcode: ":owl:" },
  { emoji: "\u{1F987}", name: "Bat", category: "Animals", shortcode: ":bat:" },
  { emoji: "\u{1F43A}", name: "Wolf", category: "Animals", shortcode: ":wolf:" },
  { emoji: "\u{1F417}", name: "Boar", category: "Animals", shortcode: ":boar:" },
  { emoji: "\u{1F434}", name: "Horse Face", category: "Animals", shortcode: ":horse:" },
  { emoji: "\u{1F984}", name: "Unicorn", category: "Animals", shortcode: ":unicorn:" },
  { emoji: "\u{1F41D}", name: "Honeybee", category: "Animals", shortcode: ":bee:" },
  { emoji: "\u{1F41B}", name: "Bug", category: "Animals", shortcode: ":bug:" },
  { emoji: "\u{1F40C}", name: "Snail", category: "Animals", shortcode: ":snail:" },
  { emoji: "\u{1F98B}", name: "Butterfly", category: "Animals", shortcode: ":butterfly:" },
  { emoji: "\u{1F422}", name: "Turtle", category: "Animals", shortcode: ":turtle:" },
  { emoji: "\u{1F40D}", name: "Snake", category: "Animals", shortcode: ":snake:" },
  { emoji: "\u{1F419}", name: "Octopus", category: "Animals", shortcode: ":octopus:" },
  { emoji: "\u{1F420}", name: "Tropical Fish", category: "Animals", shortcode: ":tropical_fish:" },

  // Food (~35)
  { emoji: "\u{1F34E}", name: "Red Apple", category: "Food", shortcode: ":apple:" },
  { emoji: "\u{1F34A}", name: "Tangerine", category: "Food", shortcode: ":tangerine:" },
  { emoji: "\u{1F34B}", name: "Lemon", category: "Food", shortcode: ":lemon:" },
  { emoji: "\u{1F34C}", name: "Banana", category: "Food", shortcode: ":banana:" },
  { emoji: "\u{1F349}", name: "Watermelon", category: "Food", shortcode: ":watermelon:" },
  { emoji: "\u{1F347}", name: "Grapes", category: "Food", shortcode: ":grapes:" },
  { emoji: "\u{1F353}", name: "Strawberry", category: "Food", shortcode: ":strawberry:" },
  { emoji: "\u{1F351}", name: "Peach", category: "Food", shortcode: ":peach:" },
  { emoji: "\u{1F352}", name: "Cherries", category: "Food", shortcode: ":cherries:" },
  { emoji: "\u{1F34D}", name: "Pineapple", category: "Food", shortcode: ":pineapple:" },
  { emoji: "\u{1F95D}", name: "Kiwi Fruit", category: "Food", shortcode: ":kiwi:" },
  { emoji: "\u{1F951}", name: "Avocado", category: "Food", shortcode: ":avocado:" },
  { emoji: "\u{1F345}", name: "Tomato", category: "Food", shortcode: ":tomato:" },
  { emoji: "\u{1F955}", name: "Carrot", category: "Food", shortcode: ":carrot:" },
  { emoji: "\u{1F33D}", name: "Ear of Corn", category: "Food", shortcode: ":corn:" },
  { emoji: "\u{1F336}\u{FE0F}", name: "Hot Pepper", category: "Food", shortcode: ":hot_pepper:" },
  { emoji: "\u{1F954}", name: "Potato", category: "Food", shortcode: ":potato:" },
  { emoji: "\u{1F35E}", name: "Bread", category: "Food", shortcode: ":bread:" },
  { emoji: "\u{1F950}", name: "Croissant", category: "Food", shortcode: ":croissant:" },
  { emoji: "\u{1F956}", name: "Baguette Bread", category: "Food", shortcode: ":baguette:" },
  { emoji: "\u{1F355}", name: "Pizza", category: "Food", shortcode: ":pizza:" },
  { emoji: "\u{1F354}", name: "Hamburger", category: "Food", shortcode: ":hamburger:" },
  { emoji: "\u{1F35F}", name: "French Fries", category: "Food", shortcode: ":fries:" },
  { emoji: "\u{1F32E}", name: "Taco", category: "Food", shortcode: ":taco:" },
  { emoji: "\u{1F32F}", name: "Burrito", category: "Food", shortcode: ":burrito:" },
  { emoji: "\u{1F363}", name: "Sushi", category: "Food", shortcode: ":sushi:" },
  { emoji: "\u{1F35C}", name: "Steaming Bowl", category: "Food", shortcode: ":ramen:" },
  { emoji: "\u{1F370}", name: "Shortcake", category: "Food", shortcode: ":cake:" },
  { emoji: "\u{1F36B}", name: "Chocolate Bar", category: "Food", shortcode: ":chocolate_bar:" },
  { emoji: "\u{1F369}", name: "Doughnut", category: "Food", shortcode: ":doughnut:" },
  { emoji: "\u{1F36A}", name: "Cookie", category: "Food", shortcode: ":cookie:" },
  { emoji: "\u{1F37A}", name: "Beer Mug", category: "Food", shortcode: ":beer:" },
  { emoji: "\u{1F377}", name: "Wine Glass", category: "Food", shortcode: ":wine_glass:" },
  { emoji: "\u{2615}", name: "Hot Beverage", category: "Food", shortcode: ":coffee:" },
  { emoji: "\u{1F375}", name: "Teacup Without Handle", category: "Food", shortcode: ":tea:" },

  // Travel (~35)
  { emoji: "\u{1F3E0}", name: "House", category: "Travel", shortcode: ":house:" },
  { emoji: "\u{1F3E2}", name: "Office Building", category: "Travel", shortcode: ":office:" },
  { emoji: "\u{1F3E5}", name: "Hospital", category: "Travel", shortcode: ":hospital:" },
  { emoji: "\u{1F3EB}", name: "School", category: "Travel", shortcode: ":school:" },
  { emoji: "\u{1F3EA}", name: "Convenience Store", category: "Travel", shortcode: ":convenience_store:" },
  { emoji: "\u{26EA}", name: "Church", category: "Travel", shortcode: ":church:" },
  { emoji: "\u{1F30D}", name: "Globe Europe-Africa", category: "Travel", shortcode: ":earth_africa:" },
  { emoji: "\u{1F30E}", name: "Globe Americas", category: "Travel", shortcode: ":earth_americas:" },
  { emoji: "\u{1F30F}", name: "Globe Asia-Australia", category: "Travel", shortcode: ":earth_asia:" },
  { emoji: "\u{1F5FA}\u{FE0F}", name: "World Map", category: "Travel", shortcode: ":world_map:" },
  { emoji: "\u{2708}\u{FE0F}", name: "Airplane", category: "Travel", shortcode: ":airplane:" },
  { emoji: "\u{1F680}", name: "Rocket", category: "Travel", shortcode: ":rocket:" },
  { emoji: "\u{1F6F8}", name: "Flying Saucer", category: "Travel", shortcode: ":flying_saucer:" },
  { emoji: "\u{1F697}", name: "Automobile", category: "Travel", shortcode: ":car:" },
  { emoji: "\u{1F695}", name: "Taxi", category: "Travel", shortcode: ":taxi:" },
  { emoji: "\u{1F68C}", name: "Bus", category: "Travel", shortcode: ":bus:" },
  { emoji: "\u{1F682}", name: "Locomotive", category: "Travel", shortcode: ":steam_locomotive:" },
  { emoji: "\u{1F6B2}", name: "Bicycle", category: "Travel", shortcode: ":bike:" },
  { emoji: "\u{1F6A2}", name: "Ship", category: "Travel", shortcode: ":ship:" },
  { emoji: "\u{26F5}", name: "Sailboat", category: "Travel", shortcode: ":sailboat:" },
  { emoji: "\u{1F3D6}\u{FE0F}", name: "Beach with Umbrella", category: "Travel", shortcode: ":beach:" },
  { emoji: "\u{1F3D4}\u{FE0F}", name: "Snow-Capped Mountain", category: "Travel", shortcode: ":mountain_snow:" },
  { emoji: "\u{26F0}\u{FE0F}", name: "Mountain", category: "Travel", shortcode: ":mountain:" },
  { emoji: "\u{1F3DD}\u{FE0F}", name: "Desert Island", category: "Travel", shortcode: ":desert_island:" },
  { emoji: "\u{1F3D9}\u{FE0F}", name: "Cityscape", category: "Travel", shortcode: ":cityscape:" },
  { emoji: "\u{1F307}", name: "Sunset", category: "Travel", shortcode: ":city_sunset:" },
  { emoji: "\u{1F305}", name: "Sunrise", category: "Travel", shortcode: ":sunrise:" },
  { emoji: "\u{1F304}", name: "Sunrise Over Mountains", category: "Travel", shortcode: ":sunrise_over_mountains:" },
  { emoji: "\u{2B50}", name: "Star", category: "Travel", shortcode: ":star:" },
  { emoji: "\u{1F31F}", name: "Glowing Star", category: "Travel", shortcode: ":star2:" },
  { emoji: "\u{1F308}", name: "Rainbow", category: "Travel", shortcode: ":rainbow:" },
  { emoji: "\u{2600}\u{FE0F}", name: "Sun", category: "Travel", shortcode: ":sunny:" },
  { emoji: "\u{1F327}\u{FE0F}", name: "Cloud with Rain", category: "Travel", shortcode: ":cloud_rain:" },
  { emoji: "\u{26A1}", name: "High Voltage", category: "Travel", shortcode: ":zap:" },
  { emoji: "\u{2744}\u{FE0F}", name: "Snowflake", category: "Travel", shortcode: ":snowflake:" },

  // Objects (~40)
  { emoji: "\u{2764}\u{FE0F}", name: "Red Heart", category: "Objects", shortcode: ":heart:" },
  { emoji: "\u{1F9E1}", name: "Orange Heart", category: "Objects", shortcode: ":orange_heart:" },
  { emoji: "\u{1F49B}", name: "Yellow Heart", category: "Objects", shortcode: ":yellow_heart:" },
  { emoji: "\u{1F49A}", name: "Green Heart", category: "Objects", shortcode: ":green_heart:" },
  { emoji: "\u{1F499}", name: "Blue Heart", category: "Objects", shortcode: ":blue_heart:" },
  { emoji: "\u{1F49C}", name: "Purple Heart", category: "Objects", shortcode: ":purple_heart:" },
  { emoji: "\u{1F5A4}", name: "Black Heart", category: "Objects", shortcode: ":black_heart:" },
  { emoji: "\u{1F494}", name: "Broken Heart", category: "Objects", shortcode: ":broken_heart:" },
  { emoji: "\u{1F495}", name: "Two Hearts", category: "Objects", shortcode: ":two_hearts:" },
  { emoji: "\u{1F496}", name: "Sparkling Heart", category: "Objects", shortcode: ":sparkling_heart:" },
  { emoji: "\u{1F4A5}", name: "Collision", category: "Objects", shortcode: ":boom:" },
  { emoji: "\u{1F4AB}", name: "Dizzy", category: "Objects", shortcode: ":dizzy:" },
  { emoji: "\u{1F4AF}", name: "Hundred Points", category: "Objects", shortcode: ":100:" },
  { emoji: "\u{1F525}", name: "Fire", category: "Objects", shortcode: ":fire:" },
  { emoji: "\u{1F4A7}", name: "Droplet", category: "Objects", shortcode: ":droplet:" },
  { emoji: "\u{1F3B5}", name: "Musical Note", category: "Objects", shortcode: ":musical_note:" },
  { emoji: "\u{1F3B6}", name: "Musical Notes", category: "Objects", shortcode: ":notes:" },
  { emoji: "\u{1F3A4}", name: "Microphone", category: "Objects", shortcode: ":microphone:" },
  { emoji: "\u{1F3A7}", name: "Headphone", category: "Objects", shortcode: ":headphones:" },
  { emoji: "\u{1F3B8}", name: "Guitar", category: "Objects", shortcode: ":guitar:" },
  { emoji: "\u{1F3B9}", name: "Musical Keyboard", category: "Objects", shortcode: ":musical_keyboard:" },
  { emoji: "\u{1F4F1}", name: "Mobile Phone", category: "Objects", shortcode: ":iphone:" },
  { emoji: "\u{1F4BB}", name: "Laptop", category: "Objects", shortcode: ":laptop:" },
  { emoji: "\u{1F5A5}\u{FE0F}", name: "Desktop Computer", category: "Objects", shortcode: ":desktop:" },
  { emoji: "\u{2328}\u{FE0F}", name: "Keyboard", category: "Objects", shortcode: ":keyboard:" },
  { emoji: "\u{1F4F7}", name: "Camera", category: "Objects", shortcode: ":camera:" },
  { emoji: "\u{1F4FA}", name: "Television", category: "Objects", shortcode: ":tv:" },
  { emoji: "\u{1F4E7}", name: "Email", category: "Objects", shortcode: ":email:" },
  { emoji: "\u{1F4D6}", name: "Open Book", category: "Objects", shortcode: ":book:" },
  { emoji: "\u{1F4DA}", name: "Books", category: "Objects", shortcode: ":books:" },
  { emoji: "\u{1F4DD}", name: "Memo", category: "Objects", shortcode: ":memo:" },
  { emoji: "\u{270F}\u{FE0F}", name: "Pencil", category: "Objects", shortcode: ":pencil2:" },
  { emoji: "\u{1F4CE}", name: "Paperclip", category: "Objects", shortcode: ":paperclip:" },
  { emoji: "\u{1F512}", name: "Locked", category: "Objects", shortcode: ":lock:" },
  { emoji: "\u{1F513}", name: "Unlocked", category: "Objects", shortcode: ":unlock:" },
  { emoji: "\u{1F511}", name: "Key", category: "Objects", shortcode: ":key:" },
  { emoji: "\u{1F528}", name: "Hammer", category: "Objects", shortcode: ":hammer:" },
  { emoji: "\u{1F4A1}", name: "Light Bulb", category: "Objects", shortcode: ":bulb:" },
  { emoji: "\u{1F3C6}", name: "Trophy", category: "Objects", shortcode: ":trophy:" },
  { emoji: "\u{1F381}", name: "Wrapped Gift", category: "Objects", shortcode: ":gift:" },

  // Symbols (~40)
  { emoji: "\u{2705}", name: "Check Mark Button", category: "Symbols", shortcode: ":white_check_mark:" },
  { emoji: "\u{274C}", name: "Cross Mark", category: "Symbols", shortcode: ":x:" },
  { emoji: "\u{274E}", name: "Cross Mark Button", category: "Symbols", shortcode: ":negative_squared_cross_mark:" },
  { emoji: "\u{2757}", name: "Exclamation Mark", category: "Symbols", shortcode: ":exclamation:" },
  { emoji: "\u{2753}", name: "Question Mark", category: "Symbols", shortcode: ":question:" },
  { emoji: "\u{2755}", name: "White Exclamation Mark", category: "Symbols", shortcode: ":grey_exclamation:" },
  { emoji: "\u{2754}", name: "White Question Mark", category: "Symbols", shortcode: ":grey_question:" },
  { emoji: "\u{203C}\u{FE0F}", name: "Double Exclamation Mark", category: "Symbols", shortcode: ":bangbang:" },
  { emoji: "\u{2049}\u{FE0F}", name: "Exclamation Question Mark", category: "Symbols", shortcode: ":interrobang:" },
  { emoji: "\u{1F4F4}", name: "Mobile Phone Off", category: "Symbols", shortcode: ":mobile_phone_off:" },
  { emoji: "\u{1F51E}", name: "No One Under Eighteen", category: "Symbols", shortcode: ":underage:" },
  { emoji: "\u{2795}", name: "Plus", category: "Symbols", shortcode: ":heavy_plus_sign:" },
  { emoji: "\u{2796}", name: "Minus", category: "Symbols", shortcode: ":heavy_minus_sign:" },
  { emoji: "\u{2797}", name: "Divide", category: "Symbols", shortcode: ":heavy_division_sign:" },
  { emoji: "\u{267B}\u{FE0F}", name: "Recycling Symbol", category: "Symbols", shortcode: ":recycle:" },
  { emoji: "\u{1F4B2}", name: "Heavy Dollar Sign", category: "Symbols", shortcode: ":heavy_dollar_sign:" },
  { emoji: "\u{1F4B0}", name: "Money Bag", category: "Symbols", shortcode: ":moneybag:" },
  { emoji: "\u{1F6AB}", name: "Prohibited", category: "Symbols", shortcode: ":no_entry_sign:" },
  { emoji: "\u{26D4}", name: "No Entry", category: "Symbols", shortcode: ":no_entry:" },
  { emoji: "\u{1F534}", name: "Red Circle", category: "Symbols", shortcode: ":red_circle:" },
  { emoji: "\u{1F535}", name: "Blue Circle", category: "Symbols", shortcode: ":large_blue_circle:" },
  { emoji: "\u{26AA}", name: "White Circle", category: "Symbols", shortcode: ":white_circle:" },
  { emoji: "\u{26AB}", name: "Black Circle", category: "Symbols", shortcode: ":black_circle:" },
  { emoji: "\u{1F7E2}", name: "Green Circle", category: "Symbols", shortcode: ":green_circle:" },
  { emoji: "\u{1F7E1}", name: "Yellow Circle", category: "Symbols", shortcode: ":yellow_circle:" },
  { emoji: "\u{1F7E0}", name: "Orange Circle", category: "Symbols", shortcode: ":orange_circle:" },
  { emoji: "\u{1F7E3}", name: "Purple Circle", category: "Symbols", shortcode: ":purple_circle:" },
  { emoji: "\u{2B55}", name: "Hollow Red Circle", category: "Symbols", shortcode: ":o:" },
  { emoji: "\u{1F197}", name: "OK Button", category: "Symbols", shortcode: ":ok:" },
  { emoji: "\u{1F192}", name: "COOL Button", category: "Symbols", shortcode: ":cool:" },
  { emoji: "\u{1F195}", name: "NEW Button", category: "Symbols", shortcode: ":new:" },
  { emoji: "\u{1F193}", name: "FREE Button", category: "Symbols", shortcode: ":free:" },
  { emoji: "\u{1F199}", name: "UP! Button", category: "Symbols", shortcode: ":up:" },
  { emoji: "\u{1F198}", name: "SOS Button", category: "Symbols", shortcode: ":sos:" },
  { emoji: "\u{1F4A4}", name: "Zzz", category: "Symbols", shortcode: ":zzz:" },
  { emoji: "\u{1F4AC}", name: "Speech Balloon", category: "Symbols", shortcode: ":speech_balloon:" },
  { emoji: "\u{1F4AD}", name: "Thought Balloon", category: "Symbols", shortcode: ":thought_balloon:" },
  { emoji: "\u{269B}\u{FE0F}", name: "Atom Symbol", category: "Symbols", shortcode: ":atom:" },
  { emoji: "\u{2622}\u{FE0F}", name: "Radioactive", category: "Symbols", shortcode: ":radioactive:" },
  { emoji: "\u{2623}\u{FE0F}", name: "Biohazard", category: "Symbols", shortcode: ":biohazard:" },

  // Flags (~35)
  { emoji: "\u{1F1FA}\u{1F1F8}", name: "United States", category: "Flags", shortcode: ":us:" },
  { emoji: "\u{1F1EC}\u{1F1E7}", name: "United Kingdom", category: "Flags", shortcode: ":gb:" },
  { emoji: "\u{1F1E8}\u{1F1E6}", name: "Canada", category: "Flags", shortcode: ":canada:" },
  { emoji: "\u{1F1E6}\u{1F1FA}", name: "Australia", category: "Flags", shortcode: ":australia:" },
  { emoji: "\u{1F1E9}\u{1F1EA}", name: "Germany", category: "Flags", shortcode: ":de:" },
  { emoji: "\u{1F1EB}\u{1F1F7}", name: "France", category: "Flags", shortcode: ":fr:" },
  { emoji: "\u{1F1EA}\u{1F1F8}", name: "Spain", category: "Flags", shortcode: ":es:" },
  { emoji: "\u{1F1EE}\u{1F1F9}", name: "Italy", category: "Flags", shortcode: ":it:" },
  { emoji: "\u{1F1F5}\u{1F1F9}", name: "Portugal", category: "Flags", shortcode: ":portugal:" },
  { emoji: "\u{1F1E7}\u{1F1F7}", name: "Brazil", category: "Flags", shortcode: ":brazil:" },
  { emoji: "\u{1F1F2}\u{1F1FD}", name: "Mexico", category: "Flags", shortcode: ":mexico:" },
  { emoji: "\u{1F1E6}\u{1F1F7}", name: "Argentina", category: "Flags", shortcode: ":argentina:" },
  { emoji: "\u{1F1EF}\u{1F1F5}", name: "Japan", category: "Flags", shortcode: ":jp:" },
  { emoji: "\u{1F1F0}\u{1F1F7}", name: "South Korea", category: "Flags", shortcode: ":kr:" },
  { emoji: "\u{1F1E8}\u{1F1F3}", name: "China", category: "Flags", shortcode: ":cn:" },
  { emoji: "\u{1F1EE}\u{1F1F3}", name: "India", category: "Flags", shortcode: ":india:" },
  { emoji: "\u{1F1F7}\u{1F1FA}", name: "Russia", category: "Flags", shortcode: ":ru:" },
  { emoji: "\u{1F1F3}\u{1F1F1}", name: "Netherlands", category: "Flags", shortcode: ":netherlands:" },
  { emoji: "\u{1F1F8}\u{1F1EA}", name: "Sweden", category: "Flags", shortcode: ":sweden:" },
  { emoji: "\u{1F1F3}\u{1F1F4}", name: "Norway", category: "Flags", shortcode: ":norway:" },
  { emoji: "\u{1F1E9}\u{1F1F0}", name: "Denmark", category: "Flags", shortcode: ":denmark:" },
  { emoji: "\u{1F1EB}\u{1F1EE}", name: "Finland", category: "Flags", shortcode: ":finland:" },
  { emoji: "\u{1F1EE}\u{1F1EA}", name: "Ireland", category: "Flags", shortcode: ":ireland:" },
  { emoji: "\u{1F1E8}\u{1F1ED}", name: "Switzerland", category: "Flags", shortcode: ":switzerland:" },
  { emoji: "\u{1F1F5}\u{1F1F1}", name: "Poland", category: "Flags", shortcode: ":poland:" },
  { emoji: "\u{1F1F9}\u{1F1F7}", name: "Turkey", category: "Flags", shortcode: ":tr:" },
  { emoji: "\u{1F1F8}\u{1F1E6}", name: "Saudi Arabia", category: "Flags", shortcode: ":saudi_arabia:" },
  { emoji: "\u{1F1EE}\u{1F1F1}", name: "Israel", category: "Flags", shortcode: ":israel:" },
  { emoji: "\u{1F1EA}\u{1F1EC}", name: "Egypt", category: "Flags", shortcode: ":egypt:" },
  { emoji: "\u{1F1F3}\u{1F1EC}", name: "Nigeria", category: "Flags", shortcode: ":nigeria:" },
  { emoji: "\u{1F1FF}\u{1F1E6}", name: "South Africa", category: "Flags", shortcode: ":south_africa:" },
  { emoji: "\u{1F1F3}\u{1F1FF}", name: "New Zealand", category: "Flags", shortcode: ":new_zealand:" },
  { emoji: "\u{1F3F3}\u{FE0F}", name: "White Flag", category: "Flags", shortcode: ":white_flag:" },
  { emoji: "\u{1F3F4}", name: "Black Flag", category: "Flags", shortcode: ":black_flag:" },
  { emoji: "\u{1F3C1}", name: "Chequered Flag", category: "Flags", shortcode: ":checkered_flag:" },
];

/* ── Helper: get Unicode code point string ──────────── */

function getCodePoints(emoji: string): string {
  return [...emoji]
    .map((cp) => {
      const code = cp.codePointAt(0);
      return code ? `U+${code.toString(16).toUpperCase().padStart(4, "0")}` : "";
    })
    .filter((s) => s && s !== "U+FE0F")
    .join(" ");
}

/* ── Component ──────────────────────────────────────── */

export function EmojiPickerTool() {
  const { isDark } = useTheme();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<EmojiCategory | "All">("All");
  const [recentlyUsed, setRecentlyUsed] = useState<EmojiEntry[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  /* Filter emojis by search + category */
  const filtered = useMemo(() => {
    let list = EMOJIS;
    if (activeCategory !== "All") {
      list = list.filter((e) => e.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.shortcode.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeCategory]);

  /* Copy emoji to clipboard and add to recently used */
  const copyEmoji = useCallback(
    async (entry: EmojiEntry) => {
      try {
        await navigator.clipboard.writeText(entry.emoji);
        setCopied(entry.emoji);
        setTimeout(() => setCopied(null), 1500);
      } catch {
        /* ignore */
      }

      setRecentlyUsed((prev) => {
        const without = prev.filter((e) => e.emoji !== entry.emoji);
        return [entry, ...without].slice(0, 20);
      });
    },
    []
  );

  /* Theme styles */
  const base = isDark
    ? "bg-neutral-900 border-white/10 text-neutral-100"
    : "bg-white border-black/10 text-neutral-900";
  const inputBase = isDark
    ? "bg-neutral-950 border-white/10 text-neutral-100 placeholder:text-neutral-600"
    : "bg-neutral-50 border-black/10 text-neutral-900 placeholder:text-neutral-400";
  const btnBase = isDark
    ? "bg-white/10 hover:bg-white/15 border-white/10"
    : "bg-black/5 hover:bg-black/10 border-black/10";
  const btnActive = isDark
    ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-700";
  const muted = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className={cx("rounded-xl border p-4", base)}>
        <label htmlFor="emoji-search" className="text-sm font-semibold block mb-2">
          Search Emojis
        </label>
        <input
          id="emoji-search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, shortcode, or category..."
          className={cx(
            "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[44px]",
            inputBase
          )}
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={cx(
            "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
            activeCategory === "All" ? btnActive : btnBase
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cx(
              "rounded-lg border px-3 py-1.5 text-xs transition-colors min-h-[44px]",
              activeCategory === cat ? btnActive : btnBase
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recently Used */}
      {recentlyUsed.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">Recently Used</h3>
          <div className="flex flex-wrap gap-1">
            {recentlyUsed.map((entry) => (
              <button
                key={`recent-${entry.shortcode}`}
                onClick={() => copyEmoji(entry)}
                title={`${entry.name} ${entry.shortcode}`}
                className={cx(
                  "rounded-lg border p-2 text-2xl transition-colors hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center",
                  copied === entry.emoji ? btnActive : btnBase
                )}
              >
                {entry.emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Emoji Grid + Detail */}
      <div className={cx("rounded-xl border p-4", base)} aria-live="polite">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">
            {activeCategory === "All" ? "All Emojis" : activeCategory}
          </h3>
          <span className={cx("text-xs", muted)}>
            {filtered.length} emoji{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className={cx("text-sm py-8 text-center", muted)}>
            No emojis match your search. Try a different keyword.
          </p>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1">
            {filtered.map((entry) => (
              <button
                key={entry.shortcode}
                onClick={() => copyEmoji(entry)}
                title={`${entry.name} ${entry.shortcode}`}
                className={cx(
                  "rounded-lg border p-2 text-2xl transition-colors hover:scale-110 min-h-[44px] min-w-[44px] flex items-center justify-center",
                  copied === entry.emoji ? btnActive : btnBase
                )}
              >
                {entry.emoji}
              </button>
            ))}
          </div>
        )}

        {/* Copied toast */}
        {copied && (
          <div className="mt-3 text-center">
            <span
              className={cx(
                "inline-block rounded-lg border px-3 py-1.5 text-xs font-semibold",
                btnActive
              )}
            >
              Copied {copied} to clipboard!
            </span>
          </div>
        )}
      </div>

      {/* Emoji Detail Table */}
      {recentlyUsed.length > 0 && (
        <div className={cx("rounded-xl border p-4", base)}>
          <h3 className="text-sm font-semibold mb-3">Emoji Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className={cx("border-b", isDark ? "border-white/10" : "border-black/10")}>
                  <th className="text-left py-2 pr-4">Emoji</th>
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Code Point</th>
                  <th className="text-left py-2">Shortcode</th>
                </tr>
              </thead>
              <tbody>
                {recentlyUsed.slice(0, 10).map((entry) => (
                  <tr
                    key={`detail-${entry.shortcode}`}
                    className={cx(
                      "border-b",
                      isDark ? "border-white/5" : "border-black/5"
                    )}
                  >
                    <td className="py-2 pr-4 text-2xl">{entry.emoji}</td>
                    <td className="py-2 pr-4">{entry.name}</td>
                    <td className={cx("py-2 pr-4 font-mono text-xs", muted)}>
                      {getCodePoints(entry.emoji)}
                    </td>
                    <td className={cx("py-2 font-mono text-xs", muted)}>
                      {entry.shortcode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
