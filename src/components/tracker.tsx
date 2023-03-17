import { useState } from "react";
import { api } from "~/utils/api";

const Tracker = () => {
	const { data: habbits, isLoading } = api.habbit.get.useQuery();

	const { data: habbitEvents, isLoading: isLoadingEvents } = api.habbitEvent.get.useQuery({
		habbitIds: habbits?.map(habbit => {
			return habbit.id
		})
	}, { enabled: !!habbits });

	let today = new Date()

	function sameDay(d1 : Date, d2 : Date) {
		return d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate();
	}
	const rows: JSX.Element[] = [];
	console.log(habbitEvents)
	console.log()
	for (let i = 0; i < 100; i++) {
		rows.push(
			<tr>
				<td>{today.toISOString().slice(0, 10)}</td>
				{habbits?.map(habbit => {
					return <td className="text-center px-6 py-4">{habbitEvents?.filter(el =>{
						return sameDay(new Date(el.date), today) && el.habbitId === habbit.id
					}).length === 1 ? "Da" : "nicht"}</td>
				})}
			</tr>
		)
		today.setDate(today.getDate() - 1)
	}

	return (
		<div className="flex">
			<table className="table-fixed text-white">
				<thead>
					<tr>
				<th>Day</th>
					{habbits?.map(habbit => {
						return <th>{habbit.name}</th>
					})}
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		</div>
	);
}

export default Tracker;