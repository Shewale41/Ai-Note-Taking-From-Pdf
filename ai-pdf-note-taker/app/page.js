"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/convex/_generated/api";

export default function Home() {
    const { user } = useUser();
    const createUser = useMutation(api.user.createUser);

    function getStartedHandler() {
        if (user) {
            redirect("/dashboard");
        } else {
            redirect("/sign-in");
        }
    }

    useEffect(() => {
        user && checkUser();
    }, [user]);

    const checkUser = async () => {
        const result = await createUser({
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            userName: user?.fullName,
        });
        console.log(result);
    };
    return (
        <div className="bg-gradient-to-r from-gray-100 to-blue-200 min-h-screen">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
            <Link href={"/"}>
                <Image
                    src={"/logo.svg"}
                    height={120}
                    width={120}
                    alt="Logo"
                    priority
                />
            </Link>
                <div className="space-x-6">
                    <Button
                        className="ml-4 rounded-full"
                        onClick={getStartedHandler}
                    >
                        Get Started
                    </Button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="text-center py-20 px-6 mt-[7rem]">
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    Simplify <span className="text-red-500">PDF</span>{" "}
                    <span className="text-blue-500">Note</span>-Taking
                    <br /> with AI-Powered
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
                    Elevate your note-taking experience with our AI-powered PDF
                    app. Seamlessly extract key insights, summaries, and
                    annotations from any PDF with just a few clicks.
                </p>
                <div className="mt-[4rem] space-x-4 flex items-center justify-center flex-col md:flex-row gap-5">
                    <Button
                        size="lg"
                        className="rounded-full"
                        onClick={getStartedHandler}
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        className="rounded-full bg-slate-200"
                    >
                        Learn More
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-6 pb-20 max-w-6xl mx-auto">
                <div>
                    <h3 className="text-lg font-semibold">The lowest price</h3>
                    <p className="text-gray-600">
                        Affordable AI-powered note-taking.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">
                        The fastest on the market
                    </h3>
                    <p className="text-gray-600">
                        Extract insights in seconds.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">The most loved</h3>
                    <p className="text-gray-600">
                        Trusted by thousands worldwide
                    </p>
                </div>
            </section>
        </div>
    );
}