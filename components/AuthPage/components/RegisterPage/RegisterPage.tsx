import React, { useEffect } from 'react';
import * as Yup from 'yup';
import styles from './RegisterPage.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useToast } from '@/hooks/ToastProvider';
import { signIn, useSession } from 'next-auth/react';
import PopupSignIn from '@/components/Common/PopupSignIn/PopupSignIn';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('⚠ Please enter the correct Gmail format').required('⚠ Please enter your email'),
    password: Yup.string()
    .required('⚠ You need to enter your password')
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        '⚠ Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, a number, and a special character'
    ),
    confirm_password: Yup.string().oneOf([Yup.ref('password')], '⚠ Password confirmation does not match').required('⚠ You need to confirm your password'),
});

const RegisterPage = () => {
    const router = useRouter();
    const { showToast } = useToast(); 
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleAuthentication = async () => {
            if(status !== "authenticated" || !session) return;
            try {
                if(session?.accessToken) {
                    showToast('Register successfully!', 'success');
                    // await router.push('/trust-me-bro');
                    return;
                }
            } catch(error) {
                console.log(error);
                showToast('An error occurred while redirecting!', 'error');
            }
        };
        handleAuthentication();
    }, [status, session, router, showToast]);

    const handleSubmit = async (
        values: { email: string; password: string }, 
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            const result = await signIn('credentials', {
                email: values.email,
                password: values.password,
                type: 'signup',
                redirect: false,
            });

            if(result?.error) { 
                showToast('Invalid credentials!', 'error');
                return;
            }
            showToast('Register successful!', 'success');
        } catch (error) {
            showToast('Failed to login. Please try again later!', 'error');
        } finally {
            setSubmitting(true);
        }
    };

    // const handleClickForgot = () => {

    // }

    // const handleClickSignUp = () => {

    // }

    return (
        <div className={`${styles.register_page}`}>
            <div className={`${styles.register_page_container}`}>
                <span className={`${styles.title_cpn}`}>Create Account</span>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirm_password: '',
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={`${styles.field_form} `}>
                                <div className='flex flex-col' style={{ height: '80px'}}>
                                    <span className='font-bold' style={{ color: "#293749", fontSize: '13px' }} >Email:</span>
                                    <Field type="email" name="email" placeholder="account@gmail.com" className="form-control" />
                                    <ErrorMessage name="email" component="div" className={`${styles.error_message}`}/>  
                                </div>
                                
                                <div className='flex flex-col' style={{ height: '80px'}}>
                                    <span className='font-bold' style={{ color: "#293749", fontSize: '13px' }} >Password:</span>
                                    <Field type="password" name="password" placeholder="⚬⚬⚬⚬⚬⚬⚬⚬⚬" className="form-control" />
                                    <ErrorMessage name="password" component="div" className={`${styles.error_message}`} />
                                </div>
                                
                                <div className='flex flex-col' style={{ height: '80px'}}>
                                    <span className='font-bold' style={{ color: "#293749", fontSize: '13px' }} >Confirm password:</span>
                                    <Field type="password" name="confirm_password" placeholder="⚬⚬⚬⚬⚬⚬⚬⚬⚬" className="form-control" />
                                    <ErrorMessage name="confirm_password" component="div" className={`${styles.error_message}`} />
                                </div>
                            </div>

                            <div className={`${styles.btn_submit} flex justify-center items-center mt-4`}>
                                <button
                                    type="submit"
                                    className={`${styles.btn_submit_register}`}
                                    disabled={isSubmitting}
                                >
                                    Sign up
                                </button>
                            </div>

                            <div className='my-4 flex'>
                                <div style={{ width: '100%', height: '2px', backgroundColor:'#BCC2CF', marginTop: '12px'}}></div>
                                <span className={`${styles.subtitle_register_form} fw-bold  mx-2`} style={{
                                    fontSize: '14px', color: '#293749'
                                }}>or</span> 
                                <div style={{ width: '100%', height: '2px', backgroundColor:'#BCC2CF', marginTop: '12px'}}></div>
                            </div> 

                            <div className={`${styles.btn_submit} flex justify-center items-center mt-4`}>
                                {/* <button
                                    type="button"
                                    className={`${styles.btn_sign_in_gg}`}
                                    onClick={handleLoginGoogle}
                                >
                                    <Image src={brand_google} alt='image google' width={16} height={16} className='me-2' />
                                    Sign in with Google
                                </button> */}
                                <PopupSignIn url={'/google-signin'} title={'Sign up with Google'} />
                            </div>

                            {/* <div className='flex justify-center items-center mt-8'>
                                <span className= {`${styles.subtitle_login_form}`} style={{
                                        fontSize: '13px', color: '#293749'
                                }}>Don’t have an account?&nbsp;</span> 
                                <span className={`${styles.subtitle_login_form} font-bold`} 
                                    onClick={handleClickSignUp}
                                    style={{
                                        fontSize: '13px', color: '#293749',
                                        cursor: 'pointer'
                                    }}
                                >Sign up now!</span>  
                            </div>  */}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>        
    );
};

export default RegisterPage;