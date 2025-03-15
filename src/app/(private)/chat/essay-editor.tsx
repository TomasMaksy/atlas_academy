"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEssay } from "./essay-context";
import { Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function EssayEditor() {
  const { essay, setEssay } = useEssay();
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: essay?.__html,
    onUpdate: ({ editor }) => {
      setEssay({
        __html: editor.getHTML(),
        title: essay?.title || "Untitled",
      });
    },
  });

  return (
    <div className="absolute right-0 h-full w-[70%] transition-all duration-300 p-12 space-y-10 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-bold">{essay?.title || "Untitled"}</h1>
        <EditorContent editor={editor} />
      </div>
      <span className="w-full flex justify-between">
        <Chip
          size="lg"
          className="bg-[#3fafa8] shadow-lg text-white"
          classNames={{
            content: "text-lg font-extrabold",
          }}
        >
          AI: 72%
        </Chip>
        <Button
          radius="full"
          isIconOnly
          className="bg-[#3fafa8] text-white shadow-xl"
        >
          <Icon width={25} className="font-bold" icon="solar:arrow-up-linear" />
        </Button>
        {/* <Button radius="full" className="shadow">
          Request changes
        </Button> */}
      </span>
    </div>
  );
}

//       <div className="text-white">
//         <h1 className="text-5xl font-bold">CommonAppEssay for College</h1>
//         <p className="text-lg font-semibold mt-4">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
//           sapien ut libero venenatis ultricies. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc venenatis,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc
//         </p>
//         <p className="text-lg font-semibold mt-4">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
//           sapien ut libero venenatis ultricies. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc venenatis,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc
//         </p>
//         <p className="text-lg font-semibold mt-4">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
//           sapien ut libero venenatis ultricies. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc venenatis,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc
//         </p>
//         <p className="text-lg font-semibold mt-4">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae
//           sapien ut libero venenatis ultricies. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc venenatis,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc ultricies,
//           ultricies nunc nec, ultricies nunc. Nullam nec nunc
//         </p>
//       </div>
//       <div className="absolute bottom-0 right-0 mr-6 mb-6 bg-[#3fafa8] rounded-3xl shadow py-2 px-4 flex items-center space-x-2">
//         <span className="text-white text-sm font-semibold">written by AI:</span>
//         <span className="text-red-100 text-lg font-bold">72%</span>
//       </div>
//     </div>
//   );
// }
