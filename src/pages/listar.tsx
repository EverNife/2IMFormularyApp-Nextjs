import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
import {GetStaticProps} from "next";
import {Toaster} from "react-hot-toast";
import Button from "@components/ui/button";
import {useRouter} from "next/router";
import {ROUTES} from "@utils/routes";
import Image from "next/image";
import React, {useEffect} from "react";
import {useGetAllFormularies} from "@framework/formulary/get-formulary";
import {Formulary} from "@framework/types2/formulary";
import cn from "classnames";
import Divider from "@components/ui/divider";

export default function SignUpPage() {

  const router = useRouter();

  const { mutate: getAllFormularies, isLoading, data } = useGetAllFormularies();

  useEffect(() => {
    getAllFormularies();
  },[])

  if (data !== undefined && data.length > 0){
    console.log(data[0]);
  }

  function getListOfFormularies(){

    if (isLoading) return <>Carregando...</>


    const rootClassName = cn(
      "text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none",
      "text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 ",
      "bg-pink-400",
      "mb-2"
    );

    if (data?.length == 0) return <div className="text-center pb-4">Nenhum registro encontrado!</div>

    return <div className={"text-center"}>
      {
        data?.map((formulary:Formulary, index) => (
          <button className={rootClassName} onClick={() => router.push(ROUTES.CONSULTAR + "?id=" + formulary.id)} key={index}>
            👤 {formulary.nome} | {formulary.id?.substring(0,25)}...
          </button>
        ))
      }
    </div>

  }

  return (
    <>
      <Container>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <div className="py-16 lg:py-20">
          <div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full sm:w-96 md:w-450px border border-gray-300">
            <div className="text-center mb-6 pt-2.5">
              <Image
                src={"/assets/images/2im-logo.png"}
                alt={"2IM Logo"}
                height={166}
                width={166}
                layout="fixed"
                loading="eager"
              />
              <h1 className="text-lg font-bold text-green-900 mt-10">
                Lista de todos os Registros!
              </h1>
            </div>

            {getListOfFormularies()}

            <Divider/>
            <div>
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

SignUpPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
