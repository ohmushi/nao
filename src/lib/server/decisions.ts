import { DateTimeFromJSON } from "$lib/utils/date.utils";
import type { Decision } from "../types";
import fs from 'node:fs';

const decesions_path = 'src/lib/server/decisions.json';

function read_data_file(): Decision[] {
	let data;
	try {
		data = JSON.parse(fs.readFileSync(decesions_path).toString());
	} catch(e) {
		fs.writeFileSync(decesions_path, '[]');
		data = JSON.parse(fs.readFileSync(decesions_path).toString());
	}
	data.forEach((decision: any) => decision.transaction.when = new Date(decision.transaction.when));
	return data;
}

export function saveNewDecision(d: Decision) {
	let data = read_data_file();
	d.id = (1+data.length).toString();
	data.push(d);
	write_decisions(data);
}

function write_decisions(decisions: Decision[]): void {
	fs.writeFileSync(decesions_path, JSON.stringify(decisions));
}

export function getAllDecisions(): Decision[] {
	return read_data_file();
}

