import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { FloatingLabel, Form, Button, Col, Card } from "react-bootstrap";
import { userPut } from "../../services/UsersService";
import { useForm } from "react-hook-form";
import { roleOptions } from "../../services/RoleService";
import { cityOptions } from "../../services/CityService";
import { loginAction, logoutAction } from "../../store/ducks/auth";

const MyProfile = ({ title }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(false);
  const { register, handleSubmit } = useForm();
  const [roles, setRoles] = useState([]);
  const [city, setCity] = useState([]);
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

  const notifySuccess = () =>
    toast.success("Seu perfil foi atualizado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao atualizar o seu perfil");
  async function onSubmit(dados) {
    console.log("alou");
    if (dados && dados.name === "") {
      Object.assign(dados, {
        name: user.name,
      });
    }
    if (dados && dados.email === "") {
      Object.assign(dados, {
        email: user.email,
      });
    }
    if (dados && dados.role_id === "") {
      Object.assign(dados, {
        role_id: user.role_id,
      });
    }
    if (dados && dados.city_id === "") {
      Object.assign(dados, {
        city_id: user.address.city_id,
      });
    }
    if (dados && dados.complement === "") {
      Object.assign(dados, {
        complement: user.address.complement,
      });
    }
    if (dados && dados.district === "") {
      Object.assign(dados, {
        district: user.address.district,
      });
    }
    if (dados && dados.street === "") {
      Object.assign(dados, {
        street: user.address.street,
      });
    }
    if (dados && dados.zip_code === "") {
      Object.assign(dados, {
        zip_code: user.address.zip_code,
      });
    }
    Object.assign(dados, {
      address_id: user.address.id,
    });
    const response = await userPut(dados, user.id);
    console.log(response);
    if (response && response.data) {
      dispatch(logoutAction());
      dispatch(loginAction(response.data));
      notifySuccess();
    } else {
      notifyError();
    }
  }
  return (
    <>
      <h3>{title}</h3>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Form role="form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <FloatingLabel label="Nome do usuário" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nome do usuário"
                  id={"name"}
                  name={"name"}
                  {...register("name")}
                  className={error ? "error" : ""}
                  defaultValue={user.name}
                />
                {error && (
                  <p className={"textError"}> Usuário e senha inválidos</p>
                )}
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Nome do usuário"
                  id={"email"}
                  name={"email"}
                  {...register("email")}
                  className={error ? "error" : ""}
                  defaultValue={user.email}
                />
                {error && (
                  <p className={"textError"}> Usuário e senha inválidos</p>
                )}
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInputRole"
                label="Perfil"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Perfil"
                  className={error ? "error" : ""}
                  id={"role_id"}
                  name={"role_id"}
                >
                  <option>Selecione uma opção</option>
                  {roles &&
                    roles.map((item, key) => (
                      <option
                        key={`${item.permission}-${key}`}
                        value={item.id}
                        {...register("role_id")}
                        selected={item.id === user.role_id ? true : false}
                      >
                        {item.permission}
                      </option>
                    ))}
                </Form.Select>
              </FloatingLabel>
              {error && (
                <p className={"textError"}> Usuário e senha inválidos</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInputCity"
                label="Cidade"
                className="mb-3"
              >
                <Form.Select
                  aria-label="Cidade"
                  className={error ? "error" : ""}
                  id={"city_id"}
                  name={"city_id"}
                >
                  <option>Selecione uma opção</option>
                  {city.map((item, key) => (
                    <option
                      key={`${item.city - key}`}
                      value={item.id}
                      {...register("city_id")}
                      selected={
                        user.address && item.id === user.address.city_id
                          ? true
                          : false
                      }
                    >
                      {item.city} - {item.state}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
              {error && (
                <p className={"textError"}> Usuário e senha inválidos</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Bairro" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Bairro"
                  id={"district"}
                  name={"district"}
                  {...register("district")}
                  className={error ? "error" : ""}
                  defaultValue={user.address ? user.address.district : null}
                />
                {error && (
                  <p className={"textError"}> Usuário e senha inválidos</p>
                )}
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
                  defaultValue={user.address ? user.address.street : null}
                />
                {error && (
                  <p className={"textError"}> Usuário e senha inválidos</p>
                )}
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3">
              <FloatingLabel label="Numero / Complemento" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Numero / Complemento"
                  id={"complement"}
                  name={"complement"}
                  {...register("complement")}
                  className={error ? "error" : ""}
                  defaultValue={user.address ? user.address.complement : null}
                />
                {error && (
                  <p className={"textError"}> Usuário e senha inválidos</p>
                )}
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
                  defaultValue={user.address ? user.address.zip_code : ""}
                />
                {error && (
                  <p className={"textError"}> Usuário e senha inválidos</p>
                )}
              </FloatingLabel>
            </Form.Group>
            <Button type="submit" variant="success">
              Salvar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </>
  );
};
export default MyProfile;
