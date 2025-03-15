"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button, Image, Input } from "@heroui/react";

import { Pacifico } from "next/font/google";

// Initialize the font
const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

interface Props {
  currentStep: number;
  title: string;
  question: string;
  imageUrl: string;
  inputText: string;
  color: string;
  setStep: (step: number) => void;
}

export default function QuestionStep({
  currentStep,
  title,
  question,
  imageUrl,
  inputText,
  color,
  setStep,
}: Props) {
  return (
    <AnimatePresence>
      <motion.div
        key={currentStep}
        initial={{
          x: "100%",
          opacity: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: "-100%",
          opacity: 0.5,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          style: {
            filter: "blur(20px)",
          },
        }}
        className="absolute top-0 left-0 w-full h-full flex flex-col justify-end items-center"
      >
        <main className="w-full h-full flex flex-col justify-between">
          {/* Steppers */}
          <div className="flex transition-transform duration-500 ease-in-out w-max items-center justify-center z-50">
            <div>STEP NR {currentStep}</div>
          </div>

          {/* Image */}
          <div className="absolute flex items-center justify-center w-full z-0 mt-48 flex-col ">
            <div
              className={`${pacifico.className} font-semibold text-7xl text-white text-wrap whitespace-pre-line text-center z-0 `}
            >
              {title}
            </div>
            <div className="z-10 -mt-14 ">
              <Image src={imageUrl} alt="Image" width={500} className="z-10 " />
            </div>
          </div>

          {/* Lower Input + Gradient */}
          <div
            className="flex flex-col justify-end items-center align-bottom z-50 h-[400px]"
            style={{
              background: `radial-gradient(ellipse at bottom, ${color} 0%, ${color} 25%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0) 75%)`,
            }}
          >
            <div className="bottom-0 z-20 gap-4 flex flex-col items-cente text-center justify-center p-4 h-[300px] md:w-[500px] sm:w-[350px]">
              <div className="flex w-full font-black leading-tight text-white tracking-tighter sm:text-2xl  md:text-3xl z-50 mb-6 text-center">
                {question}
              </div>
              <Input
                isClearable
                classNames={{
                  base: ["text-white"],
                  input: [
                    "bg-transparent",
                    "text-white",
                    "placeholder:text-white/50",
                  ],
                  innerWrapper: "bg-transparent text-white",
                  inputWrapper: [
                    "shadow-xl",
                    "bg-white/20",
                    "backdrop-blur-xl",
                    "hover:bg-white/40",
                    "group-data-[focus=true]:bg-white/25",
                    "!cursor-text",
                  ],
                }}
                placeholder={inputText}
                radius="lg"
                className="z-50 text-white  "
              />
              <Button
                onPress={() => setStep(currentStep + 1)}
                variant="flat"
                style={{ color: "white" }} // Force text color to white
                className="bg-white/20 text-white hover:bg-white/60 text-tiny w-full"
              >
                Continue
              </Button>
            </div>
          </div>
        </main>
      </motion.div>
    </AnimatePresence>
  );
}
