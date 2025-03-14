// "use client";

// import React from "react";
// import useWebRTCAudioSession from "@/hooks/use-webrtc";
// // import { tools } from "@/lib/tools";
// // import { VoiceSelector } from "@/components/voice-select";

// // import { StatusDisplay } from "@/components/status";
// // import { TokenUsageDisplay } from "@/components/token-usage";
// // import { MessageControls } from "@/components/message-controls";

// import { motion } from "framer-motion";
// // import { useToolsFunctions } from "@/hooks/use-tools";
// import { Button, Input } from "@heroui/react";

// const App: React.FC = () => {
//   // State for voice selection
//   // const [voice, setVoice] = useState("ash");

//   // WebRTC Audio Session Hook
//   const {
//     status,
//     isSessionActive,
//     // registerFunction,
//     handleStartStopClick,
//     msgs,
//     conversation,
//     sendTextMessage,
//   } = useWebRTCAudioSession("ash");

//   // Get all tools functions
//   // const toolsFunctions = useToolsFunctions();

//   // useEffect(() => {
//   //   // Register all functions by iterating over the object
//   //   Object.entries(toolsFunctions).forEach(([name, func]) => {
//   //     const functionNames: Record<string, string> = {
//   //       timeFunction: "getCurrentTime",
//   //       backgroundFunction: "changeBackgroundColor",
//   //       partyFunction: "partyMode",
//   //       launchWebsite: "launchWebsite",
//   //       copyToClipboard: "copyToClipboard",
//   //       scrapeWebsite: "scrapeWebsite",
//   //     };

//   //     registerFunction(functionNames[name], func);
//   //   });
//   // }, [registerFunction, toolsFunctions]);

//   return (
//     <div className="shadow-inner-strong h-full">
//       <motion.div
//         className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20 p-12 border rounded-lg shadow-xl"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div
//           className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4"
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2, duration: 0.4 }}
//         >
//           {/* <VoiceSelector value={voice} onValueChange={setVoice} /> */}
//           {/* Status */}
//           <p className="text-lg font-semibold text-center">
//             {isSessionActive ? "Session Active" : "Session Inactive"}
//           </p>
//           <div className="flex flex-col items-center gap-4">
//             <Button onPress={handleStartStopClick}>
//               {isSessionActive ? "Stop" : "Start"}
//             </Button>
//           </div>
//           {/* {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />} */}
//           {/* messages */}
//           {/* {msgs.map((msg, index) => (
//             <div key={index} className="flex flex-col gap-2">
//               <p className="text-sm font-semibold">{msg.type}</p>
//               <p className="text-sm">{msg.text}</p>
//             </div>
//           ))} */}
//           {conversation.map((msg, index) => (
//             <div key={index} className="flex flex-col gap-2">
//               <p className="text-sm">{msg.text}</p>
//             </div>
//           ))}
//           {status && (
//             <motion.div
//               className="w-full flex flex-col gap-2"
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               {/* <MessageControls conversation={conversation} msgs={msgs} /> */}
//               <Input
//                 onSubmit={(e: any) => sendTextMessage(e.target.value)}
//                 disabled={!isSessionActive}
//               />
//             </motion.div>
//           )}
//         </motion.div>

//         {/* {status && <StatusDisplay status={status} />} */}
//       </motion.div>
//     </div>
//   );
// };

// export default App;

export default function App() {
  return (
    <div>
      <h1>App</h1>
    </div>
  );
}