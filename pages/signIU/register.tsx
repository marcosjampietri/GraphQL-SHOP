import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useTypedSelector, AppState } from "../../store/__rootReducer";
import { useMutation, NetworkStatus } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../backend/graphql/queries/createUser";
{
    /* import { registerAction } from "../../store/actions/authActions"; */
}
import { Field, Label, Submit, Form, Input, Warn, Err } from "./styles";
import { MdAccountCircle, MdEmail } from "react-icons/md";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";

type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
};

const Register = ({ reg }: any) => {
    const router = useRouter();
    const dispatch = useDispatch();

    {
        /*     const { errorMsg } = useTypedSelector((state: AppState) => state.auth); */
    }

    {
        /*     console.log(errorMsg); */
    }

    const error = null;

    const [createUser, { data, loading }] = useMutation(REGISTER_USER_MUTATION);

    if (data) console.log(data);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required, Mr. X 🤪"),
        email: Yup.string()
            .required("Email is required 😅")
            .email("Email is invalid 🧐"),
        password: Yup.string()
            .min(3, "Password must be at least 3 characters long 😒")
            .required("Password is required 😅"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match 🧐 !!")
            .required("Confirm Password is required too. Don't forget 😊"),
        acceptTerms: Yup.bool().oneOf(
            [true],
            "Hey! you need to accept the terms to register 😁"
        ),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>(formOptions);

    const submitHandler: SubmitHandler<Inputs> = async (userData) => {
        try {
            const { name, email, password } = userData;
            createUser({
                variables: { body: { name, email, password } },
            });
            console.log("submited");
            router.push(`/`);
        } catch (err) {
            alert("something wrong is not right");
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <div style={{ color: "white" }}>PLEASE REGISTER</div>

                <Field>
                    <Label>NAME</Label>
                    <MdAccountCircle />
                    <Input
                        {...register("name")}
                        type="name"
                        placeholder="João Ninguém"
                        defaultValue=""
                        className={`${errors.name ? "-is-invalid" : ""}`}
                    />
                    <Warn>{errors.name?.message}</Warn>
                </Field>
                <Field>
                    <Label>E-MAIL</Label>
                    <MdEmail />
                    <Input
                        {...register("email")}
                        type="email"
                        placeholder="email@gmail.com"
                        defaultValue="@gmail.com"
                        className={`form-control ${errors.email ? "is-invalid" : ""
                            }`}
                    />
                    <Warn>{errors.email?.message}</Warn>
                </Field>
                <Field>
                    <Label>PASSWORD</Label>
                    <HiLockOpen />
                    <Input
                        {...register("password")}
                        type="password"
                        placeholder="password"
                        defaultValue=""
                        className={`form-control ${errors.password ? "is-invalid" : ""
                            }`}
                    />
                    <Warn>{errors.password?.message}</Warn>
                </Field>
                <Field>
                    <Label>CONFIRM PASSWORD</Label>
                    <HiLockClosed />
                    <Input
                        {...register("confirmPassword")}
                        type="password"
                        placeholder="confirm your password"
                        defaultValue=""
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                            }`}
                    />
                    <Warn>{errors.confirmPassword?.message}</Warn>
                </Field>

                <Field>
                    <label htmlFor="acceptTerms">
                        <input
                            {...register("acceptTerms")}
                            type="checkbox"
                            id="acceptTerms"
                            className={`form-check-input ${errors.acceptTerms ? "is-invalid" : ""
                                }`}
                        />

                        <Label>Accept Terms & Conditions</Label>
                        <Warn>{errors.acceptTerms?.message}</Warn>
                        {error ? (
                            <Err>
                                <h6>{error}</h6>
                            </Err>
                        ) : null}
                    </label>
                </Field>
                <Submit type="submit"> REGISTER</Submit>
            </Form>
        </>
    );
};

export default Register;
