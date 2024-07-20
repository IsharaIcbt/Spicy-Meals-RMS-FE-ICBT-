import { Assets } from "@src/assets/images"


export  const badgeColorsArr = {
  Adventure: "light-info",
  WildLife: "light-danger",
  WaterSport: "light-primary",
  Nature: "light-success",
  Camping: "light-danger",
  Ancient: "light-warning",
  Festive: "light-secondary"
}


export const categoriesSingle = [
  { value: 'Adventure', label: 'Adventure' },
  { value: 'WildLife', label: 'WildLife' },
  { value: 'WaterSport', label: 'WaterSport' },
  { value: 'Nature', label: 'Nature' },
  { value: 'Camping', label: 'Camping' },
  { value: 'Ancient', label: 'Ancient' },
  { value: 'Festive', label: 'Festive' }
]

export const ratingRanges = [
  { value: { min:4.0, max:5.0 }, label: '5 Star' },
  { value: { min:3.0, max:4.0 }, label: '4 Star' },
  { value: { min:2.0, max:3.0 }, label: '3 Star' },
  { value: { min:1.0, max:2.0 }, label: '2 Star' },
  { value: { min:0.0, max:1.0 }, label: '1 Star' }
]


export const categories = [
  {
    id:'adventure',
    title: 'Adventure',
    image: Assets.adventure,
    description: 'Embark on thrilling escapades and adrenaline-pumping experiences. From rugged terrains to exciting outdoor challenges, our adventure is tailored for those seeking the extraordinary.'
  },
  {
    id:'wild_life',
    title: 'Wild Life',
    image: Assets.wild_life,
    description: 'Immerse yourself in the wonders of Sri Lanka\'s biodiversity. Encounter exotic wildlife, explore lush sanctuaries, and witness nature\'s creatures in their natural habitats.'
  },
  {
    id:'water_sport',
    title: 'Water Sport',
    image: Assets.water_sport,
    description: 'Dive into the vibrant world beneath the waves or ride the surf along stunning coastlines. Our water sports category beckons water enthusiasts with a variety of aquatic experiences.'
  },
  {
    id:'nature',
    title: 'Nature',
    image: Assets.nature,
    description: 'Discover the serenity of Sri Lanka\'s natural beauty. From breathtaking landscapes to tranquil gardens, our nature category invites you to unwind in the midst of picturesque surroundings. '
  },
  {
    id:'camping',
    title: 'Camping',
    image: Assets.camping,
    description: 'Pitch your tent under the starry skies and connect with nature on a deeper level. Our camping category offers scenic spots and a chance to experience the great outdoors activities. '
  },
  {
    id:'ancient',
    title: 'Ancient',
    image: Assets.ancient,
    description: 'Step back in time as you explore the rich historical and cultural heritage of Sri Lanka. The ancient category guides you through temples, ruins, and monuments steeped in history.'
  },
  {
    id:'festive',
    title: 'Festive',
    image: Assets.festive,
    description: 'Celebrate the vibrant spirit of Sri Lanka through its festivals. Join the festivities, witness traditional ceremonies, and experience the cultural richness of the island.'
  }
]

