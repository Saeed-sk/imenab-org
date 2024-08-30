import {useEffect, FormEventHandler} from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, useForm} from '@inertiajs/react';

export default function Login({status, canResetPassword}: { status?: string, canResetPassword: boolean }) {
    const {data, setData, post, processing, errors, reset} = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout classNames={"login-background min-h-[85vh] flex flex-col items-center justify-center"}>
            <Head title="Log in"/>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form className={"glass w-full rounded-none md:rounded-lg lg:w-1/3 p-20"} onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="ایمیل"/>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2"/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="رمز عبور"/>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2"/>
                </div>

                <div className="block mt-4 mr-4">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600">من را به خاطر بسپار</span>
                    </label>
                </div>

                <PrimaryButton className="w-full mt-4 justify-center" disabled={processing}>
                    ورود
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
}
