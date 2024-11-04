"use client"
import logout from '../../services/auth/LogOut';
import { useRouter } from 'next/navigation';
import LogoutIcon from '@mui/icons-material/Logout';

export default function LogOutComponent() {
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await logout();

        if (!error) {
            router.push('/');
        } else {
            console.error("Erro ao deslogar:", error);
        }
    };

    return (
        <button onClick={handleLogout} className="bg-black text-white p-2 rounded">
            <LogoutIcon />
        </button>
    );
}
