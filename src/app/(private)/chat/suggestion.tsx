// "use client";

// import { Button } from "@heroui/react";
// import { Icon } from "@iconify/react/dist/iconify.js";
// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";

// // import type { UISuggestion } from "@/lib/editor/suggestions";

// export const Suggestion = ({
//   suggestion,
//   onApply,
// }: {
//   //   suggestion: UISuggestion;
//   onApply: () => void;
// }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <AnimatePresence>
//       {!isExpanded ? (
//         <motion.div
//           className="cursor-pointer text-muted-foreground p-1 absolute -right-8"
//           onClick={() => {
//             setIsExpanded(true);
//           }}
//           whileHover={{ scale: 1.1 }}
//         >
//           <Icon icon="solar:lightbulb" />
//         </motion.div>
//       ) : (
//         <motion.div
//           key={suggestion.id}
//           className="absolute bg-background p-3 flex flex-col gap-3 rounded-2xl border text-sm w-56 shadow-xl z-50 -right-12 md:-right-16 font-sans"
//           transition={{ type: "spring", stiffness: 500, damping: 30 }}
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: -20 }}
//           exit={{ opacity: 0, y: -10 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           <div className="flex flex-row items-center justify-between">
//             <div className="flex flex-row items-center gap-2">
//               <div className="size-4 bg-muted-foreground/25 rounded-full" />
//               <div className="font-medium">Assistant</div>
//             </div>
//             <button
//               type="button"
//               className="text-xs text-gray-500 cursor-pointer"
//               onClick={() => {
//                 setIsExpanded(false);
//               }}
//             >
//               <Icon icon="solar:close-line" />
//             </button>
//           </div>
//           <div>{suggestion.description}</div>
//           <Button className="w-fit py-1.5 px-3 rounded-full" onPress={onApply}>
//             Apply
//           </Button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
