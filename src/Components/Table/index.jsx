import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../Modal/DeleteModal";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Pagination,
} from "react-bootstrap";
import LargeModal from "../Modal/LargeModal";

const TableStriped = ({
  data,
  title,
  columns,
  pageCount,
  currentPage,
  setCurrentPage,
  setGlobalFilter,
  form,
  setId,
  id,
  setOpenModal,
  openModal,
  setReload,
  openModalDelete,
  setOpenModalDelete,
  functionDelete,
  titleDelete,
}) => {
  const [text, setText] = useState("");
  let rows = [];
  for (let i = 1; i <= pageCount; i++) {
    rows.push(
      <Pagination.Item
        active={currentPage === i && true}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
  const firstPage = (page) => {
    setCurrentPage(page);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <Row>
        <Col xs={9}> </Col>
        <Col xs={3}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              aria-describedby="basic-addon2"
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              id="button-addon2"
              onClick={() => setGlobalFilter(text)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive="xl" striped bordered hover>
            <thead>
              <tr>
                {columns.map((item) => (
                  <th>{item.Header}</th>
                ))}
                <th>Edita</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  {columns.map((v) => (
                    <td>
                      {v.include
                        ? item[v.accessor][v.include]
                        : item[v.accessor]}
                    </td>
                  ))}
                  <td>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => {
                        setOpenModal(true);
                        setId(item.id);
                      }}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => {
                        setOpenModalDelete(true);
                        setId(item.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col xs="8"></Col>
        <Col xs="4">
          <Pagination bg="light">
            <Pagination.First
              onClick={() => firstPage(1)}
              disabled={currentPage === 1 && true}
            />
            <Pagination.Prev
              disabled={currentPage === 1 && true}
              onClick={() => prevPage()}
            />
            {rows}
            <Pagination.Next
              disabled={currentPage === pageCount && true}
              onClick={() => nextPage()}
            />
            <Pagination.Last
              onClick={() => firstPage(pageCount)}
              disabled={currentPage === pageCount && true}
            />
          </Pagination>
        </Col>
      </Row>
      <LargeModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={title}
        formulario={form}
        id={id}
        setReload={setReload}
      />

      <DeleteModal
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        title={title}
        rotina={titleDelete}
        functionDelete={functionDelete}
        id={id}
        setReload={setReload}
      />
    </>
  );
};
export default TableStriped;
