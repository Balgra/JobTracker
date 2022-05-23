import type {CompanyModel} from "./CompanyModel";

export interface JobModel{
	id: number;
	JobName: string;
	ApplicationStatus: string;
	Company: CompanyModel;
}