import { ApplicationStatus } from "./ApplicationStatus";
import type {CompanyModel} from "./CompanyModel";

export interface JobModel{
	id: number;
	JobName: string;
	Status: ApplicationStatus;
	Company: CompanyModel;
}