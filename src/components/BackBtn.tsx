import { useNavigate } from "react-router-dom"

const BackBtn = () => {

    // hook que trabalha com redirecionamento/mudanca de pagina
    const navigate = useNavigate();

  return (
    <>
        <button onClick={() => navigate(-1)}>Voltar</button>
    </>
  )
}

export default BackBtn