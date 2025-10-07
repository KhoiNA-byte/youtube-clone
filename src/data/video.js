import {
    Thebausffs,
    Danehearth,
    Los_Ratones,
    PewDiePie,
    SolarLight,
    Mark_Rober,
} from "../assets/index.js";

const videoTemplates = [
    {channel: "Thebausffs", icon: Thebausffs, title: "League Insane Comeback"},
    {channel: "Danehearth", icon: Danehearth, title: "Hearthstone Crazy Decks"},
    {channel: "Los Ratones", icon: Los_Ratones, title: "Daily Scrims"},
    {channel: "PewDiePie", icon: PewDiePie, title: "Japan Life"},
    {channel: "SolarLight", icon: SolarLight, title: "Demoknight TF2"},
    {channel: "Mark Rober", icon: Mark_Rober, title: "Awesome Scientific Idea"},
];

// Sample video URLs (replace with real YouTube embed URLs if you want)
const sampleUrls = [
    "https://www.youtube.com/embed/EUt1FTqxFWw"
];

export const mockVideos = Array.from({length: 50}, (_, i) => {
    const picked = videoTemplates[i % videoTemplates.length];
    return {
        id: i.toString(), // make sure it’s a string if you use React Router params
        title: `${picked.title} #${i + 1}`,
        channel: picked.channel,
        channelIcon: picked.icon,
        views: `${Math.floor(Math.random() * 900 + 100)}K views`,
        uploadTime: `${Math.floor(Math.random() * 12) + 1} months ago`,
        duration: `${Math.floor(Math.random() * 10)}:${Math.floor(
            Math.random() * 60
        )
            .toString()
            .padStart(2, "0")}`,
        thumbnail: `https://picsum.photos/320/180?random=${i}`,

        // 🔹 Added fields
        url: sampleUrls[i % sampleUrls.length],
        description: `Hello Hello to you! 👋 😃 Use this song to say “Hello!” to classmates, parents, and friends from around the world. 🌍

PARENTS AND TEACHERS: Thank you so much for watching Super Simple Songs with your families and/or students. Here are some other places to find great Super Simple content:

► SUPER SIMPLE APP -- http://bit.ly/TheSuperSimpleApp Be the first to watch new Super Simple videos in the Super Simple App! Ad-free and designed for young learners.
► YOUTUBE KIDS -- http://bit.ly/You-Tube-Kids Designed to make it safer and simpler for young ones to watch online video, YouTube Kids includes a suite of parental controls so you can tailor the experience to suit your family’s needs.
► AMAZON VIDEO Are you an Amazon Prime member? Watch Super Simple videos ad-free on Amazon Prime Video. Just search for “Super Simple.”

FREE SUPER SIMPLE TEACHING RESOURCES: http://bit.ly/SSFree-Resources

SOCIAL MEDIA: 
Super Simple Newsletter Sign Up: http://bit.ly/SuperSimpleSignUp
Facebook: http://bit.ly/SuperSimpleFacebook
Instagram: http://bit.ly/SuperSimpleInsta
Twitter: http://bit.ly/SuperSimpleTwitter
Pinterest: http://bit.ly/SuperSimplePinterest 

*********
Lyrics:
Hello, hello.
Can you clap your hands?
Hello, hello.
Can you clap your hands?

Can you stretch up high?
Can you touch your toes?
Can you turn around? 
Can you say, "Hello"? 

Hello, hello.
Can you stamp your feet? 
Hello, hello.
Can you stamp your feet?

Can you stretch up high?
Can you touch your toes?
Can you turn around?
Can you say, "Hello"?

Hello, hello.
Can you clap your hands?
Hello, hello.
Can you stamp your feet?
********* 
© Skyship Entertainment Company. All rights reserved. Super Simple, Super Simple Songs, Noodle & Pals, Finny the Shark, Caitie’s Classroom, Rhymington Square, the Bumble Nums, Carl’s Car Wash and associated logos are trademarks of Skyship Entertainment Company.
#supersimple #nurseryrhymes #kidssongs #childrensmusic #funlearningactivities`

    };
});
