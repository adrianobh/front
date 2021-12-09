import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { findUserByRole } from "../../../services/UsersService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createInventoryProduct } from "../../../services/InventoryService";
const CreateInventoryProduct = ({
  openModal,
  setOpenModal,
  setReload,
  product_id,
}) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const notifySuccess = () => toast.success("Lote cadastrado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao cadastrar o lote para esse produto");

  useEffect(() => {
    async function getUserByRole() {
      const response = await findUserByRole({ role: "Facilitador" });
      setUsers(response.data);
    }
    getUserByRole();
  }, []);
  async function onSubmit(data) {
    Object.assign(data, {
      status: true,
    });
    Object.assign(data, {
      product_id: product_id,
    });
    console.log(data);
    const response = await createInventoryProduct(data);
    if (response && response.data) {
      notifySuccess();
      setTimeout(() => {
        setReload(true);
        setOpenModal(false);
        setReload(false);
      }, 3000);
    } else {
      notifyError();
    }
  }
  return (
    <>
      <Form role="form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <FloatingLabel label="Facilitador" className="mb-3">
            <Form.Select
              aria-label="Facilitador"
              className={error ? "error" : ""}
            >
              <option>Selecione uma opção</option>
              {users.map((item) => (
                <option value={item.id} {...register("user_id")}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {error && <p className={"textError"}> Usuário e senha inválidos</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Lote" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Código do lote"
              id={"lote"}
              name={"lote"}
              {...register("lote")}
              className={error ? "error" : ""}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Quantidade" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Quantidade em estoque"
              id={"quantidade"}
              name={"quantidade"}
              {...register("quantidade")}
              className={error ? "error" : ""}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Unidade" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Unidade de venda (Kg, G , Mg)"
              id={"unidade"}
              name={"unidade"}
              {...register("unidade")}
              className={error ? "error" : ""}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Valor de venda" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Valor de venda"
              id={"valor"}
              name={"valor"}
              {...register("valor")}
              className={error ? "error" : ""}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Data de entrada" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Data de entrada"
              id={"data_entrada"}
              name={"data_entrada"}
              {...register("data_entrada")}
              className={error ? "error" : ""}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Data de validade" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Data de validade"
              id={"data_validade"}
              name={"data_validade"}
              {...register("data_validade")}
              className={error ? "error" : ""}
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Status" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Status (Ativo , Inativo , Vencido , Liberado)"
              id={"status"}
              name={"status"}
              {...register("status")}
              className={error ? "error" : ""}
              value={"Liberado"}
              disabled
            />
            {error && (
              <p className={"textError"}> Nome do produto obrigatorio</p>
            )}
          </FloatingLabel>
        </Form.Group>

        <Button type="submit" variant="success">
          Salvar
        </Button>
      </Form>
      <ToastContainer />
    </>
  );
};

export default CreateInventoryProduct;
