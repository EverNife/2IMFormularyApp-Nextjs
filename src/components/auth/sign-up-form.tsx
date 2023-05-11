import Input from "@components/ui/input";
import Button from "@components/ui/button";
import {useForm} from "react-hook-form";
import Divider from "@components/ui/divider";
import Image from "next/image";
import cn from "classnames";
import TextArea from "@components/ui/text-area";
import ValidateYearsOfExperience from "@components/auth/atoms/years-of-experience";
import OtherExperiences from "@components/auth/atoms/other-experiences";
import {Formulary} from "@framework/types2/formulary";
import {useRegisterFormularyMutation} from "@framework/formulary/register-formulary";

const SignUpForm: React.FC = () => {
	const { mutate: registerFormulary, isLoading } = useRegisterFormularyMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Formulary>();

	function onSubmit(finalFormulary: Formulary) {

		finalFormulary = {
			...finalFormulary,
			front_end_experience_level: parseInt(String(finalFormulary.front_end_experience_level)),
			front_end_experience_years: parseInt(String(finalFormulary.front_end_experience_years)),

			back_end_experience_level: parseInt(String(finalFormulary.back_end_experience_level)),
			back_end_experience_years: parseInt(String(finalFormulary.back_end_experience_years)),

			database_experience_level: parseInt(String(finalFormulary.database_experience_level)),
			database_experience_years: parseInt(String(finalFormulary.database_experience_years)),
		} as Formulary
		console.log("Registering: ", finalFormulary)
		registerFormulary(finalFormulary);
	}

	return (
		<div className="py-5 px-5 sm:px-8 bg-white mx-auto rounded-lg w-full  md:w-800px border border-gray-300">
			<div className="text-center mb-6 pt-2.5">
				<div>
					<Image
						src={"/assets/images/2im-logo.png"}
						alt={"2IM Logo"}
						height={166}
						width={166}
						layout="fixed"
						loading="eager"
					/>
				</div>
				<p className="text-sm md:text-base text-bold mt-2 mb-8 sm:mb-10">
					Bem vindo ao Processo Seletivo 2iM
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col justify-center"
				noValidate
			>
				<div className="flex flex-col space-y-4">
					<h5 className="text-lg font-bold">Dados Pessoais</h5>
					<Input
						labelKey="Nome"
						type="text"
						shadow={true}
						errorKey={errors.nome?.message}
						{...register("nome", {
							required: `Por favor informe seu Nome`,
							validate: value => value.length >= 2 || "O Nome precisa ter ao menos 2 caracteres",
						})}
					/>
					<Input
						labelKey="Whatsapp"
						type="text"
						shadow={true}
						{...register("whatsapp", {
							required: "Por favor informe seu Whatsapp",
							validate: value => value.length === 15 || "Por favor, informe um telefone válido!",
						})}
						errorKey={errors.whatsapp?.message}
						placeholderKey="(__) _____-____"
						maskOptions={{
							mask: '(00) 00000-0000'
						}}
					/>
					<br/>
					<Divider/>
					<ValidateYearsOfExperience
						register={register}
						formState={errors}
						label={"Front-End"}
						level_of_experience={"front_end_experience_level"}
						years_of_experience={"front_end_experience_years"}
					/>
					<br/>
					<Divider/>
					<ValidateYearsOfExperience
						register={register}
						formState={errors}
						label={"Back-End"}
						level_of_experience={"back_end_experience_level"}
						years_of_experience={"back_end_experience_years"}
					/>
					<br/>
					<Divider/>
					<ValidateYearsOfExperience
						register={register}
						formState={errors}
						label={"Banco de Dados"}
						level_of_experience={"database_experience_level"}
						years_of_experience={"database_experience_years"}
					/>
					<br/>
					<Divider/>
					<OtherExperiences
						register={register}
						formState={errors}
						other_experiences={[
							{labelKey: "Camunda", experience: "camunda_experiece"},
							{labelKey: "Mercado de Saúde", experience: "healthcare_experiece"}
						]}
					/>
					<br/>
					<Divider/>
					<h5 className="text-lg font-bold">Comentários</h5>
					<TextArea
						{...register("comment")}
						placeholderKey="Faça um comentário!"
					/>
					<br/>
					<Divider/>
					<div className="relative">
						<Button
							type="submit"
							loading={isLoading}
							disabled={isLoading}
							className={cn("h-11 md:h-12 w-full mt-2 bg-secondary")}
						>
							Finalizar Cadastro
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignUpForm;
