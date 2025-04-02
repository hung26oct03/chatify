import React, { useEffect } from 'react';
import * as Yup from 'yup';
import styles from './LoginPage.module.scss';
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
    )
});

const LoginPage = () => {
    const router = useRouter();
    const { showToast } = useToast(); 
    const { data: session, status } = useSession();

    useEffect(() => {
        const handleAuthentication = async () => {
            if(status !== "authenticated" || !session) return;
            try {
                if(session?.accessToken) {
                    showToast('Login successfully!', 'success');
            
                    // const timeout = setTimeout(async () => {
                    //     await router.push('/trust-me-bro');
                    // }, 10000);

                    // return () => clearTimeout(timeout);
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
                type: 'signin',
                redirect: false,
            });

            if(result?.error) { 
                showToast('Invalid credentials!', result?.error);
                return;
            }
        } catch (error) {
            showToast('Failed to login. Please try again later!', 'error');
        } finally {
            setSubmitting(true);
        }
    };

    const handleClickForgot = () => {

    }

    // const handleClickSignUp = () => {

    // }

    return (
        <div className={`${styles.login_page}`}>
            <div className={`${styles.login_page_container}`}>
                <span className={`${styles.title_cpn}`}>Sign in</span>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
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

                                <div className=''>
                                    <span 
                                        style={{ color: "#293749", fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }}
                                        onClick={handleClickForgot}
                                    >I forgot my password</span>
                                </div>
                                
                            </div>

                            <div className={`${styles.btn_submit} flex justify-center items-center mt-4`}>
                                <button
                                    type="submit"
                                    className={`${styles.btn_submit_login}`}
                                    disabled={isSubmitting}
                                >
                                    Sign in
                                </button>
                            </div>

                            <div className='my-4 flex'>
                                <div style={{ width: '100%', height: '2px', backgroundColor:'#BCC2CF', marginTop: '12px'}}></div>
                                <span className={`${styles.subtitle_login_form} fw-bold  mx-2`} style={{
                                    fontSize: '14px', color: '#293749'
                                }}>or</span> 
                                <div style={{ width: '100%', height: '2px', backgroundColor:'#BCC2CF', marginTop: '12px'}}></div>
                            </div> 

                            <div className={`${styles.btn_submit} flex justify-center items-center mt-4`}>
                                <PopupSignIn url={'/sign-in'} title={'Sign in with Google'} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;