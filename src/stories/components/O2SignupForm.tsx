import { INPUT_TYPE } from '../../constants/input';
import O2Input from '../../components/input/O2Input';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../assets/css/helpers.css';
import eyeSvg from '../assets/svg/eye.svg';
import eyeSlashSvg from '../assets/svg/eye-slash.svg';
import type { ReactNode} from 'react';
import { useState } from 'react';

const phoneRegExp = /^(?:\+421|0)(9\d{8})$/;
const FormSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    phone: yup.string()
        .matches(phoneRegExp, 'Invalid Slovak phone number')
});

function O2SignupForm(): ReactNode {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [hasPhonePrefix, setHasPhonePrefix] = useState<boolean>(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            phone: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
        validateOnChange: false,
        validationSchema: FormSchema
    });

    function handleClickTogglePasswordVisibility(event: React.MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();
        
        setIsPasswordVisible(prev => !prev);
    }console.log(hasPhonePrefix);
    

    return (
        <form onSubmit={formik.handleSubmit} noValidate className="form-wrapper">
            <div className="justify-center items-center flex-column" style={{marginBottom: '60px'}}>
                <h1>Sign up</h1>
                <p style={{margin: 0}}>Create a profile or <a className="link">Sign in</a></p>
            </div>
            <O2Input 
                type={INPUT_TYPE.EMAIL}
                id="email"
                name="email"
                onChange={(_, event) => formik.handleChange(event)}
                value={formik.values.email}
                errors={[formik.errors.email || '']}
                label='Email'
                required
            />
            <O2Input 
                type={INPUT_TYPE.NUMBER}
                id="phone"
                name="phone"
                onChange={(_, event) => formik.handleChange(event)}
                onChangeDebounce={(value) => setHasPhonePrefix(!!value?.startsWith('421')) }
                value={formik.values.phone}
                errors={[formik.errors.phone || '']}
                label='Phone'
                slot={{
                    insideLeft: !hasPhonePrefix && (
                        <pre style={{paddingLeft: 'var(--dimension-spacing--m)'}} className="phone-prefix">
                            +421
                        </pre>
                    )
                }}
                description={{
                    below: 'Example of slovak number: +421 0912 345 678'
                }}
            />
            <O2Input 
                type={isPasswordVisible ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD}
                id="password"
                name="password"
                onChange={(_, event) => formik.handleChange(event)}
                value={formik.values.password}
                errors={[formik.errors.password || '']}
                label='Password'
                required
                slot={{
                    insideRight: (
                        <button 
                            className="password-toggle"
                            onClick={handleClickTogglePasswordVisibility} 
                            aria-label="Toggle password visibility"
                        >
                            <img width={25} src={isPasswordVisible ? eyeSvg : eyeSlashSvg} />
                        </button>
                    )
                }}
            />
            <hr />
           
            <button className="custom-button items-center justify-center" type="submit">Submit</button>
        </form>
    );
};

export default O2SignupForm;