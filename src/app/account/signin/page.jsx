"use client"

import SignInScreen from "../../../components/layouts/signinlayout";
import SignInForm from "../../../components/Forms/signin/signin";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();

    const handleSignin = () => {
        router.push("/");
    };

    return (
        <div>
            <SignInScreen form={<SignInForm onSignInSuccess={handleSignin} />} />
        </div>
    );
}

