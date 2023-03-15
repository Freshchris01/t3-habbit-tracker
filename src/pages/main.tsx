import { type NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import Habbits from "~/components/habbits";
import { api } from "~/utils/api";
import { useRouter } from 'next/router'
import { redirect } from 'next/navigation';

const Main: React.FC = () => {

	const { data: session, status } = useSession()

	if (status === "unauthenticated") {
		console.log("unauthenticated")

		// Workaround until https://github.com/vercel/next.js/issues/42556 is fixed.
		//redirect("/index")
		window.location.replace("/")
  }


	return (
		<main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<div className="lg:flex lg:items-center lg:justify-between">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						Back End Developer
					</h2>
				</div>
			<div className="mt-5 flex lg:mt-0 lg:ml-4">
				<span className="hidden sm:block">
					<button
						type="button"
						className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>
						Edit
					</button>
				</span>

				<span className="ml-3 hidden sm:block">
					<button
						type="button"
						className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
					>
						View
					</button>
				</span>

				<span className="sm:ml-3">
					<button
						type="button"
						className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={() => signOut()}
					>
						Sign Out
					</button>
				</span>
			</div>
			</div>
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<Habbits />
			</div >
		</main >
	)
};

export default Main;