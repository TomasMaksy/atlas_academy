"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		// Redirect to /home after the component mounts
		router.push("/home");
	}, [router]);

	// Do not render anything while redirecting
	return null;
}
