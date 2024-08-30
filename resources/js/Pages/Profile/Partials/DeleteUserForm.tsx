import { useRef, useState, FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">حذف اکانت</h2>

                <p className="mt-1 text-sm text-gray-600">
                    با حذف اکانت دسترسی های شما از بین خواهد رفت
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>حذف اکانت</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                       آیا مطمئن از حذف اکانت خود هستید؟
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="رمز عبور"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>لغو</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            حذف اکانت
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
