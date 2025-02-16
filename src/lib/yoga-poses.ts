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
  constraints: (landmarks: NormalizedLandmark[]) => PoseFeedback[];
};

export const yogaPoses: YogaPose[] = [
  {
    title: "Downward Dog",
    name: "downward-dog",
    image: "/poses/downward-dog.png",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { max: 120 }),
      getJointFeedback(landmarks, "right-hip", { max: 120 }),
      getJointFeedback(landmarks, "left-elbow", { min: 120 }),
      getJointFeedback(landmarks, "right-elbow", { min: 120 }),
      getJointFeedback(landmarks, "left-knee", { min: 120 }),
      getJointFeedback(landmarks, "right-knee", { min: 120 }),
    ],
    description:
      "Adho Mukha Svanasana - A foundational yoga pose that stretches the entire body, strengthens the arms and legs, and improves circulation.",
  },
  {
    title: "Child's Pose",
    name: "childs-pose",
    image: "/poses/balasana.jpg",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { max: 40 }),
      getJointFeedback(landmarks, "right-hip", { max: 30 }),
      getJointFeedback(landmarks, "left-knee", { max: 50  }),
      getJointFeedback(landmarks, "right-knee", { max: 60 }),
    ],
    description:
      "Balasana - A restful pose that gently stretches the back, hips, and thighs, promoting relaxation and stress relief.",
  },
  {
    title: "Cobra Pose",
    name: "cobra-pose",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { max: 145, min: 90 }),
      getJointFeedback(landmarks, "right-hip", { max: 145, min: 90 }),
      getJointFeedback(landmarks, "left-elbow", { min: 160 }),
      getJointFeedback(landmarks, "right-elbow", { min: 135 }),
      getJointFeedback(landmarks, "left-knee", { min: 120 }),
      getJointFeedback(landmarks, "right-knee", { min: 120 }),
    ],
    image: "/poses/bhujasana.jpg",
    description:
      "Bhujangasana - A backbend that strengthens the spine, opens the chest, and improves flexibility.",
  },
  {
    title: "Bridge Pose",
    name: "bridge-pose",
    image: "/poses/bandhasana.jpg",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { min: 120, max: 145 }),
      getJointFeedback(landmarks, "right-hip", { min: 120, max: 165 }),
      getJointFeedback(landmarks, "left-knee", { min: 60 }),
      getJointFeedback(landmarks, "right-knee", { min: 60 }),
    ],
    description:
      "Setu Bandhasana - A gentle backbend that strengthens the back, glutes, and hamstrings while opening the chest.",
  },
  {
    title: "Boat Pose",
    name: "boat-pose",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { min: 70, max: 110 }),
      getJointFeedback(landmarks, "right-hip", { min: 70, max: 110 }),
      getJointFeedback(landmarks, "left-elbow", { min: 160 }),
      getJointFeedback(landmarks, "right-elbow", { min: 160 }),
      getJointFeedback(landmarks, "left-knee", { min: 160 }),
      getJointFeedback(landmarks, "right-knee", { min: 160 }),
    ],
    image: "/poses/navasana.jpg",
    description:
      "Navasana - A core-strengthening pose that engages the abdominal muscles and improves balance.",
  },
  {
    title: "Crow Pose",
    name: "crow-pose",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { max: 30 }),
      getJointFeedback(landmarks, "right-hip", { max: 30 }),
      getJointFeedback(landmarks, "left-elbow", { min: 160 }),
      getJointFeedback(landmarks, "right-elbow", { min: 160 }),
      getJointFeedback(landmarks, "left-knee", { min: 30 }),
      getJointFeedback(landmarks, "right-knee", { min: 30 }),
    ],
    image: "/poses/bakasana.jpg",
    description:
      "Bakasana - An arm balance that strengthens the wrists, arms, and core while improving focus and coordination.",
  },
  {
    title: "Wheel Pose",
    name: "wheel-pose",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { max: 170 }),
      getJointFeedback(landmarks, "right-hip", { max: 170 }),
      getJointFeedback(landmarks, "left-elbow", { min: 150 }),
      getJointFeedback(landmarks, "right-elbow", { min: 150 }),
      getJointFeedback(landmarks, "left-knee", { min: 120 }),
      getJointFeedback(landmarks, "right-knee", { min: 120 }),
    ],
    image: "/poses/wheel-pose.jpg",
    description:
      "Urdhva Dhanurasana - A deep backbend that strengthens the entire body, increases flexibility, and boosts energy.",
  },
  {
    title: "Meditation Pose",
    name: "meditation-pose",
    constraints: (landmarks) => [
      getJointFeedback(landmarks, "left-hip", { max: 100 }),
      getJointFeedback(landmarks, "right-hip", { max: 100 }),
      getJointFeedback(landmarks, "left-elbow", { min: 120 }),
      getJointFeedback(landmarks, "right-elbow", { min: 110 }),
      getJointFeedback(landmarks, "left-knee", { max: 45 }),
      getJointFeedback(landmarks, "right-knee", { max: 45 }),
    ],
    image: "/poses/meditation.jpg",
    description:
      "Sit comfortably with your back straight, close your eyes, and focus on your breath",
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

export function getJointFeedback(
  landmarks: NormalizedLandmark[],
  joint: keyof typeof JointAngleMap,
  constraint?: { min?: number; max?: number }
): PoseFeedback {
  const angle = getJointAngle(landmarks, joint);

  let feedback: string | undefined = undefined;
  if (constraint?.min !== undefined && angle < constraint.min) {
    if (joint.includes("hip")) {
      feedback = `Extend your ${joint.replace("-", " ")} more`;
    } else {
      feedback = `Bend your ${joint.replace("-", " ")} more`;
    }
  } else if (constraint?.max !== undefined && angle > constraint.max) {
    if (joint.includes("hip")) {
      feedback = `Bend your ${joint.replace("-", " ")} more`;
    } else {
      feedback = `Extend your ${joint.replace("-", " ")} more`;
    }
  }
  return { angle, feedback, joint };
}
