import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import {GetServerSideProps} from "next";
import {Toaster} from "react-hot-toast";
import Button from "@components/ui/button";
import {useRouter} from "next/router";
import {isEmpty} from "lodash";
import ConsultLogoAnimated from "@components/consult/atoms/consult-logo-animated";
import Input from "@components/ui/input";
import {ROUTES} from "@utils/routes";
import {Formulary} from "@framework/types2/formulary";
import TextArea from "@components/ui/text-area";
import {fetchSingleFormulary} from "@framework/formulary/get-formulary";
import React, {useEffect} from "react";
import ListSquare from "@components/auth/atoms/ListSquare";

export default function ConsultPage({formulary, enviado} : {formulary: Formulary, enviado: boolean}) {

  const router = useRouter();
  const hasError = isEmpty(formulary);

  useEffect(() => {
    if (isEmpty(formulary)){
      window.alert("Falha ao procurar pelo UUID definido! Por favor, tente novamente com outro UUID")
      router.push(ROUTES.LISTAR)
    }
  },[]);

  if (hasError){
    //Error case, exit faster!
    return <></>;
  }

  const expLevelConverter = [
    "Nenhuma Experiencia",
    "Alguma Experiencia",
    "Experiente",
    "Muito Experiente",
  ];

  function getEXPLevel(experience_level: number, experience_years: number){
    let expLevel = expLevelConverter[experience_level];

    if (experience_years > 0){
      expLevel += " - ( " + experience_years + " ano" + `${experience_years == 1 ? "" : "s"}` + " )" ;
    }

    return expLevel;
  }

  return (
    <>
      <Container>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <ListSquare/>
        <div className="py-16 lg:py-20">
          <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
            <div className="text-center mb-6 pt-2.5">
              <ConsultLogoAnimated/>
              <p className="text-lg font-bold text-green-900 mt-10">
                {enviado
                  ? "Formulário enviado com sucesso!"
                  : "Consulta realizada com sucesso!"
                }
              </p>
            </div>

            <div>
              <Input
                name={"Nome"}
                labelKey={"Nome"}
                disabled={true}
                value={formulary.nome}
              />
              <br/>
              <Input
                name={"WhatsApp"}
                labelKey={"WhatsApp"}
                disabled={true}
                value={formulary.whatsapp}
              />
              <br/>
              <Input
                name={"FrontEnd"}
                labelKey={"Experiencia em FrontEnd"}
                disabled={true}
                value={getEXPLevel(formulary.front_end_experience_level, formulary.front_end_experience_years)}
              />
              <br/>
              <Input
                name={"BackEnd"}
                labelKey={"Experiencia em BackEnd"}
                disabled={true}
                value={getEXPLevel(formulary.back_end_experience_level, formulary.back_end_experience_years)}
              />
              <br/>
              <Input
                name={"DataBase"}
                labelKey={"Experiencia em DataBase"}
                disabled={true}
                value={getEXPLevel(formulary.database_experience_level, formulary.database_experience_years)}
              />
              <br/>
              <Input
                name={"camunda_experiece"}
                labelKey={"Conhecimento ou experiência em Camunda"}
                disabled={true}
                value={formulary.camunda_experiece == "s" ? "Sim" : "Não"}
              />
              <br/>
              <Input
                name={"healthcare_experiece"}
                labelKey={"Conhecimento ou experiência em Mercado de Saúde"}
                disabled={true}
                value={formulary.healthcare_experiece == "s" ? "Sim" : "Não"}
              />
              <TextArea
                name={"Comment"}
                labelKey={"Comentário"}
                disabled={true}
                value={formulary.comment}
                variant={"outline"}
              />
              <br/>
              <div className="text-center">
                <Button className="bg-secondary" onClick={() => router.push(ROUTES.HOME)}>
                  Voltar para o Início
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

ConsultPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (props) => {

  const id = props.query.id;
  const formulary : Formulary = !isEmpty(id)
    ? await fetchSingleFormulary(id as string)
    : {
      nome: "Não Consigo Ler Nada",
      whatsapp: "(11) 11111-1111",
      comment: "Isso é um exemplo, se você está vendo essa mensagem é porque você não definiu a UUID na query de busca!",
      front_end_experience_level: 0,
      front_end_experience_years: 0,
      back_end_experience_level: 1,
      back_end_experience_years: 1,
      database_experience_level: 2,
      database_experience_years: 2,
      camunda_experiece: "n",
      healthcare_experiece: "n"
    }

  const enviado = !isEmpty(props.query.enviado); //Se o formulário foi enviado ou se isso é uma consulta

  return {
    props: {
      formulary: formulary,
      enviado: enviado,
      revalidate: 60, // In seconds
    },
  };

};
