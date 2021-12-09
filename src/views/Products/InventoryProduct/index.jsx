import React, { useEffect, useState, useMemo } from "react";
import { FloatingLabel, Form, Button, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { inventoryByProductId } from "../../../services/InventoryService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableStriped from "../../../Components/Table";
import Header from "../../../Components/Header";
import CreateInventoryProduct from "./CreateInventoryProduct";
const InventoryProduct = ({ setOpenModal, id, setId, openModal }) => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [reload, setReload] = useState(false);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const notifySuccess = () => toast.success("Produto editado com sucesso");
  const notifyError = () =>
    toast.error("Ocorreu algum erro ao editar um produto");

  const columns = useMemo(
    () => [
      {
        Header: "Lote",
        accessor: "lote",
      },
      {
        Header: "Quantidade",
        accessor: "quantidade",
      },
      {
        Header: "Unidade",
        accessor: "unidade",
      },
      {
        Header: "Preço",
        accessor: "valor",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  useEffect(() => {
    async function getInventory() {
      const response = await inventoryByProductId({
        pageSize: 10,
        currentPage: currentPage,
        globalFilter: globalFilter,
        product_id: id,
      });
      setData(response.data.response);
      setTotalRows(response.data.totalRows);
      setPageCount(Math.ceil(response.data.totalRows / 10));
    }
    getInventory();
  }, [currentPage, reload, globalFilter]);

  async function onSubmit(dados) {
    // if (dados && dados.description === "") {
    //   Object.assign(dados, {
    //     description: data.description,
    //   });
    // }
    // const response = await productPut(dados, id);
    // if (response) {
    //   notifySuccess();
    //   setTimeout(() => {
    //     setReload(true);
    //     setOpenModal(false);
    //     setReload(false);
    //   }, 3000);
    // } else {
    //   notifyError();
    // }
  }
  return (
    <>
      <Header
        title={"Lote"}
        form={
          <CreateInventoryProduct
            openModal={openModalCreate}
            setOpenModal={setOpenModalCreate}
            setReload={setReload}
            product_id={id}
          />
        }
        openModal={openModalCreate}
        setOpenModal={setOpenModalCreate}
      />
      <TableStriped
        data={data}
        columns={columns}
        pageCount={pageCount}
        totalRows={totalRows}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        title={"Produtos"}
        titleDelete={"produto"}
        setId={setId}
        id={id}
        setOpenModal={setOpenModalEdit}
        openModal={openModalEdit}
        setOpenModalDelete={setOpenModalDelete}
        openModalDelete={openModalDelete}
        // form={
        //   <ShowProducts
        //     setId={setId}
        //     id={id}
        //     setReload={setReload}
        //     setOpenModal={setOpenModalEdit}
        //   />
        // }
        // functionDelete={deleteUsers}
        setReload={setReload}
      />
      <ToastContainer />
    </>
  );
};

export default InventoryProduct;
