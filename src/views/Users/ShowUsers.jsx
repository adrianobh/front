import React, { useEffect, useState } from "react";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { roleOptions } from "../../services/RoleService";
import { userPut, findOneUser } from "../../services/UsersService";
import { cityOptions } from "../../services/CityService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowUsers = ({ setOpenModal, setReload, id }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [roles, setRoles] = useState([]);
  const [city, setCity] = useState([]);
  const [data, setData] = useState([]);
  const notifySuccess = () => toast.success("Usuário editado com sucesso");
  const notifyError = () => toast.error("Ocorreu algum erro ao editar usuário");

  useEffect(() => {
    async function getRole() {
      const response = await roleOptions();
      setRoles(response.data);
    }
    async function getCity() {
      const response = await cityOptions();
      setCity(response.data);
    }
    getRole();
    getCity();
  }, []);

  useEffect(() => {
    async function getOneUser() {
      const response = await findOneUser(id);
      setData(response.data);
    }
    getOneUser();
  }, [id]);

  async function onSubmit(dados) {
    if (dados && dados.name === "") {
      Object.assign(dados, {
        name: data.name,
      });
    }
    if (dados && dados.email === "") {
      Object.assign(dados, {
        email: data.email,
      });
    }
    if (dados && dados.role_id === "") {
      Object.assign(dados, {
        role_id: data.role_id,
      });
    }
    if (dados && dados.city_id === "") {
      Object.assign(dados, {
        city_id: data.address.city_id,
      });
    }
    if (dados && dados.complement === "") {
      Object.assign(dados, {
        complement: data.address.complement,
      });
    }
    if (dados && dados.district === "") {
      Object.assign(dados, {
        district: data.address.district,
      });
    }
    if (dados && dados.street === "") {
      Object.assign(dados, {
        street: data.address.street,
      });
    }
    if (dados && dados.zip_code === "") {
      Object.assign(dados, {
        zip_code: data.address.zip_code,
      });
    }
    Object.assign(dados, {
      address_id: data.address.id,
    });
    const response = await userPut(dados, id);
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
          <FloatingLabel
            label="Nome do usuário"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Nome do usuário"
              id={"name"}
              name={"name"}
              {...register("name")}
              className={error ? "error" : ""}
              defaultValue={data.name}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Nome do usuário"
              id={"email"}
              name={"email"}
              {...register("email")}
              className={error ? "error" : ""}
              defaultValue={data.email}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Perfil"
            className="mb-3"
          >
            <Form.Select
              aria-label="Default select example"
              className={error ? "error" : ""}
              value={data.role ? data.role.id : null}
            >
              <option>Selecione uma opção</option>
              {roles.map((item) => (
                <option value={item.id} {...register("role_id")}>
                  {item.permission}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {error && <p className={"textError"}> Usuário e senha inválidos</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Cidade"
            className="mb-3"
          >
            <Form.Select
              aria-label="Default select example"
              className={error ? "error" : ""}
              value={data.address ? data.address.city_id : null}
            >
              <option>Selecione uma opção</option>
              {city.map((item) => (
                <option value={item.id} {...register("city_id")}>
                  {item.city} - {item.state}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {error && <p className={"textError"}> Usuário e senha inválidos</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Bairro"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Bairro"
              id={"district"}
              name={"district"}
              {...register("district")}
              className={error ? "error" : ""}
              defaultValue={data.address ? data.address.district : null}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Rua" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Rua"
              id={"street"}
              name={"street"}
              {...register("street")}
              className={error ? "error" : ""}
              defaultValue={data.address ? data.address.street : null}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel
            label="Numero / Complemento"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Numero / Complemento"
              id={"complement"}
              name={"complement"}
              {...register("complement")}
              className={error ? "error" : ""}
              defaultValue={data.address ? data.address.complement : null}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="CEP" className="mb-3">
            <Form.Control
              type="text"
              placeholder="CEP"
              id={"zip_code"}
              name={"zip_code"}
              {...register("zip_code")}
              className={error ? "error" : ""}
              defaultValue={data.address ? data.address.zip_code : ""}
            />
            {error && <p className={"textError"}> Usuário e senha inválidos</p>}
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

export default ShowUsers;
