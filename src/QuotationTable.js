import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';

const styles ={
  textCenter : {textAlign: 'center'},
  textRight : {textAlign: 'right'},
}

function QuotationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  useEffect(() => {
    let sum = 0
    {/*Constantly Update Discount*/}
    let discount = 0

    const z = data.map((v, i) => {
      let amount = (v.qty * v.ppu) - v.dc;
      discount += v.dc * 1;
      sum += (v.qty * v.ppu);
      return (
        <tr key={i}>
          <td><FaTrash onClick={() => deleteClick(i)}/></td>
          <td style={styles.textCenter}>{v.qty}</td>
          <td>{v.item}</td>
          <td style={styles.textRight}>{numberWithCommas(v.ppu)}</td>
          {/*Discount Column*/}
          <td style={styles.textRight}>{numberWithCommas(v.dc)}</td>
          <td style = {styles.textRight}>{numberWithCommas(amount)}</td>
        </tr>
      );
    });

    setDataRows(z);
    {/*Calculate Total Discount & Total Sum*/}
    setTotalDiscount(discount)
    setTotalPrice(sum-discount)
  }, [data]);

  const deleteClick = (i) => {
    console.log(i)
    data.splice(i,1)
    setDataItems([...data])
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Quotation</h1>
        </Col>
        <Col style = {styles.textRight}>
          <Button onClick={clearTable} variant="dark">
            Clear
          </Button>
        </Col>
      </Row>
      {/*This is quotation table.<br/>*/}
      {/*<br/>Number of Items {data.length}<br/>*/}
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Qty</th>
            <th>Item</th>
            <th>Price/Unit</th>
            {/*Discount Column*/}
            <th>Discount</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={4}></th>
            <th style={styles.textCenter}>Total Discount</th>
            <th style={styles.textRight}>{numberWithCommas(totalDiscount)}</th>
          </tr>

          <tr>
            <th colSpan={4}></th>
            <th style={styles.textCenter}>Total</th>
            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          </tr>
        </tfoot>
      </Table>
      </Container>
  );
}

export default QuotationTable;
