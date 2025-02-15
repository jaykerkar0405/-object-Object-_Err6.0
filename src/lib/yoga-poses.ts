interface YogaPose {
  title: string;
  description: string;
  name: string;
  image: string;
}

const yogaPoses: YogaPose[] = [
  {
    title: "Downward Dog",
    name: "downward-dog",
    image: "/poses/downward-dog.png",
    description:
      "Adho Mukha Svanasana - A foundational yoga pose that stretches the entire body, strengthens the arms and legs, and improves circulation.",
  },
  {
    title: "Warrior II",
    name:"warrior-2",
    image: "/poses/warrior.png",
    description:
      "Virabhadrasana II - A powerful standing pose that builds strength in the legs, enhances stability, and opens the hips and chest.",
  },
  {
    title: "Tree Pose",
    name:"tree-pose",
    image: "/poses/tree.png",
    description:
      "Vrikshasana - A balancing pose that strengthens the legs and core while improving focus and stability.",
  },
  {
    title: "Child's Pose",
    name:"childs-pose",
    image: "/poses/balasana.jpg",
    description:
      "Balasana - A restful pose that gently stretches the back, hips, and thighs, promoting relaxation and stress relief.",
  },
  {
    title: "Cobra Pose",
    name:"cobra-pose",
    image: "/poses/bhujasana.jpg",
    description:
      "Bhujangasana - A backbend that strengthens the spine, opens the chest, and improves flexibility.",
  },
  {
    title: "Bridge Pose",
    name:"bridge-pose",
    image: "/poses/bandhasana.jpg",
    description:
      "Setu Bandhasana - A gentle backbend that strengthens the back, glutes, and hamstrings while opening the chest.",
  },
  {
    title: "Triangle Pose",
    name:"triangle-pose",
    image: "/poses/trikonasana.png",
    description:
      "Trikonasana - A standing pose that stretches the legs, hips, and spine while improving balance.",
  },
  {
    title: "Boat Pose",
    name: "boat-pose",
    image:"/pose/navasana.jpg"
    description:
      "Navasana - A core-strengthening pose that engages the abdominal muscles and improves balance.",
  },
  {
    title: "Crow Pose",
    name: "crow-pose",
    image:"/pose/bakasana.jpg",
    description:
      "Bakasana - An arm balance that strengthens the wrists, arms, and core while improving focus and coordination.",
  },
  {
    title: "Wheel Pose",
    name: "wheel-pose",
    image:"/pose/wheel-pose.jpg",
    description:
      "Urdhva Dhanurasana - A deep backbend that strengthens the entire body, increases flexibility, and boosts energy.",
  },
];

export default yogaPoses;
