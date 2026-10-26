import type { RepoProps } from "../types/Repo";

import { BsCodeSlash } from "react-icons/bs";
import { AiOutlineStar, AiOutlineFork } from "react-icons/ai";
import { RiGitRepositoryLine } from "react-icons/ri";

const Repo = ({
    name, 
    language, 
    html_url, 
    forks_count, 
    stargazers_count,
}: RepoProps) => {
  return (
    <div>
        <h3>{name}</h3>
        <p>
            <BsCodeSlash></BsCodeSlash>
            {language}
        </p>
        <div>
            <div>
                <AiOutlineStar></AiOutlineStar>
                <span>{stargazers_count}</span>
            </div>
            <div>
                <AiOutlineFork></AiOutlineFork>
                <span>{forks_count}</span>
            </div>
        </div>
        <a href={html_url} target="_blank"></a>
            <span>Ver código:</span>
            <RiGitRepositoryLine></RiGitRepositoryLine>
    </div>
  )
}

export default Repo