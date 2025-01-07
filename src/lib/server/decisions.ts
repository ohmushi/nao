import type { Decision } from "../types";
import fs from 'node:fs';

export interface DecisionsRepository {
	getAllDecisions(): Decision[];
	saveNewDecision(d: Decision): void;
}

export class JsonDecisionsRepository implements DecisionsRepository {
	constructor(
		private readonly path: string,
	) {}

	private read_data_file(): Decision[] {
		let data;
		try {
			data = JSON.parse(fs.readFileSync(this.path).toString());
		} catch(e) {
			// create empty json file (with empty array)
			fs.writeFileSync(this.path, '[]');
			data = JSON.parse(fs.readFileSync(this.path).toString());
		}
		data.forEach((decision: any) => decision.transaction.when = new Date(decision.transaction.when));
		return data;
	}
	
	getAllDecisions(): Decision[] {
		return this.read_data_file();
	}
	saveNewDecision(d: Decision): void {
		let data = this.read_data_file();
		d.id = (1+data.length).toString();
		data.push(d);
		this.write_decisions(data);
	}

	private write_decisions(decisions: Decision[]): void {
		fs.writeFileSync(this.path, JSON.stringify(decisions));
	}

}

