import type { Decision } from "../../types";

export interface DecisionsRepository {
	getAllDecisions(): Decision[];
	saveNewDecision(d: Decision): Promise<string>;
	unsaveDecision(id: string): Promise<void>;
}


