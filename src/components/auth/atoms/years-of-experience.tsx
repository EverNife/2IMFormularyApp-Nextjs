import Input from "@components/ui/input";
import {RadioBox} from "@components/ui/radiobox";
import {Formulary} from "@framework/types2/formulary";

export interface ValidateYearsOfExperienceType {
	register: any;
	formState: any;
	label: string;
	level_of_experience: keyof Formulary;
	years_of_experience: keyof Formulary;
}

export default function ValidateYearsOfExperience({
	register,
	formState,
	label,
	level_of_experience,
	years_of_experience
	} : ValidateYearsOfExperienceType){

	return (
		<div>
			<h5 className="font-bold">{label}</h5>
			<div>
				<RadioBox labelKey="Muito experiente" {...register(level_of_experience)} errorKey={formState[level_of_experience]?.message} value="3"/>
				<RadioBox labelKey="Experiente" {...register(level_of_experience)} errorKey={formState[level_of_experience]?.message} value="2"/>
				<RadioBox labelKey="Alguma experiência" {...register(level_of_experience)} errorKey={formState[level_of_experience]?.message} value="1"/>
				<RadioBox labelKey="Nenhuma experiência" {...register(level_of_experience, { required: "Escolha uma opção!" })} errorKey={formState[level_of_experience]?.message} value="0"/>
			</div>
			<Input
				className={"mt-2"}
				labelKey={`Anos de experiência com ${label}`}
				type="number"
				placeholder={"0"}
				shadow={true}
				{...register(years_of_experience, {
					required: "Por favor informe um numero!",
					validate: (value: number) => value >= 0 || "Esse valor não pode ser negativo!",
				})}
				errorKey={formState[years_of_experience]?.message}
			/>
		</div>
	)
}
