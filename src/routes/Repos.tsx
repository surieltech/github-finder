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
        if (!username) return;

        const loadRepos = async (userName: string) => {
            setIsLoading(true);
            try {
                let page = 1;
                const perPage = 100;
                let allRepos: RepoProps[] = [];
                let hasMore = true;

                // Loop para buscar todas as páginas de repositórios
                while (hasMore) {
                    const res = await fetch(
                        `https://api.github.com/users/${userName}/repos?per_page=${perPage}&page=${page}`
                    );
                    
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    
                    const data: RepoProps[] = await res.json();
                    
                    if (data.length === 0) {
                        hasMore = false;
                    } else {
                        allRepos = [...allRepos, ...data];
                        if (data.length < perPage) {
                            hasMore = false;
                        } else {
                            page++;
                        }
                    }
                }

                // filtra mantendo apenas repositórios com mais de 0 estrelas
                const starredRepos = allRepos.filter(
                    (repo) => repo.stargazers_count > 0
                );

                // ordena os filtrados por estrelas (decrescente)
                const orderedRepos = starredRepos.sort(
                    (a, b) => b.stargazers_count - a.stargazers_count
                );

                setRepos(orderedRepos);
            } catch (err) {
                console.error(err);
                setRepos([]);
            } finally {
                setIsLoading(false);
            }
        };

        loadRepos(username);
    }, [username]);

    if (isLoading) return <Loader />;

    return (
        <div className={classes.repos}>
            <BackBtn />
            <h2>Explore os repositórios do usuário: {username}</h2>
            {repos && repos.length === 0 && <p>Não há repositórios com estrelas.</p>}
            {repos && repos.length > 0 && (
                <div className={classes.repos_container}>
                    {repos.map((repo) => (
                        <Repo key={repo.name} {...repo} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Repos;