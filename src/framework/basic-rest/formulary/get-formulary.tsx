import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import {Formulary} from "@framework/types2/formulary";
import {useMutation} from "@tanstack/react-query";

export async function fetchSingleFormulary(formularyUUID: string){
	try {
		const { data } = await http.get(`${API_ENDPOINTS.FORMULARY}/${formularyUUID}`);
		return data as Formulary;
	}catch (e){
		console.log(e);
	}
	return {} as Formulary;
};

export async function fetchAllFormularies(){
	try {
		const { data } = await http.get(`${API_ENDPOINTS.FORMULARY}/all`);
		return data as Formulary[];
	}catch (e){
		console.log(e);
	}
	return [] as Formulary[];
};

export const useGetAllFormularies = () => {
	return useMutation(() => fetchAllFormularies(), {
		onSuccess: (data) => {
			console.log("Formulários Listados:", data);
		},
		onError: (data) => {
			// @ts-ignore
			console.log(data.response?.data)
		},
	});
};
