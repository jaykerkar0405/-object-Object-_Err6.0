import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I can help you choose a yoga pose. What's your experience level with yoga? (Beginner/Intermediate/Advanced)",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const poses = {
    beginner: ["Child's Pose", "Downward Dog", "Cobra Pose"],
    intermediate: ["Bridge Pose", "Boat Pose"],
    advanced: ["Crow Pose", "Wheel Pose"],
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();

    if (input.includes("beginner")) {
      return `For beginners, I recommend starting with: ${poses.beginner.join(
        ", "
      )}. Would you like details about any of these poses?`;
    } else if (input.includes("intermediate")) {
      return `For intermediate practitioners, I suggest: ${poses.intermediate.join(
        ", "
      )}. Would you like details about any of these poses?`;
    } else if (input.includes("advanced")) {
      return `For advanced yogis, try: ${poses.advanced.join(
        ", "
      )}. Would you like details about any of these poses?`;
    }

    const poseDescriptions = {
      "downward dog":
        "Adho Mukha Svanasana - A foundational pose that stretches the entire body and strengthens arms and legs.",
      "child's pose":
        "Balasana - A restful pose that gently stretches the back, hips, and thighs.",
      "cobra pose":
        "Bhujangasana - A backbend that strengthens the spine and opens the chest.",
      "bridge pose":
        "Setu Bandhasana - A gentle backbend that strengthens the back and opens the chest.",
      "boat pose":
        "Navasana - A core-strengthening pose that improves balance.",
      "crow pose":
        "Bakasana - An arm balance that strengthens the wrists, arms, and core.",
      "wheel pose":
        "Urdhva Dhanurasana - A deep backbend that increases flexibility and boosts energy.",
    };

    for (const [pose, description] of Object.entries(poseDescriptions)) {
      if (input.includes(pose)) {
        return description;
      }
    }

    return "I can help you choose a yoga pose based on your experience level (Beginner/Intermediate/Advanced) or provide details about specific poses. What would you like to know?";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newUserMessage = { text: input, sender: "user" };
    const botResponse = { text: getBotResponse(input), sender: "bot" };

    setMessages([...messages, newUserMessage, botResponse]);
    setInput("");
  };

  return (
    <>
      {isVisible && (
        <div className="flex flex-col h-96 w-80 fixed bottom-20 right-4 bg-white rounded-lg shadow-lg">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-full ${
                    msg.sender === "user"
                      ? "bg-primary text-black"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2"
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button
              onClick={sendMessage}
              className="ml-2 p-3 bg-primary text-black rounded-lg"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      <div className="fixed bottom-2 right-4">
        <Button
          onClick={() => setIsVisible(!isVisible)}
          className="rounded-full w-12 h-12 bg-primary"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
