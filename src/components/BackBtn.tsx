import { useNavigate } from "react-router-dom"
import classes from "./BackBtn.module.css"

const BackBtn = () => {

    // hook que trabalha com redirecionamento/mudanca de pagina
    const navigate = useNavigate();

  return (
    <>
        <button className={classes.back_btn} onClick={() => navigate(-1)}>Voltar</button>
    </>
  )
}

export default BackBtn