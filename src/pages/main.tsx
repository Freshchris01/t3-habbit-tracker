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
		<div className="flex min-h-screen flex-col bg-slate-900 items-center justify-center ">
			<header className="top-0 sticky w-full p-5 bg-slate-900">
				<div className="lg:flex lg:items-center lg:justify-between">
					<div className="min-w-0 flex-1">
						<h2 className="text-2xl text-white font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
							Habbit Tracker
						</h2>
					</div>
					<div className="mt-5 flex lg:mt-0 lg:ml-4">
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
			</header>
			<main className="items-center justify-center px-4 flex-1 max-w-md">
				<Habbits />
			</main >
			<footer className="w-full text-center p-4 sticky bottom-0 bg-slate-900 text-white">created by Christian</footer>
		</div >
	)
};

export default Main;