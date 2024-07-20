// Images Imports

import banner1 from "../assets/images/home/category/water_sport.jpg"
import banner2 from "../assets/images/home/category/nature.jpg"
import banner3 from "../assets/images/home/category/camping.jpg"
import banner4 from "../assets/images/home/category/wild_life.jpg"

export const BlogData = {
  // sidebar
  blogSidebar: {
    recentPosts: [
      {
        img: banner1,
        title: "Lorem ipsum dolor sit amet.",
        id: 1,
        createdTime: "Jan 14 2023"
      },
      {
        img: banner2,
        title: "Lorem ipsum dolor sit amet.",
        id: 2,
        createdTime: "Mar 04 2023"
      },
      {
        img: banner3,
        title: "Lorem ipsum dolor sit amet.",
        id: 3,
        createdTime: "Feb 18 2023"
      },
      {
        img: banner4,
        title: "Lorem ipsum dolor sit amet.",
        id: 4,
        createdTime: "Oct 08 2023"
      }
    ],
    categories: [
      { category: "Adventure", icon: "AlertOctagon" },
      { category: "WildLife", icon: "Gitlab" },
      { category: "WaterSport", icon: "Wind" },
      { category: "Nature", icon: "CloudRain" },
      { category: "Camping", icon: "Moon" },
      { category: "Ancient", icon: "Command" },
      { category: "Festive", icon: "Star" }
    ]
  }

}
