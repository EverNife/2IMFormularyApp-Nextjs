import {RadioBox} from "@components/ui/radiobox";
import React from "react";
import {Formulary} from "@framework/types2/formulary";

export interface OtherExperience{
	labelKey: string;
	experience: keyof Formulary;
}

export interface ValidateOtherExperiencesType {
	register: any;
	formState: any;
	other_experiences: OtherExperience[];
}

export default function OtherExperiences({
	register,
	formState,
	other_experiences,
	} : ValidateOtherExperiencesType){

	return (
		<div>
			<h5 className="font-bold">Outras experiências</h5>
			<p>Possuo conhecimento ou experiência em:</p>
			{other_experiences.map((other_experience, index) => (
				<div key={index} className={"ml-4 pb-2 pt-1"}>
					<p> - {other_experience.labelKey}</p>
					<div className={"ml-6 flex space-x-4"}>
						<RadioBox labelKey="Sim" {...register(other_experience.experience)} errorKey={formState[other_experience.experience]?.message} value="true"/>
						<RadioBox labelKey="Nao" {...register(other_experience.experience, { required: "Escolha uma opção!" })} errorKey={formState[other_experience.experience]?.message} value="false"/>
					</div>
				</div>
			))}

		</div>
	)
}
