import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Modal, Row, Spinner, Table } from 'react-bootstrap';
import $ from 'jquery';
import DatePicker from "react-datepicker";
//For API Requests
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../config/constants';
import { useNavigate } from "react-router-dom";
import { addDays } from 'date-fns';

import validator from 'validator'
function HomePage() {
  let navigate = useNavigate();
  const [contentAction, setContentAction] = useState('content-hide');
  const [spinnerAction, setSpinnerAction] = useState('');
  const [show, setShow] = useState(false);
  const [dateSearchStart, setDateSearchStart] = useState('');
  const [dateSearchEnd, setDateSearchEnd] = useState('');
  const [dataPatient, setDataPatient] = useState([]);
  const [nameMother, setnameMother] = useState('');
  const [ageMother, setAgeMothers] = useState('');
  const [agePregnancy, setAgePregnancy] = useState('');
  const [parturitionProcess, setParturitionProcess] = useState('');
  const [dateMaternity, setDateMaternity] = useState(new Date());
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    $(document).ready(function () {
      setTimeout(function () {
        $('#example').DataTable();
      }, 1000);
    });
  });
  useEffect(() => {
    // LoadingData();
    loadData();
    // eslint-disable-next-line  
  }, []);
  const seletedPartus = (data) => {
    setParturitionProcess(data);
  }
  const loadData = () => {
    setSpinnerAction('');
    setContentAction('content-hide');
    axios.get(API_URL + 'patient')
      .then(response => {
        if (response.data.type === 0) {
          setSpinnerAction('spinner-hide');
          setContentAction('');
          setDataPatient(response.data.data);
        } else {
          Swal.fire({
            icon: 'warning',
            text: 'Data Masih Belum Ada',
            showConfirmButton: false,
            timer: 1500
          });
          setSpinnerAction('spinner-hide');
          setContentAction('');

        }
      }).catch(e => {

      })
  }
  const selectPartus = [
    'Normal',
    'Dibantu alat',
    'Caesar',
    'Waterbirth'
  ];
  const ButtonSava = () => {
    const parameter =
    {
      id: 1,
      nameMother: nameMother,
      ageMother: ageMother,
      agePregnancy: agePregnancy,
      datetimeMaternity: dateMaternity,
      parturitionProcess: parturitionProcess
    }
    console.log(parameter);
    if (validator.isEmpty(nameMother)) {
      Swal.fire({
        icon: 'warning',
        text: 'Nama Ibu Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (ageMother === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Ibu Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (ageMother !== '' && (!validator.isNumeric(ageMother))) {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Ibu Harus Angka',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (agePregnancy === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Kehamilan Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (agePregnancy !== '' && (!validator.isNumeric(agePregnancy))) {
      Swal.fire({
        icon: 'warning',
        text: 'Umur Kehamilan Harus Angka',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (dateMaternity === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Tanggal Melahirkan Belum diisi',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (parturitionProcess === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Proses Partus Belum dipilih',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      axios.post(API_URL + 'patient', parameter)
        .then(response => {
          if (response.data.type === 0) {
            navigate('/form-detail/' + response.data.data.id);

            Swal.fire({
              icon: 'success',
              text: response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
            setShow(false)
          } else {
            Swal.fire({
              icon: 'error',
              text: response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          }

        }).catch(e => {
          console.log(e)
        })
    }

  }
  const ButtonEdit = (data) => {
    navigate('/form-detail/' + data);
  }
  const DeletePatient = (id) => {
    Swal.fire({
      text: 'Yakin Ingin Hapus',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#228B22',
      cancelButtonColor: '#d33',
      confirmButtonText: "Iya",
      cancelButtonText: "Batal",
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(API_URL + 'patient/' + id)
          .then(response => {
            if (response.data.type === 0) {
              Swal.fire({
                icon: 'success',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              });
              loadData();
            } else {
              Swal.fire({
                icon: 'error',
                text: response.data.message,
                showConfirmButton: false,
                timer: 1500
              })
            }
          }).catch(e => {

          })
      }
    })
  }
  const ButtonSearch = () => {
    const paramaterSearch = {
      dateSearchStart: dateSearchStart,
      dateSearchEnd: dateSearchEnd
    }
    if (dateSearchStart === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Tanggal Mulai Belum diisi',
        showConfirmButton: false,
        timer: 1500
      })
    } else if (dateSearchEnd === '') {
      Swal.fire({
        icon: 'warning',
        text: 'Tanggal Akhir Belum diisi',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setSpinnerAction('');
      setContentAction('content-hide');
      axios.post(API_URL + 'patient/search', paramaterSearch)
        .then(response => {

          setSpinnerAction('spinner-hide');
          setContentAction('');
          setDataPatient(response.data.data);
        }).catch(e => {
          console.log(e);
        })
    }
  }
  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <Card className='mt-5 mb-2'>
              <Card.Body>
                <Form>
                  <Row>
                    <Col lg={4}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tanggal Persalinan Mulai</Form.Label>
                        <DatePicker
                          selected={dateSearchStart}
                          onChange={(date) => setDateSearchStart(date)}
                          peekNextMonth
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          maxDate={addDays(new Date(), 1)}
                          showYearDropdown
                          dropdownMode="select"
                          className='form-control'
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tanggal Persalinan Akhir</Form.Label>
                        <DatePicker
                          selected={dateSearchEnd}
                          onChange={(date) => setDateSearchEnd(date)}
                          peekNextMonth
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          maxDate={addDays(new Date(), 1)}
                          showYearDropdown
                          dropdownMode="select"
                          className='form-control'
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4}>
                      <Form.Group>
                        <Form.Label>&nbsp;</Form.Label>
                        <br />
                        <Button onClick={() => ButtonSearch()} className='btn btn-success'>Cari Data</Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} className='mt-5 mb-4'>
            <Button className='btn btn-success' onClick={handleShow}>Tambah Pasien Melahirkan</Button>
          </Col>
          <Col lg={12} id={contentAction}>
            <Card className='mb-5'>
              <Card.Body>
                <div className="table-resonsive">
                  <Table responsive id="example" className="table table-hover table-bordered table-resonsive">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>No</th>
                        <th>Nama_Ibu</th>
                        <th>Usia_Kehamilan(Bulan)</th>
                        <th>Tanggal_Pesalinan</th>
                        <th>Proses_Pratus</th>
                        <th>Gender_Bayi</th>
                        <th>Panjang_Bayi(Cm)</th>
                        <th>Berat_Bayi(Kg)</th>
                        <th>Kondisi_Bayi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dataPatient.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <Button onClick={() => ButtonEdit(row.birth_id)} className='btn btn-success mb-2'>Edit</Button>&nbsp;
                              <Button onClick={() => DeletePatient(row.birth_id)} className='btn btn-danger mb-2'>Hapus</Button>
                            </td>
                            <td>No</td>
                            <td>{row.name_mother}</td>
                            <td>{row.age_pregnancy}</td>
                            <td>{row.date_maternity}</td>
                            <td>{row.parturition_process}</td>
                            <td>{row.child_gender}</td>
                            <td>{row.child_long}</td>
                            <td>{row.child_weight}</td>
                            <td>{row.child_condition}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={12} className='text-center' id={spinnerAction}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
      <Modal show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Pasien Melahirkan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nama Ibu</Form.Label>
                  <Form.Control type="email" placeholder="" onChange={(e) => setnameMother(e.target.value)} />
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Umur Ibu</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control type='number' onChange={(e) => setAgeMothers(e.target.value)} />
                    <InputGroup.Text id="basic-addon2">Tahun</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col lg={3}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Umur Kehamilan</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control type='number' onChange={(e) => setAgePregnancy(e.target.value)} />
                    <InputGroup.Text id="basic-addon2">Bulan</InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Tanggal Persalinan</Form.Label>
                  <DatePicker
                    selected={dateMaternity}
                    onChange={(date) => setDateMaternity(date)}
                    peekNextMonth
                    showTimeSelect
                    dateFormat="dd-MM-yyyy h:mm aa"
                    showMonthDropdown
                    minDate={addDays(new Date(), -6)}
                    showYearDropdown
                    dropdownMode="select"
                    className='form-control'
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Proses Partus</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Pilih Jenis Proses</option>
                    {
                      selectPartus.map((partus, index) => (
                        <option key={index} onClick={() => seletedPartus(partus)}>{partus}</option>
                      ))
                    }
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => ButtonSava()}>Simpan</Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default HomePage