export const fullDetailsOfSelectCategory = [
  {
    id:'adventure',
    title: 'Adventure',
    image: Assets.adventure_cover,
    description: 'With varying climates and Geography packed into a small island Sri Lanka offers a range of adventures from the top of the mountains to the depths of the oceans.\n' +
      '\n' +
      'Other than taking a dip in the oceans or snorkelling, scuba diving and surfing are the most popular beach sports in the country. Scuba diving has long history in the country. Today the oceans filled with coral gardens, multitude of exotic fishes and ancient wrecks Sri Lanka offers one of the best diving experiences in the world. Although comparatively new to the country surfing too has made its mark in the Southern and Eastern coasts of the island for the last twenty five years. The sea around Sri Lanka is also one of the most challenging marine game fishing locations while white water rafting, Kayaking and canoeing are some of the relatively new water sports practiced in the country.\n' +
      '\n' +
      'With multitude of roads winding through expanding mountains, lush green forests, paddy fields, parks and sleepy villages, Sri Lanka also offers many opportunities to keen hikers and trekkers. Trail blazing through the tracks and paths on horse or elephant back too is a novel experience introduced recently.\n' +
      '\n' +
      'Experience the thrills of crumbling rocks beneath the feet, head spinning heights and the earth expanding beneath when conquering many mountains of Sri Lanka or take over waterfall climbing with exciting climbs like the rock face of Bambarakanda waterfall, the tallest in the country.\n' +
      '\n' +
      'With many an adventures packed within few miles of each other Sri Lanka is an adventure itself waiting to happen.',
    map_link:'<iframe src="https://www.google.com/maps/d/embed?mid=1pa3h1N4t_YHU2Czx62NCsoZv6vXv3SU&z=8&ehbc=2E312F" width="640" height="720"></iframe>'
  },
  {
    id:'wild_life',
    title: 'Wild Life',
    image: Assets.wild_cover,
    description: 'Despite its small size Sri Lanka boasts of one of the highest rates of biological endemism in the world whether in plants or animals and is included among the top five biodiversity hotspots in the world. Of the ninety-one species of mammals found in Sri Lanka Asian elephants, sloth bear, leopards, sambar and wild buffaloes engages the majority of the attention of wildlife enthusiast. Yet the rarest mammals of Sri Lanka are the red slender Loris, Toque Macaque, and Purple-faced Langur, who according to IUCN clarifications are endangered due to habitat loss.\n' +
      '\n' +
      'Meanwhile the ocean around Sri Lanka is home to large families of cetaceans including the mighty blue whales, sperm whales and lively dolphins. Altogether 26 species of cetaceans rule the waters surrounding the country, making it one of the best locations for whale and dolphin watching.  \n' +
      '\n' +
      'Despite the mighty elephants and rare amphibians found in the country birds are the glory of the Sri Lanka’s wildlife. Boasting nearly 433 bird species of which 233 are resident Sri Lanka holds 20 endemic species while another 80 species have developed distinct Sri Lankan races, compared to their cousins in Indian mainland.\n' +
      '\n' +
      'Although less celebrated, Sri Lanka has one of the richest diversity of amphibians in the world, containing over 106 species of amphibians of over 90 of which are endemic. The country has long claimed to have the highest amphibian species density in the world with a high concentration in the Sinharaja rainforest.',
    map_link:'<iframe src="https://www.google.com/maps/d/embed?mid=1GpnfV5zYB2iYSt9nEn2NvClfx2j2g8k&z=8&ehbc=2E312F" width="640" height="720"></iframe>'
  },
  {
    id:'water_sport',
    title: 'Water Sport',
    image: Assets.water_sport_cover,
    description: 'With nearly 1600 km of of palm fringed Coastline baked to perfection surrounding the country, Sri Lanka is the ideal destination for beach bums worldwide. May it be windsurfing, kayaking, yachting, water skiing, scuba diving or just lazing around for the perfect tan, Sri Lanka offers it all.\n\n' +
      'The two monsoon winds providing rain to the two corners of the country at various periods make Sri Lanka’s beach holiday a year-round prospect. The northeast winds make the southwestern coast sunny and the sea calm from November to March. The Southwest winds make the East Coast waters quiet with the constant sunshine happily in agreement.\n\n' +
      'The best of the Southern beaches include Tangalla, Beruwala, Mirissa, Bentota, and Unawatuna with varying options including chic boutique hotels, glowing coral reefs, gentle sandbars, and undiscovered corners of paradise.\n\n' +
      'On the Western corner of the country to the north of Colombo is the Negambo lagoon. Its beaches, an old favorite with local and foreign visitors, and lagoon famed for lobster harvesting. Despite having a ring of sandy beaches surrounding the country, Galle Face Green, a half a kilometer stretch between Galle Road and the Indian Ocean is the playground of the Colombians.\n\n' +
      'Also, Nilaveli is a coastal resort town located about 20 km North-West of Trincomalee, Trincomalee District, Sri Lanka. It used to be a popular tourist destination. Arugam Bay is a bay situated on the Indian Ocean in the dry zone of Sri Lanka\'s southeast coast. The bay is located 320 km due east of Colombo. It is a popular surfing and tourist destination. Pasikudah or Pasikuda is a coastal resort town located about 35 kilometers northwest of Batticaloa, Batticaloa District, Sri Lanka. It used to be a popular tourist destination, Pasikudah, and Kalkudah are located a few km apart.',
    map_link: '<iframe src="https://www.google.com/maps/d/embed?mid=12DADOEP9Jcq7t2IDhSThC4zd8BBw28o&z=8&ehbc=2E312F&noprof=1" width="640" height="720"></iframe>'
  },
  {
    id:'nature',
    title: 'Nature',
    image: Assets.nature_cover,
    description: 'Despite being a relatively small island, Sri Lanka is endowed with a diverse collection of landscapes, climates and natural features. Sri Lanka’s infamous beaches have been enticing visitors for many years. However, the rest of the island harbours many more idyllic vistas.\n' +
      '\n' +
      'The central highlands are carpeted with emerald tea plantations interspersed with occasional waterfalls. Cool climates, misty views, and quaint estate bungalows are a throwback to bygone eras.\n' +
      '\n' +
      'The cultural triangle in the centre of the island holds a certain magic, with ruins from several ancient kingdoms, majestic tanks, hidden rock caves, and ancient sacred temples, revealing the fascinating and almost unbelievable ancient architecture, art, and engineering.\n' +
      '\n' +
      'The North of Sri Lanka is a vibrant concoction of essences, with a unique flavour and culture. Despite still bearing the scars from the civil war, the north truly bears testament to the diversity and variation that comprises the island. Influences include Portuguese, Dutch, Tamil, Muslim, and British characters. Chains of islands are scattered off the shoreline, with their own unique habitats, waiting to be explored.\n' +
      '\n' +
      'The east of the island is home to lush paddy fields, spectacular sunrises, and a quieter more rural pace of life. Colourful places of worship, national parks, ports and harbours, and pristine clear waters offer a mellow experience to any weary traveller.',
    map_link: '<iframe src="https://www.google.com/maps/d/embed?mid=1QMM56lZaRjNbsnGN65avxDHEghfBn9A&z=8&ehbc=2E312F" width="640" height="720"></iframe>'
  },
  {
    id:'camping',
    title: 'Camping',
    image: Assets.camping_cover,
    description: 'Sri Lanka offers enchanting opportunities for nature camping, allowing adventurers to immerse themselves in the island\'s diverse landscapes and wildlife. From lush rainforests and mist-covered mountains to serene lakes and pristine beaches, the country provides a variety of camping experiences.\n' +
      '\n' +
      'Imagine setting up camp in the heart of Sinharaja Forest Reserve, a UNESCO World Heritage Site known for its rich biodiversity. Here, you can wake up to the symphony of exotic birds and explore ancient trees draped in moss. The air is thick with the scent of tropical flora, creating an immersive experience for nature enthusiasts.\n' +
      '\n' +
      'For those seeking a more elevated adventure, camping in the central highlands around places like Ella or Horton Plains National Park provides breathtaking views of tea plantations, rolling hills, and the occasional glimpses of wildlife. The cool mountain air and starry nights make these locations perfect for a tranquil camping getaway.\n' +
      '\n' +
      'Sri Lanka\'s coastal areas, like Yala National Park or Wilpattu National Park, offer unique camping experiences where you can fall asleep to the soothing sound of waves crashing on the shore. These locations also provide opportunities for wildlife encounters, with leopards, elephants, and various bird species making appearances.\n' +
      '\n' +
      'Inland, camping near picturesque lakes such as Kandalama or Victoria Reservoir adds a touch of serenity to your outdoor experience. Picture yourself beside the water, surrounded by lush greenery and the sounds of nature.\n' +
      '\n' +
      'Keep in mind that Sri Lanka\'s diverse climate allows for year-round camping, but it\'s essential to check weather conditions and obtain necessary permits, especially if camping in protected areas. Whether you\'re an avid adventurer or a nature lover looking for a peaceful escape, Sri Lanka\'s nature camping offers a perfect blend of beauty, biodiversity, and tranquility.\n' +
      '\n',
    map_link: '<iframe src="https://www.google.com/maps/d/embed?mid=18iN8F0Yr2SJ6yqmZpMeTkUED-07-WtQ&z=8&ehbc=2E312F" width="640" height="720"></iframe>'
  },
  {
    id:'ancient',
    title: 'Ancient',
    image: Assets.ancient_cover,
    description: 'With a history expanding over 3000years, Sri Lanka holds some of world’s ancient cities including Anuradhapura, Polonnaruwa and Digamadulla; their once glorious townships, palaces, temples, monasteries, hospitals and theaters intricately carved and modeled out of stone lay and abandoned and forgotten with time amidst the soaring jungles.\n' +
      '\n' +
      'Of all the ancient cities of Lanka, the most famed and most exquisite is the Kingdom of Anuradhapura. Sri Lanka’s third and the longest serving capital and one of the oldest continuously inhabited cities in the world is also one of the most sacred cities of World Buddhists. It was the capital of Sri Lanka from the Fourth Century BC up to the turn of the eleventh Century and was one of the most stable and durable centers of political power and urban life in South Asia.\n' +
      '\n' +
      'Sigiriya, a fifth century AD fortress and a water garden displays some of the most futuristic elements of landscaping and some of the oldest murals recorded in the country.\n' +
      '\n' +
      'Polonnaruwa, the second most ancient kingdom of the country boasts of Irrigation systems that are far superior to those of the and they still provide irrigation water to the farmers in and around Polonnaruwa.Digamadulla, the Eastern kingdom of Sri Lanka was the agricultural and spiritual capital of the country during the Anuradhapura kingdom.\n' +
      '\n' +
      'Sri Lanka’s last kingdom the Kingdome of Kandy is a testament to the Sri Lankan’s ability to pick up and rise from ashes. After being burned and ravaged more than thrice by the invading Portuguese the Kandyan Kingdom still holds beautifully carved and built houses, palaces and temple preserved for nearly 500 years',
    map_link: '<iframe src="https://www.google.com/maps/d/embed?mid=1SxQn2oO9cYcSG40uz0nwC2eo-PeBN-s&z=8&ehbc=2E312F" width="640" height="720"></iframe>'
  },
  {
    id:'festive',
    title: 'Festive',
    image: Assets.festive_cover,
    description: 'With a population composed with many a races and religions, Sri Lanka is never short of festivals and celebrations. Every month brings a celebration either religious or cultural importance, making Sri Lanka one of the countries with highest number of celebrations and holidays.\n' +
      '\n' +
      'The Sinhala-Tamil New year festival in April is the most important cultural festival in the country. The festival marks the beginning of the New Year and the end of harvesting season. A lengthy holiday and a table full of oily traditional delicacies like kokis, makes the New Year festival one of the long awaited festivals in the country.\n' +
      '\n' +
      'The May full moon poya day or Vesak is the most important religious celebration in Sri Lanka, where Buddhists celebrate the nativity, enlightenment and passing away of Lord Buddha with many celebrations. Sri Lankans of every religion crowd the roads to enjoy Vesak decorations including pandals and lanterns and many a makeshift alm houses that line the roads offering every food item from beverages, dessert to main meals.\n' +
      '\n' +
      'In August are the Esala festivals in Kandy and Kataragama. The Kataragama Esala Festival is a multi-religious festival where devotes use fire walking and extreme self-penance to shows their piety to Lord Kataragama. The Kandy Esala Perahera or the Dalanda Perahera is the largest cultural parade in the world and showcases the best of Sri Lankan dancing and music and the best of the domesticated tuskers in the country.',
    map_link: '<iframe src="https://www.google.com/maps/d/embed?mid=1TtP6t3JjzqAUIdP6OFOn8wI4XSvBv0E&z=8&ehbc=2E312F" width="640" height="720"></iframe>'
  }
]