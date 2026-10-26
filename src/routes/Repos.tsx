import type { RepoProps } from "../types/Repo";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BackBtn from "../components/BackBtn";
import Loader from "../components/Loader";
import Repo from "../components/Repo";

import classes from "./Repos.module.css";

const Repos = () => {
    const { username } = useParams();

    const [repos, setRepos] = useState<RepoProps[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!username) {
            console.log("username está undefined!");
            return;
        }

        const loadRepos = async function (username: string) {
            setIsLoading(true);
            try {
                const res = await fetch(`https://api.github.com/users/${username}/repos`);
                console.log("status:", res.status);

                const data = await res.json();
                console.log("data:", data);

            setRepos(data);
            } catch (err) {
                console.error("erro na fetch:", err);
            } finally {
                setIsLoading(false);
            };
        };

        loadRepos(username);
    }, [username]);   //reage à mudança

    // early return
    if (!repos && isLoading) return <Loader />;

    return (
        <div className={classes.repos}>
            <BackBtn />
            <h2>Explore os repositórios do usuário: {username}</h2>
            {/* checagem para se nao houver repositorios */}
            {repos && repos.length === 0 && <p>Não há repositórios.</p>}
            {repos && repos.length > 0 && (
                <div className={classes.repos_container}>
                    {repos.map((repo: RepoProps) => (
                        <Repo key={repo.name} {...repo} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Repos;