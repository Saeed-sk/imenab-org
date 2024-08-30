import {Link, usePage} from '@inertiajs/react';
import {PropsWithChildren} from 'react';
import IconSelect from "@/Components/Icons/IconSelect";

interface Props {
    classNames?: string
}
interface PageProps{
    [key:string]:any
}
export default function Guest({children, classNames}: PropsWithChildren<Props>) {
    const {auth} = usePage<PageProps>().props
    return (
        <div className={""}>
            <nav className="flex flex-row-reverse justify-between px-10 py-5 border-b items-center bg-gray-100">
                <div>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] "
                            >
                                ورود
                            </Link>
                            <Link
                                href={route('register')}
                                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                ثبت نام
                            </Link>
                        </>
                    )}
                </div>

                <IconSelect className={''} name={'logo'}/>
            </nav>
            <main className={`${classNames ?? ""}`}>
                {children}
            </main>
            <footer className={"text-center py-3 bg-black text-gray-100"}>
                کلیه حقوق این سایت برای شرکت ایمن آب محفوظ می باشد.
            </footer>
        </div>
    );
}
