import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export default function FakeUser() {
    const [user, setUser] = useState({
        name: "Roberto Almeida",
        username: "almeida_roberto",
        email: "bertimho@gmail.com",
        urlPhoto: "https://img.freepik.com/fotos-gratis/empresario-afro-americano-em-retrato-de-estudio-de-terno-cinza_53876-102940.jpg?t=st=1744843687~exp=1744847287~hmac=fdf821b39ea2aee06b05c936f06575c32ecff340a87771b7021e567e5cc11c16&w=740"
    });


    const loadUser = async () => {
        try {
            const resp = await fetch("https://randomuser.me/api/");
            const data = await resp.json();
            const fakeUser = data.results[0];
            const _user = {
                name: `${fakeUser.name.first} ${fakeUser.name.last}`,
                username: fakeUser.login.username,
                email: fakeUser.email,
                urlPhoto: fakeUser.picture.medium
            };
            setUser(_user);
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
        }
    };


    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="flex items-center justify-between gap-1 bg-gray-200 my-1 p-2 rounded">
            <div className="flex items-center gap-2">
                <div>
                    <img src={user.urlPhoto} alt="Foto do usuário" className="w-16 h-16 rounded-lg" />
                </div>
                <div className="leading-5">
                    <div className="font-semibold">{user.name}</div>
                    <div>@{user.username}</div>
                    <div className="text-gray-500">{user.email}</div>
                </div>
            </div>
            <div
                className="bg-gray-400 p-1 rounded-lg flex items-center cursor-pointer hover:bg-gray-500"
                onClick={loadUser}
                title="Atualizar usuário"
            >
                <Icon icon="mdi:refresh" className="text-black text-3xl" />
            </div>
        </div>
    );
}
