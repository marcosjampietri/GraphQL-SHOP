import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { animated, useTransition, config } from "react-spring";
import {
    useLogUser,
    useCreaUser,
    GET_LOGGED_USER_QUERY,
} from "../../backend/graphql/queries/logUser";
import { useQuery } from "@apollo/client";
import { Field, Label, Submit, Form, Input, Warn, Err } from "./styles";
import { MdAccountCircle, MdEmail } from "react-icons/md";
import { HiLockOpen, HiLockClosed } from "react-icons/hi";

type Inputs = {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    acceptTerms?: boolean;
};

const FormComponent = ({ reg }: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    {
        /*     const { errorMsg } = useTypedSelector((state: AppState) => state.auth); */
    }

    const error = null;

    const { logUser, logData, logLoading } = useLogUser();
    const { createUser, creaData, creaLoading } = useCreaUser();
    const { loading, data } = useQuery(GET_LOGGED_USER_QUERY);
    const { loggedUser } = data;

    useEffect(() => {
        if (loggedUser) router.push(`/checkout`);
    }, [loggedUser]);

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

    const validationSchemaLogin = Yup.object().shape({
        email: Yup.string()
            .required("Email is required 😅")
            .email("Email is invalid 🧐"),
        password: Yup.string()
            .min(3, "Password must be at least 3 characters long 😒")
            .required("Password is required 😅"),
    });

    const formOptions = {
        resolver: yupResolver(reg ? validationSchema : validationSchemaLogin),
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>(formOptions);

    const errorsExist = reg
        ? Object.keys(errors).length !== 0
        : errors.email || errors.password;

    const submitHandler: SubmitHandler<Inputs> = async (userData) => {
        try {
            const { name, email, password } = userData;
            console.log(name, email);
            await createUser({
                variables: { body: { name, email, password } },
            });
        } catch (err) {
            alert("something wrong is not right");
        }
    };

    const submitHandlerLogin: SubmitHandler<Inputs> = async (userData) => {
        try {
            const { email, password } = userData;
            console.log(email);
            await logUser({
                variables: { body: { email, password } },
            });
        } catch (err) {
            alert("something wrong is not right");
        }
    };

    const switchSign = useTransition(reg, {
        from: { opacity: 0, height: "0px" },
        enter: { opacity: 1, height: "60px" },
        leave: { opacity: 1, height: "0px" },
        delay: 0,
    });

    const animStyles = {
        from: { opacity: 0, transform: "translate3d(0, 50px, 0)" },
        enter: { opacity: 1, transform: "translate3d(0, 20px, 0)" },
        leave: { opacity: 0, transform: "translate3d(0, -50px, 0)" },
        delay: 0,
    };

    const errTransNm = useTransition(errors.name, animStyles);
    const errTransEm = useTransition(errors.email, animStyles);
    const errTransPs = useTransition(errors.password, animStyles);
    const errTransCPs = useTransition(errors.confirmPassword, animStyles);
    const errTransAcp = useTransition(errors.acceptTerms, animStyles);

    const processing = logLoading || logData || creaData || creaLoading;

    return !processing ? (
        <>
            <Form
                noValidate
                onSubmit={handleSubmit(
                    reg ? submitHandler : submitHandlerLogin
                )}
            >
                {/* {onn((styles, item) =>
                    item ? (
                        <Div style={styles}>REGISTER</Div>
                    ) : (
                        <Div style={styles}>LOGIN</Div>
                    )
                )}
                <Blank /> */}
                <Submit
                    type="submit"
                    className={`${errorsExist ? "disabled" : ""}`}
                >
                    {reg ? "REGISTER" : "LOGIN"}
                </Submit>

                {switchSign((styles, item) =>
                    item ? (
                        <>
                            <FieldWrap style={styles}>
                                <Field>
                                    <Label>NAME</Label>
                                    <MdAccountCircle />
                                    <Input
                                        {...register("name")}
                                        type="name"
                                        placeholder="João Ninguém"
                                        defaultValue=""
                                        className={`${
                                            errors.name ? "invalid" : ""
                                        }`}
                                    />
                                </Field>
                            </FieldWrap>
                            <ErrorWrap>
                                {errTransNm((styles, errname) =>
                                    errname && reg ? (
                                        <Warn style={styles}>
                                            {errname?.message}
                                        </Warn>
                                    ) : null
                                )}
                            </ErrorWrap>
                        </>
                    ) : null
                )}
                <Blank />
                <FieldWrap>
                    <Field>
                        <Label>E-MAIL</Label>
                        <MdEmail />
                        <Input
                            {...register("email")}
                            type="email"
                            placeholder="email@gmail.com"
                            defaultValue="@gmail.com"
                            className={`${errors.email ? "invalid" : ""}`}
                        />
                    </Field>
                </FieldWrap>
                <ErrorWrap>
                    {errTransEm((styles, erremail) =>
                        erremail ? (
                            <Warn style={styles}>{erremail?.message}</Warn>
                        ) : null
                    )}
                </ErrorWrap>

                <Blank />
                <FieldWrap>
                    <Field>
                        <Label>PASSWORD</Label>
                        <HiLockOpen />
                        <Input
                            {...register("password")}
                            type="password"
                            placeholder="password"
                            defaultValue=""
                            className={`${errors.password ? "invalid" : ""}`}
                        />
                    </Field>
                </FieldWrap>
                <ErrorWrap>
                    {errTransPs((styles, errpass) =>
                        errpass ? (
                            <Warn style={styles}>{errpass?.message}</Warn>
                        ) : null
                    )}
                </ErrorWrap>

                <Blank />
                {switchSign((styles, item) =>
                    item ? (
                        <>
                            <FieldWrap style={styles}>
                                <Field>
                                    <Label>CONFIRM PASSWORD</Label>
                                    <HiLockClosed />
                                    <Input
                                        {...register("confirmPassword")}
                                        type="password"
                                        placeholder="confirm your password"
                                        defaultValue=""
                                        className={`${
                                            errors.confirmPassword
                                                ? "invalid"
                                                : ""
                                        }`}
                                    />
                                </Field>
                            </FieldWrap>
                            <ErrorWrap>
                                {errTransCPs((styles, errconf) =>
                                    errconf && reg ? (
                                        <Warn style={styles}>
                                            {errconf?.message}
                                        </Warn>
                                    ) : null
                                )}
                            </ErrorWrap>
                        </>
                    ) : null
                )}
                {switchSign((styles, item) =>
                    item ? (
                        <>
                            <FieldWrap style={styles}>
                                <Field>
                                    <label htmlFor="acceptTerms">
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                height: "100%",
                                            }}
                                        >
                                            <input
                                                {...register("acceptTerms")}
                                                type="checkbox"
                                                id="acceptTerms"
                                                className={`${
                                                    errors.acceptTerms
                                                        ? "invalid"
                                                        : ""
                                                }`}
                                            />
                                            {error ? (
                                                <Err>
                                                    <h6>{error}</h6>
                                                </Err>
                                            ) : null}
                                            <div>Accept Terms & Conditions</div>
                                        </div>
                                    </label>
                                </Field>
                            </FieldWrap>

                            <ErrorWrap>
                                {errTransAcp((styles, erracpt) =>
                                    erracpt && reg ? (
                                        <Warn style={styles}>
                                            {erracpt?.message}
                                        </Warn>
                                    ) : null
                                )}
                            </ErrorWrap>
                        </>
                    ) : null
                )}
            </Form>
        </>
    ) : (
        <Form>loading</Form>
    );
};

export default FormComponent;

const FieldWrap = styled(animated.div)`
    position: relative;
    width: 95%;
    margin: 0px auto;
    overflow: hidden;
    border-radius: 5px;

    box-shadow: 2px 3px 15px hsla(220, 10%, 50%, 0.3);
`;

const Blank = styled.div`
    height: 5vh;
`;

const Div = styled(animated.div)`
    position: absolute;
    left: 42%;
    height: 40px;

    color: black;
`;

const ErrorWrap = styled(animated.div)`
    position: relative;
`;
