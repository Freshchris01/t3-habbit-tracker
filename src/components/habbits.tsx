import { useState } from "react";
import { api } from "~/utils/api";

const Habbits = () => {
	const { data: habbits, isLoading } = api.habbit.get.useQuery();
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

	if (isLoading) return <div>Loading habbits...</div>

	return (
		<div>
							<span>
					<input type="text" value={habbitName} onChange={handleChange} style={{ color: 'black' }} />
					<button
						className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
						onClick={() => { console.log("test"); addHabbit.mutate({ name: habbitName }) }}
					>
						Add
					</button>
				</span>
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

export default Habbits;
