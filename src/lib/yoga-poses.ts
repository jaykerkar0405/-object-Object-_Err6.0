import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export type PoseFeedback = {
  feedback: string | undefined;
  angle: number;
  joint: keyof typeof JointAngleMap;
};

export type YogaPose = {
  title: string;
  description: string;
  name: string;
  image: string;
  constraints?: (landmarks: NormalizedLandmark[]) => PoseFeedback[];
};

export const yogaPoses: YogaPose[] = [
  {
    title: "Downward Dog",
    name: "downward-dog",
    image: "/poses/downward-dog.png",
    constraints: (landmarks) => {
      const leftHipAngle = getJointAngle(landmarks, "left-hip");
      const rightHipAngle = getJointAngle(landmarks, "right-hip");
      const leftElbowAngle = getJointAngle(landmarks, "left-elbow");
      const rightElbowAngle = getJointAngle(landmarks, "right-elbow");
      const leftKneeAngle = getJointAngle(landmarks, "left-knee");
      const rightKneeAngle = getJointAngle(landmarks, "right-knee");

      return [
        {
          angle: leftHipAngle,
          feedback: leftHipAngle > 120 ? "Bend your left hip more" : undefined,
          joint: "left-hip",
        },
        {
          angle: rightHipAngle,
          feedback:
            rightHipAngle > 120 ? "Bend your right hip more" : undefined,
          joint: "right-hip",
        },
        {
          angle: leftElbowAngle,
          feedback:
            leftElbowAngle < 120 ? "Straighten your let arm" : undefined,
          joint: "left-elbow",
        },
        {
          angle: rightElbowAngle,
          feedback:
            rightElbowAngle < 120 ? "Straighten your right arm" : undefined,
          joint: "right-elbow",
        },
        {
          angle: leftKneeAngle,
          feedback:
            leftKneeAngle < 120 ? "Straighten your left leg" : undefined,
          joint: "left-knee",
        },
        {
          angle: rightKneeAngle,
          feedback:
            rightKneeAngle < 120 ? "Straighten your right leg" : undefined,
          joint: "right-knee",
        },
      ];
    },
    description:
      "Adho Mukha Svanasana - A foundational yoga pose that stretches the entire body, strengthens the arms and legs, and improves circulation.",
  },
  {
    title: "Warrior II",
    name: "warrior-2",
    image: "/poses/warrior.png",
    description:
      "Virabhadrasana II - A powerful standing pose that builds strength in the legs, enhances stability, and opens the hips and chest.",
  },
  {
    title: "Tree Pose",
    name: "tree-pose",
    image: "/poses/tree.png",
    description:
      "Vrikshasana - A balancing pose that strengthens the legs and core while improving focus and stability.",
  },
  {
    title: "Child's Pose",
    name: "childs-pose",
    image: "/poses/balasana.jpg",
    description:
      "Balasana - A restful pose that gently stretches the back, hips, and thighs, promoting relaxation and stress relief.",
  },
  {
    title: "Cobra Pose",
    name: "cobra-pose",
    image: "/poses/bhujasana.jpg",
    description:
      "Bhujangasana - A backbend that strengthens the spine, opens the chest, and improves flexibility.",
  },
  {
    title: "Bridge Pose",
    name: "bridge-pose",
    image: "/poses/bandhasana.jpg",
    description:
      "Setu Bandhasana - A gentle backbend that strengthens the back, glutes, and hamstrings while opening the chest.",
  },
  {
    title: "Triangle Pose",
    name: "triangle-pose",
    image: "/poses/trikonasana.png",
    description:
      "Trikonasana - A standing pose that stretches the legs, hips, and spine while improving balance.",
  },
  {
    title: "Boat Pose",
    name: "boat-pose",
    image: "/poses/navasana.jpg",
    description:
      "Navasana - A core-strengthening pose that engages the abdominal muscles and improves balance.",
  },
  {
    title: "Crow Pose",
    name: "crow-pose",
    image: "/poses/bakasana.jpg",
    description:
      "Bakasana - An arm balance that strengthens the wrists, arms, and core while improving focus and coordination.",
  },
  {
    title: "Wheel Pose",
    name: "wheel-pose",
    image: "/poses/wheel-pose.jpg",
    description:
      "Urdhva Dhanurasana - A deep backbend that strengthens the entire body, increases flexibility, and boosts energy.",
  },
];

function getAngle(
  landmark1: NormalizedLandmark,
  landmark2: NormalizedLandmark,
  landmark3: NormalizedLandmark
) {
  const ba = {
    x: landmark1.x - landmark2.x,
    y: landmark1.y - landmark2.y,
    z: landmark1.z - landmark2.z,
  };
  const bc = {
    x: landmark3.x - landmark2.x,
    y: landmark3.y - landmark2.y,
    z: landmark3.z - landmark2.z,
  };
  const dot = ba.x * bc.x + ba.y * bc.y + ba.z * bc.z;
  const mod =
    Math.sqrt(ba.x * ba.x + ba.y * ba.y + ba.z * ba.z) *
    Math.sqrt(bc.x * bc.x + bc.y * bc.y + bc.z * bc.z);
  return Math.acos(dot / mod) * (180 / Math.PI);
}

export const JointAngleMap = {
  "right-elbow": [12, 14, 16],
  "left-elbow": [11, 13, 15],
  "right-knee": [24, 26, 28],
  "left-knee": [23, 25, 27],
  "right-hip": [12, 24, 26],
  "left-hip": [11, 23, 25],
  hip: [26, 24, 23, 25],
} as const;

export function getJointAngle(
  landmarks: NormalizedLandmark[],
  joint: keyof typeof JointAngleMap
) {
  if (joint !== "hip") {
    const [a, b, c] = JointAngleMap[joint];
    return getAngle(landmarks[a], landmarks[b], landmarks[c]);
  }

  const [a, b, c, d] = JointAngleMap[joint];
  const midpoint = {
    x: (landmarks[b].x + landmarks[c].x) / 2,
    y: (landmarks[b].y + landmarks[c].y) / 2,
    z: (landmarks[b].z + landmarks[c].z) / 2,
    visibility: Math.min(landmarks[b].visibility, landmarks[c].visibility),
  };
  return getAngle(landmarks[a], midpoint, landmarks[d]);
}
