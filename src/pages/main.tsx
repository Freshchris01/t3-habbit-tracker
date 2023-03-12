import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

const Habbits = () => {
	const { data: habbits, isLoading } = api.habbit.get.useQuery();

	if (isLoading) return <div>Loading habbits...</div>

	return (
		<div>
			{habbits?.map(habbit => {
				return (
					<div key={habbit.id}>
						<p style={{ color: 'white' }}>{habbit.name}</p>
					</div>
				);
			})}
		</div>
	)
}

const Main: React.FC = () => {
	const { data: sessionData } = useSession();
	const [habbitName, setHabbitName] = useState<string>("");
	const utils = api.useContext();
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setHabbitName(e.target.value);
	}

	const addHabbit = api.habbit.add.useMutation({
		onSettled: () => {
			utils.habbit.get.invalidate();
			setHabbitName("");
		}
	});


	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<span>
					<input type="text" value={habbitName} onChange={handleChange} style={{ color: 'black' }} />
					<button
						className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
						onClick={() => { console.log("test"); addHabbit.mutate({ name: habbitName }) }}
					>
						Add
					</button>
				</span>
				<Habbits />
			</div >
		</main >
	)
};

export default Main;