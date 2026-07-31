import React from "react";
import {
    ImageItem,
    PhoneCarousel,
} from "@/components/phone-carousel";

const exampleImages: ImageItem[] = [
    {
        src: "/alumnyo-screens/Home.png",
        alt: "Alumnyo Home Screen",
    },
    {
        src: "/alumnyo-screens/Events.png",
        alt: "Alumnyo Events",
    },
    {
        src: "/alumnyo-screens/Job Screen.png",
        alt: "Alumnyo Job Board",
    },
    {
        src: "/alumnyo-screens/Manu.png",
        alt: "Alumnyo Menu",
    },
    {
        src: "/alumnyo-screens/Members.png",
        alt: "Alumnyo Members",
    },
];

export default function PhoneMockupBasic() {
    return <PhoneCarousel images={exampleImages} />;
}
