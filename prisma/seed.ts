import { prisma } from "../lib/prisma";

async function main() {
  console.log("Seeding categories...");

  const categoryTree = [
    {
      name: "Academics",
      slug: "academics",
      icon: "BookOpen",
      children: [
        { name: "Mathematics", slug: "mathematics" },
        { name: "Physics", slug: "physics" },
        { name: "Chemistry", slug: "chemistry" },
        { name: "Biology", slug: "biology" },
        { name: "Commerce & Accounts", slug: "commerce" },
        { name: "Computer Science", slug: "computer-science" },
      ],
    },
    {
      name: "Sports",
      slug: "sports",
      icon: "Trophy",
      children: [
        { name: "Cricket", slug: "cricket" },
        { name: "Football", slug: "football" },
        { name: "Badminton", slug: "badminton" },
        { name: "Tennis", slug: "tennis" },
        { name: "Swimming", slug: "swimming" },
        { name: "Yoga", slug: "yoga" },
      ],
    },
    {
      name: "Dance",
      slug: "dance",
      icon: "Sparkles",
      children: [
        { name: "Bharatanatyam", slug: "bharatanatyam" },
        { name: "Kathak", slug: "kathak" },
        { name: "Hip Hop", slug: "hip-hop" },
        { name: "Contemporary", slug: "contemporary" },
        { name: "Bollywood", slug: "bollywood" },
        { name: "Zumba", slug: "zumba" },
      ],
    },
    {
      name: "Music",
      slug: "music",
      icon: "Music",
      children: [
        { name: "Guitar", slug: "guitar" },
        { name: "Piano & Keyboard", slug: "piano" },
        { name: "Vocal Music", slug: "vocal" },
        { name: "Drums", slug: "drums" },
        { name: "Violin", slug: "violin" },
        { name: "Flute", slug: "flute" },
      ],
    },
    {
      name: "Arts & Crafts",
      slug: "arts",
      icon: "Palette",
      children: [
        { name: "Drawing & Painting", slug: "drawing-painting" },
        { name: "Sculpture & Pottery", slug: "sculpture" },
        { name: "Photography", slug: "photography" },
        { name: "Craft & Origami", slug: "craft" },
      ],
    },
    {
      name: "Coding & Tech",
      slug: "coding",
      icon: "Code",
      children: [
        { name: "Web Development", slug: "web-development" },
        { name: "Python Programming", slug: "python" },
        { name: "Robotics", slug: "robotics" },
        { name: "AI & Data Science", slug: "ai-data-science" },
      ],
    },
    {
      name: "Languages",
      slug: "languages",
      icon: "Globe",
      children: [
        { name: "Spoken English", slug: "spoken-english" },
        { name: "French", slug: "french" },
        { name: "German", slug: "german" },
        { name: "Spanish", slug: "spanish" },
        { name: "Hindi & Regional", slug: "hindi" },
      ],
    },
    {
      name: "Fitness & Wellness",
      slug: "fitness",
      icon: "Heart",
      children: [
        { name: "Personal Training", slug: "personal-training" },
        { name: "Martial Arts & Karate", slug: "martial-arts" },
        { name: "Pilates", slug: "pilates" },
      ],
    },
    {
      name: "Others",
      slug: "others",
      icon: "Grid",
      children: [],
    },
  ];

  for (const cat of categoryTree) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, icon: cat.icon },
      create: {
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
      },
    });

    for (const child of cat.children) {
      await prisma.category.upsert({
        where: { slug: child.slug },
        update: { name: child.name, parentId: parent.id },
        create: {
          name: child.name,
          slug: child.slug,
          parentId: parent.id,
        },
      });
    }
  }

  console.log("Categories seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
