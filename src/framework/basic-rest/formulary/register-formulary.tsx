import { useMutation } from "@tanstack/react-query";
import http from "@framework/utils/http";
import {API_ENDPOINTS} from "@framework/utils/api-endpoints";
import {useRouter} from "next/router";
import {Formulary} from "@framework/types2/formulary";
import {ROUTES} from "@utils/routes";

export async function registerFormulary(formulary: Formulary) {
  const {data} = await http.post(`${API_ENDPOINTS.FORMULARY}`,formulary)
  return {
    id: data.id
  };
}

export const useRegisterFormularyMutation = () => {
  const router = useRouter();

  return useMutation((input: Formulary) => registerFormulary(input), {
    onSuccess: (data) => {
      console.log("Registro realizado com sucesso!", data);
      window.alert("Registro realizado com sucesso!");
      router.push(ROUTES.CONSULTAR + "?enviado=true&id=" + data.id)
    },
    onError: (data) => {
      // @ts-ignore
      window.alert(data.response?.data?.errorCode)
      // @ts-ignore
      console.log(data.response?.data)
    },
  });
};
