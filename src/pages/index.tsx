import Container from '@components/ui/container';
import Layout from '@components/layout/layout';
//import { ROUTES } from '@utils/routes';
import {GetStaticProps} from "next";
import SignUpForm from "@components/auth/sign-up-form";
import {Toaster} from "react-hot-toast";
import ListSquare from "@components/auth/atoms/ListSquare";

export default function SignUpPage() {
  return (
    <>
      <Container>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <ListSquare/>
        <div className="py-7 lg:py-20">
          <SignUpForm />
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
