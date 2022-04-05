import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Field, Label, Submit, Form, Input, Warn, Err } from "./styles";
import { useTypedSelector, AppState } from "../../store/__rootReducer";
import { animated, useSpring, useTransition, config } from "react-spring";
import { useLogUser } from "../../backend/graphql/queries/logUser";
import { MdEmail } from "react-icons/md";
import { HiLockOpen } from "react-icons/hi";

type Inputs = {
    email: string;
    password: string;
};

const Login = ({ reg }: any) => {
    const router = useRouter();
    const { red } = router.query;
    const dispatch = useDispatch();

    const errorMsg = null;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required 😅")
            .email("Email is invalid 🧐"),
        password: Yup.string()
            .min(3, "Password must be at least 3 characters long 😒")
            .required("Password is required 😅"),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>(formOptions);

    const { logUser, logData } = useLogUser();

    if (logData) console.log(`login.tsx is ${logData}`);

    const submitHandler: SubmitHandler<Inputs> = async (userData) => {
        try {
            const { email, password } = userData;
            logUser({
                variables: { body: { email, password } },
            });
            console.log("submited");
            router.push(`/`);
        } catch (err) {
            alert("something wrong is not right");
        }
    };

    const switchSign = useTransition(reg, {
        from: {
            opacity: 0.3,
            height: "0px",
        },
        enter: {
            opacity: 1,
            height: "60px",
        },
        leave: {
            opacity: 0,
            height: "0px",
        },
        delay: 0,
    });

    return (
        <>
            <Form onSubmit={handleSubmit(submitHandler)}>
                <div style={{ color: "white" }}>PLEASE LOGIN</div>
                {switchSign((styles, item) =>
                    item ? (
                        <animated.div style={styles}>
                            <Field></Field>
                        </animated.div>
                    ) : null
                )}

                <Field>
                    <Label>E-MAIL</Label>
                    <label htmlFor="Fname">
                        <MdEmail />
                        <Input
                            {...register("email", { required: true })}
                            type="email"
                            id="Fname"
                            placeholder="email@gmail.com"
                            defaultValue="@gmail.com"
                            className={`form-control ${errors.email ? "is-invalid" : ""
                                }`}
                        />

                        {errors.email ? (
                            <>
                                <Warn>{errors.email?.message}</Warn>
                            </>
                        ) : null}
                    </label>
                </Field>

                <Field>
                    <Label>PASSWORD</Label>
                    <label htmlFor="Fpass">
                        <HiLockOpen />
                        <Input
                            {...register("password", { required: true })}
                            type="password"
                            id="Fpass"
                            placeholder="password"
                        />
                        {errors.password ? (
                            <>
                                <Warn>{errors.password?.message}</Warn>
                            </>
                        ) : null}

                        {errorMsg ? (
                            <Err>
                                <h6>{errorMsg}</h6>
                            </Err>
                        ) : null}
                    </label>
                </Field>
                {switchSign((styles, item) =>
                    item ? (
                        <animated.div style={styles}>
                            <Field></Field>
                        </animated.div>
                    ) : null
                )}

                <Submit type="submit"> LOG IN</Submit>
            </Form>
        </>
    );
};

export default Login;
